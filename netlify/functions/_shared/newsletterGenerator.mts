import { createSupabaseAdmin } from './supabaseAdmin.mjs';

interface BoardPostRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url?: string | null;
  published_at?: string | null;
  created_at?: string;
}

export function previousMalaysiaMonthToken(date = new Date()) {
  const malaysiaNow = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  const previous = new Date(Date.UTC(malaysiaNow.getUTCFullYear(), malaysiaNow.getUTCMonth() - 1, 1));
  return previous.toISOString().slice(0, 7);
}

export function isFirstDayInMalaysia(date = new Date()) {
  const malaysiaNow = new Date(date.getTime() + 8 * 60 * 60 * 1000);
  return malaysiaNow.getUTCDate() === 1;
}

export async function generateNewsletterDraft(month = previousMalaysiaMonthToken()) {
  const supabase = createSupabaseAdmin();

  if (!supabase) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
  }

  const { data: monthPosts, error: monthPostsError } = await supabase
    .from('board_posts')
    .select('id,title,slug,excerpt,body,cover_image_url,published_at,created_at')
    .eq('status', 'published')
    .gte('published_at', `${month}-01T00:00:00.000Z`)
    .lt('published_at', nextMonthStart(month))
    .order('published_at', { ascending: false });

  if (monthPostsError) throw monthPostsError;

  let posts = (monthPosts || []) as BoardPostRow[];

  if (posts.length === 0) {
    const { data: recentPosts, error: recentPostsError } = await supabase
      .from('board_posts')
      .select('id,title,slug,excerpt,body,cover_image_url,published_at,created_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false, nullsFirst: false })
      .limit(4);

    if (recentPostsError) throw recentPostsError;
    posts = (recentPosts || []) as BoardPostRow[];
  }

  const title = `${month} 등대 말레이시아 소식지`;
  const slug = `${month}-lhmy-newsletter`;
  const issuePayload = {
    title,
    slug,
    issue_month: month,
    summary: `${posts.length}개의 공개 게시글을 바탕으로 자동 생성한 월간 소식지 초안입니다.`,
    editor_note: '자동 생성된 초안입니다. 게시 전 제목, 사진, 문단을 확인해 주세요.',
    status: 'draft',
    updated_at: new Date().toISOString(),
  };

  const { data: issue, error: issueError } = await supabase
    .from('newsletter_issues')
    .upsert(issuePayload, { onConflict: 'slug' })
    .select('id,title,slug,issue_month,status')
    .single();

  if (issueError) throw issueError;

  const issueId = String(issue.id);
  const { error: deleteError } = await supabase
    .from('newsletter_articles')
    .delete()
    .eq('issue_id', issueId);

  if (deleteError) throw deleteError;

  if (posts.length > 0) {
    const { error: insertError } = await supabase.from('newsletter_articles').insert(
      posts.map((post, index) => ({
        issue_id: issueId,
        source_post_id: post.id,
        title: post.title,
        body: post.body || post.excerpt,
        image_url: post.cover_image_url || null,
        display_order: index,
      })),
    );

    if (insertError) throw insertError;
  }

  return {
    issue,
    articleCount: posts.length,
  };
}

function nextMonthStart(month: string) {
  const [year, monthIndex] = month.split('-').map(Number);
  return new Date(Date.UTC(year, monthIndex, 1)).toISOString();
}
