import { supabase } from './supabase';
import type {
  AdminInbox,
  ApplicationRecord,
  BoardPost,
  DonationRecord,
  NewsletterArticle,
  NewsletterIssue,
  PublicationStatus,
  SiteSection,
} from '../types/cms';

const POSTS_KEY = 'lhmy_board_posts';
const NEWSLETTERS_KEY = 'lhmy_newsletter_issues';
const SECTIONS_KEY = 'lhmy_site_sections';

const nowIso = () => new Date().toISOString();

function previousMonthToken(date = new Date()) {
  const previous = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1));
  return previous.toISOString().slice(0, 7);
}

export function slugify(value: string) {
  const fallback = `post-${Date.now()}`;
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || fallback;
}

function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function seedPosts(): BoardPost[] {
  const saved = readLocal<BoardPost[] | null>(POSTS_KEY, null);
  if (saved) return saved;

  const seeded: BoardPost[] = [
    {
      id: 'demo-1',
      title: '난민 청소년 한국어 수업이 새 학기를 시작했습니다',
      slug: 'korean-class-new-term',
      excerpt: '등대 말레이시아의 한국어 수업이 새 교재와 멘토링 그룹으로 다시 문을 열었습니다.',
      body: '이번 달 한국어 수업은 기초 회화와 읽기 활동을 중심으로 진행되었습니다. 학생들은 자기소개, 가족 소개, 일상 대화 표현을 연습했고, 봉사자들은 소그룹별로 발음과 쓰기를 도왔습니다.',
      category: 'education',
      status: 'published',
      pinned: true,
      published_at: nowIso(),
      created_at: nowIso(),
      updated_at: nowIso(),
    },
    {
      id: 'demo-2',
      title: '축구팀 주말 훈련과 공동체 식사',
      slug: 'football-weekend-training',
      excerpt: 'LHMY 축구팀이 주말 훈련 뒤 함께 식사하며 서로를 격려했습니다.',
      body: '주말 축구 훈련에는 청소년 선수들과 코치진이 함께했습니다. 체력 훈련, 패스 연습, 미니 게임 뒤에는 공동체 식사를 나누며 다음 경기를 준비했습니다.',
      category: 'football',
      status: 'published',
      pinned: false,
      published_at: nowIso(),
      created_at: nowIso(),
      updated_at: nowIso(),
    },
  ];

  writeLocal(POSTS_KEY, seeded);
  return seeded;
}

function seedSections(): SiteSection[] {
  const saved = readLocal<SiteSection[] | null>(SECTIONS_KEY, null);
  if (saved) return saved;

  const seeded: SiteSection[] = [
    {
      id: 'home-hero-ko',
      section_key: 'home.hero',
      title: '등대 말레이시아',
      body: '말레이시아 난민 청소년에게 교육과 공동체, 그리고 미래를 향한 길을 제공합니다.',
      locale: 'ko',
      updated_at: nowIso(),
    },
    {
      id: 'about-mission-ko',
      section_key: 'about.mission',
      title: '우리의 사명',
      body: '배움의 기회를 잃은 청소년들이 언어, 기술, 관계를 회복하도록 돕습니다.',
      locale: 'ko',
      updated_at: nowIso(),
    },
  ];

  writeLocal(SECTIONS_KEY, seeded);
  return seeded;
}

function seedNewsletters(): NewsletterIssue[] {
  const saved = readLocal<NewsletterIssue[] | null>(NEWSLETTERS_KEY, null);
  if (saved) return saved;

  const month = previousMonthToken();
  const posts = seedPosts();
  const seeded: NewsletterIssue[] = [
    {
      id: 'demo-newsletter-1',
      title: `${month} 등대 소식지`,
      slug: `${month}-lhmy-newsletter`,
      issue_month: month,
      summary: '이번 달 LHMY 교육, 축구, 공동체 소식을 한눈에 볼 수 있도록 정리했습니다.',
      editor_note: '작은 변화들이 모여 청소년들의 다음 계단이 됩니다.',
      status: 'draft',
      created_at: nowIso(),
      updated_at: nowIso(),
      articles: posts.map((post, index) => ({
        id: `demo-newsletter-article-${index + 1}`,
        issue_id: 'demo-newsletter-1',
        title: post.title,
        body: post.body,
        source_post_id: post.id,
        image_url: post.cover_image_url,
        display_order: index,
      })),
    },
  ];

  writeLocal(NEWSLETTERS_KEY, seeded);
  return seeded;
}

function sortPosts(posts: BoardPost[]) {
  return [...posts].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return Date.parse(b.published_at || b.created_at || '') - Date.parse(a.published_at || a.created_at || '');
  });
}

