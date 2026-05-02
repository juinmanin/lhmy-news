import React, { useEffect, useId, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  CheckCircle,
  FileText,
  Inbox,
  Image as ImageIcon,
  LayoutDashboard,
  Lock,
  LogOut,
  Newspaper,
  Plus,
  Save,
  SlidersHorizontal,
  Trash2,
  Upload,
} from 'lucide-react';
import {
  cmsService,
  emptyBoardPost,
  emptyNewsletterIssue,
  publicationStatuses,
  slugify,
} from '../lib/cms';
import { supabase } from '../lib/supabase';
import {
  createMilestone,
  createTeamMember,
  defaultSiteSettings,
  getSettingsSection,
  resolveSiteSettings,
  SITE_SETTINGS_KEY,
  settingsToSiteSection,
} from '../lib/siteSettings';
import type { SiteSettings } from '../lib/siteSettings';
import type {
  AdminInbox,
  ApplicationRecord,
  BoardPost,
  DonationRecord,
  ImageAsset,
  NewsletterIssue,
  PublicationStatus,
  SiteSection,
} from '../types/cms';

type AdminTab = 'overview' | 'settings' | 'posts' | 'newsletters' | 'sections' | 'inbox';

const statusLabels: Record<PublicationStatus, string> = {
  draft: '초안',
  published: '게시',
  archived: '보관',
};

const inputClass = 'w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500';
const labelClass = 'block text-sm font-semibold text-gray-700 mb-1';

function nowMonth() {
  return new Date().toISOString().slice(0, 7);
}