async function getNewsletterArticles(issueIds: string[]) {
  if (!supabase || issueIds.length === 0) return new Map<string, NewsletterArticle[]>();

  const { data, error } = await supabase
    .from('newsletter_articles')
    .select('*')
    .in('issue_id', issueIds)
    .order('display_order', { ascending: true });

  if (error) throw error;

  const map = new Map<string, NewsletterArticle[]>();
  (data || []).forEach((article) => {
    const issueId = String(article.issue_id);
    map.set(issueId, [...(map.get(issueId) || []), article as NewsletterArticle]);
  });

  return map;
}

export const cmsService = {
  isRemoteEnabled: Boolean(supabase),

  async listBoardPosts(includeDrafts = false): Promise<BoardPost[]> {
    if (!supabase) {
      const posts = seedPosts();
      return sortPosts(includeDrafts ? posts : posts.filter((post) => post.status === 'published'));
    }

    let query = supabase
      .from('board_posts')
      .select('*')
      .order('pinned', { ascending: false })
      .order('published_at', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (!includeDrafts) query = query.eq('status', 'published');

    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as BoardPost[];
  },

  async getBoardPostBySlug(slug: string): Promise<BoardPost | null> {
    if (!supabase) {
      return seedPosts().find((post) => post.slug === slug && post.status === 'published') || null;
    }

    const { data, error } = await supabase
      .from('board_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) throw error;
    return data as BoardPost | null;
  },

  async saveBoardPost(post: BoardPost): Promise<BoardPost> {
    const payload: BoardPost = {
      ...post,
      slug: post.slug || slugify(post.title),
      excerpt: post.excerpt || post.body.slice(0, 140),
      published_at: post.status === 'published' ? post.published_at || nowIso() : post.published_at || null,
      updated_at: nowIso(),
    };

    if (!supabase) {
      const posts = seedPosts();
      const id = payload.id || `local-${Date.now()}`;
      const saved = { ...payload, id, created_at: payload.created_at || nowIso() };
      const next = posts.some((item) => item.id === id)
        ? posts.map((item) => (item.id === id ? saved : item))
        : [saved, ...posts];
      writeLocal(POSTS_KEY, next);
      return saved;
    }

    const { data, error } = await supabase
      .from('board_posts')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;
    return data as BoardPost;
  },

  async deleteBoardPost(id: string) {
    if (!supabase) {
      writeLocal(POSTS_KEY, seedPosts().filter((post) => post.id !== id));
      return;
    }

    const { error } = await supabase.from('board_posts').delete().eq('id', id);
    if (error) throw error;
  },

  async listNewsletterIssues(includeDrafts = false): Promise<NewsletterIssue[]> {
    if (!supabase) {
      const issues = seedNewsletters();
      return includeDrafts ? issues : issues.filter((issue) => issue.status === 'published');
    }

    let query = supabase
      .from('newsletter_issues')
      .select('*')
      .order('issue_month', { ascending: false });

    if (!includeDrafts) query = query.eq('status', 'published');

    const { data, error } = await query;
    if (error) throw error;

    const issues = (data || []) as NewsletterIssue[];
    const articles = await getNewsletterArticles(issues.map((issue) => issue.id || '').filter(Boolean));
    return issues.map((issue) => ({ ...issue, articles: articles.get(issue.id || '') || [] }));
  },

  async getNewsletterIssueBySlug(slug: string): Promise<NewsletterIssue | null> {
    if (!supabase) {
      return seedNewsletters().find((issue) => issue.slug === slug && issue.status === 'published') || null;
    }

    const { data, error } = await supabase
      .from('newsletter_issues')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle();

    if (error) throw error;
    if (!data) return null;

    const articles = await getNewsletterArticles([String(data.id)]);
    return { ...(data as NewsletterIssue), articles: articles.get(String(data.id)) || [] };
  },

  async saveNewsletterIssue(issue: NewsletterIssue): Promise<NewsletterIssue> {
    const payload: NewsletterIssue = {
      ...issue,
      slug: issue.slug || slugify(issue.title),
      published_at: issue.status === 'published' ? issue.published_at || nowIso() : issue.published_at || null,
      updated_at: nowIso(),
    };

    if (!supabase) {
      const issues = seedNewsletters();
      const id = payload.id || `local-newsletter-${Date.now()}`;
      const saved = {
        ...payload,
        id,
        created_at: payload.created_at || nowIso(),
        articles: payload.articles.map((article, index) => ({
          ...article,
          id: article.id || `${id}-article-${index}`,
          issue_id: id,
          display_order: index,
        })),
      };
      const next = issues.some((item) => item.id === id)
        ? issues.map((item) => (item.id === id ? saved : item))
        : [saved, ...issues];
      writeLocal(NEWSLETTERS_KEY, next);
      return saved;
    }

    const { articles, ...issuePayload } = payload;
    const { data, error } = await supabase
      .from('newsletter_issues')
      .upsert(issuePayload, { onConflict: 'id' })
      .select()
      .single();

    if (error) throw error;

    const issueId = String(data.id);
    const { error: deleteError } = await supabase
      .from('newsletter_articles')
      .delete()
      .eq('issue_id', issueId);

    if (deleteError) throw deleteError;

    if (articles.length > 0) {
      const { error: insertError } = await supabase
        .from('newsletter_articles')
        .insert(articles.map((article, index) => ({
          title: article.title,
          body: article.body,
          source_post_id: article.source_post_id || null,
          image_url: article.image_url || null,
          issue_id: issueId,
          display_order: index,
        })));

      if (insertError) throw insertError;
    }

    return { ...(data as NewsletterIssue), articles };
  },

  async deleteNewsletterIssue(id: string) {
    if (!supabase) {
      writeLocal(NEWSLETTERS_KEY, seedNewsletters().filter((issue) => issue.id !== id));
      return;
    }

    const { error } = await supabase.from('newsletter_issues').delete().eq('id', id);
    if (error) throw error;
  },

  async generateNewsletterDraft(month = previousMonthToken()): Promise<NewsletterIssue> {
    const posts = await this.listBoardPosts(false);
    const sourcePosts = posts.filter((post) => {
      const date = post.published_at || post.created_at;
      return date ? date.startsWith(month) : false;
    });
    const selectedPosts = sourcePosts.length > 0 ? sourcePosts : posts.slice(0, 4);
    const title = `${month} 등대 말레이시아 소식지`;
    const issue: NewsletterIssue = {
      title,
      slug: `${month}-lhmy-newsletter`,
      issue_month: month,
      summary: `${selectedPosts.length}개의 게시글을 바탕으로 자동 생성한 월간 소식지 초안입니다.`,
      editor_note: '자동 생성된 초안입니다. 게시 전 제목, 사진, 문단을 확인해 주세요.',
      status: 'draft',
      articles: selectedPosts.map((post, index) => ({
        title: post.title,
        body: post.body,
        source_post_id: post.id || null,
        image_url: post.cover_image_url || null,
        display_order: index,
      })),
    };

    return this.saveNewsletterIssue(issue);
  },

  async listSiteSections(): Promise<SiteSection[]> {
    if (!supabase) return seedSections();

    const { data, error } = await supabase
      .from('site_sections')
      .select('*')
      .order('section_key', { ascending: true });

    if (error) throw error;
    return (data || []) as SiteSection[];
  },

  async saveSiteSection(section: SiteSection): Promise<SiteSection> {
    const payload = { ...section, updated_at: nowIso() };

    if (!supabase) {
      const sections = seedSections();
      const id = payload.id || `${payload.section_key}-${payload.locale}`;
      const saved = { ...payload, id };
      const next = sections.some((item) => item.id === id)
        ? sections.map((item) => (item.id === id ? saved : item))
        : [saved, ...sections];
      writeLocal(SECTIONS_KEY, next);
      return saved;
    }

    const { data, error } = await supabase
      .from('site_sections')
      .upsert(payload, { onConflict: 'section_key,locale' })
      .select()
      .single();

    if (error) throw error;
    return data as SiteSection;
  },

  async listAdminInbox(): Promise<AdminInbox> {
    if (!supabase) {
      return {
        studentApplications: [],
        volunteerApplications: [],
        partnerApplications: [],
        donations: [],
      };
    }

    const [students, volunteers, partners, donations] = await Promise.all([
      supabase.from('student_applications').select('*').order('created_at', { ascending: false }),
      supabase.from('volunteer_applications').select('*').order('created_at', { ascending: false }),
      supabase.from('partner_applications').select('*').order('created_at', { ascending: false }),
      supabase.from('donations').select('*').order('created_at', { ascending: false }),
    ]);

    const responses = [students, volunteers, partners, donations];
    responses.forEach((response) => {
      if (response.error) throw response.error;
    });

    return {
      studentApplications: (students.data || []) as ApplicationRecord[],
      volunteerApplications: (volunteers.data || []) as ApplicationRecord[],
      partnerApplications: (partners.data || []) as ApplicationRecord[],
      donations: (donations.data || []) as DonationRecord[],
    };
  },

  async updateInboxStatus(table: string, id: string, status: string) {
    if (!supabase) return;

    const { error } = await supabase
      .from(table)
      .update({ status, updated_at: nowIso() })
      .eq('id', id);

    if (error) throw error;
  },
};

export function emptyBoardPost(): BoardPost {
  return {
    title: '',
    slug: '',
    excerpt: '',
    body: '',
    cover_image_url: '',
    category: 'notice',
    status: 'draft',
    pinned: false,
  };
}

export function emptyNewsletterIssue(): NewsletterIssue {
  const month = previousMonthToken(new Date(Date.now() + 31 * 24 * 60 * 60 * 1000));
  return {
    title: `${month} 등대 말레이시아 소식지`,
    slug: `${month}-lhmy-newsletter`,
    issue_month: month,
    summary: '',
    editor_note: '',
    status: 'draft',
    articles: [],
  };
}

export const publicationStatuses: PublicationStatus[] = ['draft', 'published', 'archived'];