function formatDate(value?: string | null) {
  if (!value) return '-';
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function isDonation(item: ApplicationRecord | DonationRecord): item is DonationRecord {
  return 'amount' in item;
}

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [inbox, setInbox] = useState<AdminInbox>({
    studentApplications: [],
    volunteerApplications: [],
    partnerApplications: [],
    donations: [],
  });
  const [selectedPost, setSelectedPost] = useState<BoardPost>(emptyBoardPost());
  const [selectedIssue, setSelectedIssue] = useState<NewsletterIssue>(emptyNewsletterIssue());
  const [selectedSection, setSelectedSection] = useState<SiteSection>({
    section_key: 'home.hero',
    title: '',
    body: '',
    locale: 'ko',
  });
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(!supabase);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isDemoMode = !supabase;
  const canUseAdmin = isDemoMode || Boolean(session);

  const inboxCount = useMemo(
    () =>
      inbox.studentApplications.length +
      inbox.volunteerApplications.length +
      inbox.partnerApplications.length +
      inbox.donations.length,
    [inbox],
  );
  const editableSections = useMemo(
    () => sections.filter((section) => section.section_key !== SITE_SETTINGS_KEY),
    [sections],
  );

  const tabs: { id: AdminTab; label: string; icon: React.ElementType; count?: number }[] = [
    { id: 'overview', label: '대시보드', icon: LayoutDashboard },
    { id: 'settings', label: '사이트 설정', icon: SlidersHorizontal },
    { id: 'posts', label: '게시판', icon: FileText, count: posts.length },
    { id: 'newsletters', label: '소식지', icon: Newspaper, count: issues.length },
    { id: 'sections', label: '페이지 문구', icon: Save, count: editableSections.length },
    { id: 'inbox', label: '신청/후원', icon: Inbox, count: inboxCount },
  ];

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthReady(true);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!authReady || !canUseAdmin) return;
    refreshAll();
  }, [authReady, canUseAdmin]);

  const refreshAll = async () => {
    setLoading(true);
    setError('');
    try {
      const [nextPosts, nextIssues, nextSections, nextInbox] = await Promise.all([
        cmsService.listBoardPosts(true),
        cmsService.listNewsletterIssues(true),
        cmsService.listSiteSections(),
        cmsService.listAdminInbox(),
      ]);

      setPosts(nextPosts);
      setIssues(nextIssues);
      setSections(nextSections);
      setSiteSettings(resolveSiteSettings(nextSections));
      setInbox(nextInbox);
      const nextEditableSections = nextSections.filter((section) => section.section_key !== SITE_SETTINGS_KEY);
      setSelectedPost(nextPosts[0] || emptyBoardPost());
      setSelectedIssue(nextIssues[0] || emptyNewsletterIssue());
      setSelectedSection(nextEditableSections[0] || {
        section_key: 'home.hero',
        title: '',
        body: '',
        locale: 'ko',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '관리 데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const flash = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 3000);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!supabase) return;

    setSaving(true);
    setError('');
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      if (authError) throw authError;
      flash('로그인되었습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setSession(null);
  };

  const savePost = async () => {
    setSaving(true);
    setError('');
    try {
      const saved = await cmsService.saveBoardPost({
        ...selectedPost,
        slug: selectedPost.slug || slugify(selectedPost.title),
      });
      await refreshAll();
      setSelectedPost(saved);
      flash('게시글이 저장되었습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시글 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (post: BoardPost) => {
    if (!post.id) return;
    setSaving(true);
    setError('');
    try {
      await cmsService.deleteBoardPost(post.id);
      await refreshAll();
      flash('게시글이 삭제되었습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '게시글 삭제에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const saveIssue = async () => {
    setSaving(true);
    setError('');
    try {
      const saved = await cmsService.saveNewsletterIssue({
        ...selectedIssue,
        slug: selectedIssue.slug || slugify(selectedIssue.title),
      });
      await refreshAll();
      setSelectedIssue(saved);
      flash('소식지가 저장되었습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '소식지 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const deleteIssue = async (issue: NewsletterIssue) => {
    if (!issue.id) return;
    setSaving(true);
    setError('');
    try {
      await cmsService.deleteNewsletterIssue(issue.id);
      await refreshAll();
      flash('소식지가 삭제되었습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '소식지 삭제에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const generateIssue = async () => {
    setSaving(true);
    setError('');
    try {
      const draft = await cmsService.generateNewsletterDraft(nowMonth());
      await refreshAll();
      setSelectedIssue(draft);
      setActiveTab('newsletters');
      flash('이번 달 소식지 초안이 생성되었습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '소식지 생성에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const saveSection = async () => {
    setSaving(true);
    setError('');
    try {
      const saved = await cmsService.saveSiteSection(selectedSection);
      await refreshAll();
      setSelectedSection(saved);
      flash('페이지 문구가 저장되었습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '페이지 문구 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const saveSiteSettings = async () => {
    setSaving(true);
    setError('');
    try {
      const existing = getSettingsSection(sections);
      const saved = await cmsService.saveSiteSection(settingsToSiteSection(siteSettings, existing));
      const nextSections = existing
        ? sections.map((section) => (
            section.section_key === SITE_SETTINGS_KEY && section.locale === 'ko' ? saved : section
          ))
        : [saved, ...sections];
      setSections(nextSections);
      setSiteSettings(resolveSiteSettings(nextSections));
      flash('사이트 설정이 저장되었습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '사이트 설정 저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const updateInboxStatus = async (table: string, id: string, status: string) => {
    setSaving(true);
    setError('');
    try {
      await cmsService.updateInboxStatus(table, id, status);
      await refreshAll();
      flash('상태가 업데이트되었습니다.');
    } catch (err) {
      setError(err instanceof Error ? err.message : '상태 업데이트에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (!authReady || (loading && canUseAdmin)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">관리자 데이터를 준비하는 중입니다.</p>
      </div>
    );
  }

  if (!canUseAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <Lock className="mx-auto h-12 w-12 text-blue-700" />
            <h1 className="mt-4 text-2xl font-bold text-blue-900">LHMY 관리자 로그인</h1>
            <p className="mt-2 text-sm text-gray-600">Supabase Auth에 등록된 관리자 계정으로 로그인하세요.</p>
          </div>
          {error && <p className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <label className={labelClass}>
            이메일
            <input type="email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} className={inputClass} required />
          </label>
          <label className={`${labelClass} mt-4`}>
            비밀번호
            <input type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} className={inputClass} required />
          </label>
          <button disabled={saving} className="mt-6 w-full rounded-lg bg-blue-800 py-3 font-semibold text-white hover:bg-blue-900 disabled:opacity-60">
            로그인
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">LHMY 관리자 대시보드</h1>
              <p className="mt-1 text-gray-600">게시판, 페이지 문구, 월간 소식지를 관리합니다.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {isDemoMode && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                  Supabase 미연결 데모 모드
                </span>
              )}
              <button onClick={refreshAll} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700">
                새로고침
              </button>
              {!isDemoMode && (
                <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white">
                  <LogOut className="h-4 w-4" />
                  로그아웃
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(message || error) && (
          <div className={`mb-6 rounded-lg p-4 ${error ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {error || message}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-200 h-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-semibold ${
                  activeTab === tab.id ? 'bg-blue-800 text-white' : 'text-gray-700 hover:bg-blue-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </span>
                {typeof tab.count === 'number' && <span>{tab.count}</span>}
              </button>
            ))}
          </aside>

          <section>
            {activeTab === 'overview' && (
              <Overview posts={posts} issues={issues} inboxCount={inboxCount} onGenerateIssue={generateIssue} saving={saving} />
            )}
            {activeTab === 'posts' && (
              <PostManager
                posts={posts}
                selectedPost={selectedPost}
                onSelect={setSelectedPost}
                onChange={setSelectedPost}
                onNew={() => setSelectedPost(emptyBoardPost())}
                onSave={savePost}
                onDelete={deletePost}
                saving={saving}
              />
            )}
            {activeTab === 'settings' && (
              <SiteSettingsManager
                settings={siteSettings}
                onChange={setSiteSettings}
                onSave={saveSiteSettings}
                saving={saving}
              />
            )}
            {activeTab === 'newsletters' && (
              <NewsletterManager
                issues={issues}
                selectedIssue={selectedIssue}
                onSelect={setSelectedIssue}
                onChange={setSelectedIssue}
                onNew={() => setSelectedIssue(emptyNewsletterIssue())}
                onGenerate={generateIssue}
                onSave={saveIssue}
                onDelete={deleteIssue}
                saving={saving}
              />
            )}
            {activeTab === 'sections' && (
              <SectionManager
                sections={editableSections}
                selectedSection={selectedSection}
                onSelect={setSelectedSection}
                onChange={setSelectedSection}
                onSave={saveSection}
                saving={saving}
              />
            )}
            {activeTab === 'inbox' && (
              <InboxManager inbox={inbox} onUpdateStatus={updateInboxStatus} saving={saving} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

interface OverviewProps {
  posts: BoardPost[];
  issues: NewsletterIssue[];
  inboxCount: number;
  onGenerateIssue: () => void;
  saving: boolean;
}

function Overview({ posts, issues, inboxCount, onGenerateIssue, saving }: OverviewProps) {
  const publishedPosts = posts.filter((post) => post.status === 'published').length;
  const draftIssues = issues.filter((issue) => issue.status === 'draft').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard label="전체 게시글" value={posts.length} />
        <StatCard label="공개 게시글" value={publishedPosts} />
        <StatCard label="소식지 초안" value={draftIssues} />
        <StatCard label="신청/후원" value={inboxCount} />
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h2 className="text-xl font-bold text-blue-900 mb-3">월간 소식지 자동 생성</h2>
        <p className="text-gray-700 mb-5">
          게시된 소식을 모아 이번 달 소식지 초안을 만듭니다. 자동 생성 결과는 바로 공개되지 않고 초안으로 저장됩니다.
        </p>
        <button
          onClick={onGenerateIssue}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-3 font-semibold text-white hover:bg-amber-600 disabled:opacity-60"
        >
          <Newspaper className="h-5 w-5" />
          소식지 초안 생성
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-200">
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-blue-900">{value}</p>
    </div>
  );
}

interface ImageUrlFieldProps {
  label: string;
  value?: string | null;
  onChange: (value: string) => void;
  className?: string;
}

function ImageUrlField({ label, value, onChange, className = '' }: ImageUrlFieldProps) {
  const inputId = useId();
  const [assets, setAssets] = useState<ImageAsset[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState('');

  const loadAssets = async () => {
    try {
      setAssets(await cmsService.listImageAssets());
    } catch {
      setAssets([]);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setImageError('');
    setUploading(true);
    try {
      const asset = await cmsService.uploadImageAsset(file);
      onChange(asset.url);
      setAssets((current) => [asset, ...current.filter((item) => item.url !== asset.url)]);
    } catch (err) {
      setImageError(err instanceof Error ? err.message : '이미지 URL을 만들지 못했습니다.');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className={className}>
      <span className={`${labelClass} flex items-center gap-1`}>
        <ImageIcon className="h-4 w-4" />
        {label}
      </span>
      <div className="flex flex-col gap-2 md:flex-row">
        <input value={value || ''} onChange={(event) => onChange(event.target.value)} className={inputClass} placeholder="/lhmy-photos/example.jpg 또는 https://..." />
        <input id={inputId} type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
        <label
          htmlFor={inputId}
          className={`inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 ${uploading ? 'pointer-events-none opacity-60' : ''}`}
        >
          <Upload className="h-4 w-4" />
          {uploading ? '업로드 중' : '사진 업로드'}
        </label>
      </div>
      <p className="mt-1 text-xs text-gray-500">
        업로드하면 URL이 자동 입력됩니다. 운영 환경에서는 Supabase Storage의 공개 버킷 site-images에 저장됩니다.
      </p>
      {imageError && <p className="mt-1 text-sm text-red-600">{imageError}</p>}
      {assets.length > 0 && (
        <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-gray-700">사진 선택</p>
            <button type="button" onClick={loadAssets} className="text-xs font-semibold text-blue-700">
              목록 새로고침
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {assets.map((asset) => (
              <button
                key={`${asset.source}-${asset.url}`}
                type="button"
                onClick={() => onChange(asset.url)}
                className={`overflow-hidden rounded-lg border bg-white text-left transition hover:border-blue-500 ${value === asset.url ? 'border-blue-700 ring-2 ring-blue-200' : 'border-gray-200'}`}
                title={asset.url}
              >
                <img src={asset.url} alt={asset.name} className="h-20 w-full object-cover" />
                <span className="block truncate px-2 py-1 text-xs text-gray-600">{asset.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {value && (
        <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
          <img src={value} alt={`${label} preview`} className="h-48 w-full object-cover" />
        </div>
      )}
    </div>
  );
}

interface PostManagerProps {
  posts: BoardPost[];
  selectedPost: BoardPost;
  onSelect: (post: BoardPost) => void;
  onChange: (post: BoardPost) => void;
  onNew: () => void;
  onSave: () => void;
  onDelete: (post: BoardPost) => void;
  saving: boolean;
}

function PostManager({ posts, selectedPost, onSelect, onChange, onNew, onSave, onDelete, saving }: PostManagerProps) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
      <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
        <button onClick={onNew} className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 py-3 font-semibold text-white">
          <Plus className="h-4 w-4" />
          새 게시글
        </button>
        <div className="space-y-2">
          {posts.map((post) => (
            <button
              key={post.id || post.slug}
              onClick={() => onSelect(post)}
              className={`w-full rounded-lg border p-3 text-left ${selectedPost.id === post.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}
            >
              <p className="font-semibold text-gray-900 line-clamp-2">{post.title || '제목 없음'}</p>
              <p className="mt-1 text-xs text-gray-500">{statusLabels[post.status]} · {post.category}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>제목</span>
            <input value={selectedPost.title} onChange={(event) => onChange({ ...selectedPost, title: event.target.value })} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>슬러그</span>
            <input value={selectedPost.slug} onChange={(event) => onChange({ ...selectedPost, slug: slugify(event.target.value) })} className={inputClass} placeholder="자동 생성 가능" />
          </label>
          <label>
            <span className={labelClass}>카테고리</span>
            <input value={selectedPost.category} onChange={(event) => onChange({ ...selectedPost, category: event.target.value })} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>상태</span>
            <select value={selectedPost.status} onChange={(event) => onChange({ ...selectedPost, status: event.target.value as PublicationStatus })} className={inputClass}>
              {publicationStatuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}
            </select>
          </label>
          <ImageUrlField
            className="md:col-span-2"
            label="대표 이미지 URL"
            value={selectedPost.cover_image_url}
            onChange={(cover_image_url) => onChange({ ...selectedPost, cover_image_url })}
          />
          <label className="md:col-span-2">
            <span className={labelClass}>요약</span>
            <textarea value={selectedPost.excerpt} onChange={(event) => onChange({ ...selectedPost, excerpt: event.target.value })} className={`${inputClass} min-h-24`} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClass}>본문</span>
            <textarea value={selectedPost.body} onChange={(event) => onChange({ ...selectedPost, body: event.target.value })} className={`${inputClass} min-h-64`} />
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={selectedPost.pinned} onChange={(event) => onChange({ ...selectedPost, pinned: event.target.checked })} />
            <span className="text-sm font-semibold text-gray-700">상단 고정</span>
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white disabled:opacity-60">
            <Save className="h-4 w-4" />
            저장
          </button>
          {selectedPost.id && (
            <button onClick={() => onDelete(selectedPost)} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white disabled:opacity-60">
              <Trash2 className="h-4 w-4" />
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface NewsletterManagerProps {
  issues: NewsletterIssue[];
  selectedIssue: NewsletterIssue;
  onSelect: (issue: NewsletterIssue) => void;
  onChange: (issue: NewsletterIssue) => void;
  onNew: () => void;
  onGenerate: () => void;
  onSave: () => void;
  onDelete: (issue: NewsletterIssue) => void;
  saving: boolean;
}

function NewsletterManager({ issues, selectedIssue, onSelect, onChange, onNew, onGenerate, onSave, onDelete, saving }: NewsletterManagerProps) {
  const updateArticle = (index: number, field: 'title' | 'body' | 'image_url', value: string) => {
    const articles = selectedIssue.articles.map((article, articleIndex) => (
      articleIndex === index ? { ...article, [field]: value } : article
    ));
    onChange({ ...selectedIssue, articles });
  };

  const addArticle = () => {
    onChange({
      ...selectedIssue,
      articles: [
        ...selectedIssue.articles,
        { title: '', body: '', image_url: '', display_order: selectedIssue.articles.length },
      ],
    });
  };

  const removeArticle = (index: number) => {
    onChange({
      ...selectedIssue,
      articles: selectedIssue.articles.filter((_article, articleIndex) => articleIndex !== index),
    });
  };

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
      <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
        <div className="grid grid-cols-1 gap-2">
          <button onClick={onNew} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-4 py-3 font-semibold text-white">
            <Plus className="h-4 w-4" />
            새 소식지
          </button>
          <button onClick={onGenerate} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 font-semibold text-white disabled:opacity-60">
            <Newspaper className="h-4 w-4" />
            자동 초안 생성
          </button>
        </div>
        <div className="mt-4 space-y-2">
          {issues.map((issue) => (
            <button
              key={issue.id || issue.slug}
              onClick={() => onSelect(issue)}
              className={`w-full rounded-lg border p-3 text-left ${selectedIssue.id === issue.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}
            >
              <p className="font-semibold text-gray-900 line-clamp-2">{issue.title}</p>
              <p className="mt-1 text-xs text-gray-500">{statusLabels[issue.status]} · {issue.issue_month}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>제목</span>
            <input value={selectedIssue.title} onChange={(event) => onChange({ ...selectedIssue, title: event.target.value })} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>발행 월</span>
            <input value={selectedIssue.issue_month} onChange={(event) => onChange({ ...selectedIssue, issue_month: event.target.value })} className={inputClass} placeholder="2026-05" />
          </label>
          <label>
            <span className={labelClass}>슬러그</span>
            <input value={selectedIssue.slug} onChange={(event) => onChange({ ...selectedIssue, slug: slugify(event.target.value) })} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>상태</span>
            <select value={selectedIssue.status} onChange={(event) => onChange({ ...selectedIssue, status: event.target.value as PublicationStatus })} className={inputClass}>
              {publicationStatuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}
            </select>
          </label>
          <label className="md:col-span-2">
            <span className={labelClass}>요약</span>
            <textarea value={selectedIssue.summary} onChange={(event) => onChange({ ...selectedIssue, summary: event.target.value })} className={`${inputClass} min-h-20`} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClass}>편집자 노트</span>
            <textarea value={selectedIssue.editor_note} onChange={(event) => onChange({ ...selectedIssue, editor_note: event.target.value })} className={`${inputClass} min-h-20`} />
          </label>
        </div>

        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-blue-900">기사 구성</h3>
            <button onClick={addArticle} className="rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700">
              기사 추가
            </button>
          </div>
          <div className="space-y-4">
            {selectedIssue.articles.map((article, index) => (
              <div key={article.id || index} className="rounded-lg border border-gray-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-semibold text-gray-700">기사 {index + 1}</p>
                  <button onClick={() => removeArticle(index)} className="text-sm font-semibold text-red-600">삭제</button>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <input value={article.title} onChange={(event) => updateArticle(index, 'title', event.target.value)} className={inputClass} placeholder="기사 제목" />
                  <ImageUrlField
                    label="이미지 URL"
                    value={article.image_url}
                    onChange={(image_url) => updateArticle(index, 'image_url', image_url)}
                  />
                  <textarea value={article.body} onChange={(event) => updateArticle(index, 'body', event.target.value)} className={`${inputClass} min-h-36`} placeholder="기사 본문" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white disabled:opacity-60">
            <Save className="h-4 w-4" />
            저장
          </button>
          {selectedIssue.id && (
            <button onClick={() => onDelete(selectedIssue)} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white disabled:opacity-60">
              <Trash2 className="h-4 w-4" />
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface SectionManagerProps {
  sections: SiteSection[];
  selectedSection: SiteSection;
  onSelect: (section: SiteSection) => void;
  onChange: (section: SiteSection) => void;
  onSave: () => void;
  saving: boolean;
}

function SectionManager({ sections, selectedSection, onSelect, onChange, onSave, saving }: SectionManagerProps) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[320px_1fr]">
      <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id || `${section.section_key}-${section.locale}`}
              onClick={() => onSelect(section)}
              className={`w-full rounded-lg border p-3 text-left ${selectedSection.id === section.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}
            >
              <p className="font-semibold text-gray-900">{section.section_key}</p>
              <p className="text-xs text-gray-500">{section.locale}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>섹션 키</span>
            <input value={selectedSection.section_key} onChange={(event) => onChange({ ...selectedSection, section_key: event.target.value })} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>언어</span>
            <input value={selectedSection.locale} onChange={(event) => onChange({ ...selectedSection, locale: event.target.value })} className={inputClass} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClass}>제목</span>
            <input value={selectedSection.title} onChange={(event) => onChange({ ...selectedSection, title: event.target.value })} className={inputClass} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClass}>본문</span>
            <textarea value={selectedSection.body} onChange={(event) => onChange({ ...selectedSection, body: event.target.value })} className={`${inputClass} min-h-44`} />
          </label>
          <ImageUrlField
            className="md:col-span-2"
            label="이미지 URL"
            value={selectedSection.image_url}
            onChange={(image_url) => onChange({ ...selectedSection, image_url })}
          />
        </div>
        <button onClick={onSave} disabled={saving} className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white disabled:opacity-60">
          <Save className="h-4 w-4" />
          저장
        </button>
      </div>
    </div>
  );
}

interface SiteSettingsManagerProps {
  settings: SiteSettings;
  onChange: (settings: SiteSettings) => void;
  onSave: () => void;
  saving: boolean;
}

function SiteSettingsManager({ settings, onChange, onSave, saving }: SiteSettingsManagerProps) {
  const updateHomeStats = (field: keyof SiteSettings['homeStats'], value: string) => {
    onChange({ ...settings, homeStats: { ...settings.homeStats, [field]: value } });
  };

  const updatePrograms = (field: keyof SiteSettings['programs'], value: string) => {
    onChange({ ...settings, programs: { ...settings.programs, [field]: value } });
  };

  const updateFootball = (field: keyof SiteSettings['football'], value: string) => {
    onChange({ ...settings, football: { ...settings.football, [field]: value } });
  };

  const updateSupport = (field: keyof SiteSettings['support'], value: string) => {
    onChange({ ...settings, support: { ...settings.support, [field]: value } });
  };

  const updateContact = (field: keyof SiteSettings['contact'], value: string) => {
    onChange({ ...settings, contact: { ...settings.contact, [field]: value } });
  };

  const updateMilestone = (index: number, field: 'year' | 'title', value: string) => {
    onChange({
      ...settings,
      milestones: settings.milestones.map((milestone, milestoneIndex) => (
        milestoneIndex === index ? { ...milestone, [field]: value } : milestone
      )),
    });
  };

  const updateTeamMember = (index: number, field: 'name' | 'role' | 'description' | 'emoji', value: string) => {
    onChange({
      ...settings,
      team: settings.team.map((member, memberIndex) => (
        memberIndex === index ? { ...member, [field]: value } : member
      )),
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-blue-900">사이트 설정</h2>
            <p className="mt-1 text-sm text-gray-600">숫자, 운영시간, 팀원, 연혁, 프로그램 상태를 수정합니다.</p>
          </div>
          <button onClick={onSave} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white disabled:opacity-60">
            <Save className="h-4 w-4" />
            설정 저장
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h3 className="text-lg font-bold text-blue-900 mb-4">홈 숫자</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <label>
            <span className={labelClass}>교육생</span>
            <input value={settings.homeStats.students} onChange={(event) => updateHomeStats('students', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>교육프로그램</span>
            <input value={settings.homeStats.programs} onChange={(event) => updateHomeStats('programs', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>자원봉사자</span>
            <input value={settings.homeStats.volunteers} onChange={(event) => updateHomeStats('volunteers', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>운영 연수</span>
            <input value={settings.homeStats.years} onChange={(event) => updateHomeStats('years', event.target.value)} className={inputClass} />
          </label>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h3 className="text-lg font-bold text-blue-900 mb-4">프로그램 상태</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>홈 실용 기술 제목</span>
            <input value={settings.programs.homePractical} onChange={(event) => updatePrograms('homePractical', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>바리스타 과정</span>
            <input value={settings.programs.barista} onChange={(event) => updatePrograms('barista', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>제빵 과정</span>
            <input value={settings.programs.baking} onChange={(event) => updatePrograms('baking', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>미용 과정</span>
            <input value={settings.programs.hair} onChange={(event) => updatePrograms('hair', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>요리 과정</span>
            <input value={settings.programs.cuisine} onChange={(event) => updatePrograms('cuisine', event.target.value)} className={inputClass} />
          </label>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h3 className="text-lg font-bold text-blue-900 mb-4">축구팀</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>현재 선수</span>
            <input value={settings.football.currentPlayers} onChange={(event) => updateFootball('currentPlayers', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>설립 연도</span>
            <input value={settings.football.foundedYear} onChange={(event) => updateFootball('foundedYear', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>목표 연도</span>
            <input value={settings.football.goalsTargetYear} onChange={(event) => updateFootball('goalsTargetYear', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>훈련 일정</span>
            <input value={settings.football.trainingSchedule} onChange={(event) => updateFootball('trainingSchedule', event.target.value)} className={inputClass} />
          </label>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h3 className="text-lg font-bold text-blue-900 mb-4">지원하기 / 연락처</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <label>
            <span className={labelClass}>지원 대상 나이</span>
            <input value={settings.support.studentAge} onChange={(event) => updateSupport('studentAge', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>보호자 동의서 문구</span>
            <input value={settings.support.guardianConsentLabel} onChange={(event) => updateSupport('guardianConsentLabel', event.target.value)} className={inputClass} />
          </label>
          <label className="md:col-span-2">
            <span className={labelClass}>지원하기 운영시간</span>
            <input value={settings.support.officeHours} onChange={(event) => updateSupport('officeHours', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>직접 방문 월-금</span>
            <input value={settings.support.visitWeekdays} onChange={(event) => updateSupport('visitWeekdays', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>직접 방문 토.일</span>
            <input value={settings.support.visitClosed} onChange={(event) => updateSupport('visitClosed', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>연락처 운영시간 1</span>
            <input value={settings.contact.weekdays} onChange={(event) => updateContact('weekdays', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>연락처 운영시간 2</span>
            <input value={settings.contact.field} onChange={(event) => updateContact('field', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>연락처 휴무</span>
            <input value={settings.contact.closed} onChange={(event) => updateContact('closed', event.target.value)} className={inputClass} />
          </label>
          <label>
            <span className={labelClass}>연락처 FAQ 나이</span>
            <input value={settings.contact.studentAge} onChange={(event) => updateContact('studentAge', event.target.value)} className={inputClass} />
          </label>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-blue-900">연혁</h3>
          <button
            onClick={() => onChange({ ...settings, milestones: [...settings.milestones, createMilestone()] })}
            className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700"
          >
            <Plus className="h-4 w-4" />
            연혁 추가
          </button>
        </div>
        <div className="space-y-3">
          {settings.milestones.map((milestone, index) => (
            <div key={milestone.id} className="grid grid-cols-1 gap-3 rounded-lg border border-gray-200 p-4 md:grid-cols-[140px_1fr_auto]">
              <input value={milestone.year} onChange={(event) => updateMilestone(index, 'year', event.target.value)} className={inputClass} placeholder="2026.1" />
              <input value={milestone.title} onChange={(event) => updateMilestone(index, 'title', event.target.value)} className={inputClass} placeholder="연혁 내용" />
              <button
                onClick={() => onChange({ ...settings, milestones: settings.milestones.filter((_item, itemIndex) => itemIndex !== index) })}
                className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-blue-900">우리 팀</h3>
          <button
            onClick={() => onChange({ ...settings, team: [...settings.team, createTeamMember()] })}
            className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-700"
          >
            <Plus className="h-4 w-4" />
            팀원 추가
          </button>
        </div>
        <div className="space-y-4">
          {settings.team.map((member, index) => (
            <div key={member.id} className="rounded-lg border border-gray-200 p-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-[90px_1fr_1fr_auto]">
                <input value={member.emoji} onChange={(event) => updateTeamMember(index, 'emoji', event.target.value)} className={inputClass} placeholder="아이콘" />
                <input value={member.name} onChange={(event) => updateTeamMember(index, 'name', event.target.value)} className={inputClass} placeholder="이름" />
                <input value={member.role} onChange={(event) => updateTeamMember(index, 'role', event.target.value)} className={inputClass} placeholder="역할" />
                <button
                  onClick={() => onChange({ ...settings, team: settings.team.filter((_item, itemIndex) => itemIndex !== index) })}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white"
                >
                  삭제
                </button>
              </div>
              <textarea
                value={member.description}
                onChange={(event) => updateTeamMember(index, 'description', event.target.value)}
                className={`${inputClass} mt-3 min-h-20`}
                placeholder="소개"
              />
            </div>
          ))}
        </div>
      </div>

      <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-5 py-3 font-semibold text-white disabled:opacity-60">
        <Save className="h-4 w-4" />
        설정 저장
      </button>
    </div>
  );
}

interface InboxManagerProps {
  inbox: AdminInbox;
  onUpdateStatus: (table: string, id: string, status: string) => void;
  saving: boolean;
}

function InboxManager({ inbox, onUpdateStatus, saving }: InboxManagerProps) {
  return (
    <div className="space-y-6">
      <InboxGroup title="학생 신청" table="student_applications" rows={inbox.studentApplications} onUpdateStatus={onUpdateStatus} saving={saving} />
      <InboxGroup title="봉사 신청" table="volunteer_applications" rows={inbox.volunteerApplications} onUpdateStatus={onUpdateStatus} saving={saving} />
      <InboxGroup title="파트너 신청" table="partner_applications" rows={inbox.partnerApplications} onUpdateStatus={onUpdateStatus} saving={saving} />
      <InboxGroup title="후원" table="donations" rows={inbox.donations} onUpdateStatus={onUpdateStatus} saving={saving} />
    </div>
  );
}

interface InboxGroupProps {
  title: string;
  table: string;
  rows: (ApplicationRecord | DonationRecord)[];
  onUpdateStatus: (table: string, id: string, status: string) => void;
  saving: boolean;
}

function InboxGroup({ title, table, rows, onUpdateStatus, saving }: InboxGroupProps) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-gray-200">
      <h2 className="text-lg font-bold text-blue-900 mb-4">{title} ({rows.length})</h2>
      {rows.length === 0 && <p className="text-gray-500">접수된 항목이 없습니다.</p>}
      <div className="space-y-3">
        {rows.map((item) => (
          <div key={item.id} className="rounded-lg border border-gray-200 p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-bold text-gray-900">{item.name}</p>
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">{item.status}</span>
                </div>
                <p className="mt-1 text-sm text-gray-600">{item.phone} {item.email ? `· ${item.email}` : ''}</p>
                {isDonation(item) && <p className="mt-1 text-sm font-semibold text-green-700">{item.amount.toLocaleString()} · {item.donation_type}</p>}
                {item.message && <p className="mt-2 text-sm text-gray-700">{item.message}</p>}
                <p className="mt-2 text-xs text-gray-500">{formatDate(item.created_at)}</p>
              </div>
              <div className="flex gap-2">
                <button disabled={saving} onClick={() => onUpdateStatus(table, item.id, 'approved')} className="inline-flex items-center gap-1 rounded bg-green-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">
                  <CheckCircle className="h-4 w-4" />
                  승인
                </button>
                <button disabled={saving} onClick={() => onUpdateStatus(table, item.id, 'rejected')} className="rounded bg-red-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-60">
                  거절
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
