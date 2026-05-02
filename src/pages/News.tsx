import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Megaphone, Pin, Search } from 'lucide-react';
import { cmsService } from '../lib/cms';
import type { BoardPost } from '../types/cms';

function formatDate(value?: string | null) {
  if (!value) return '날짜 미정';
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value));
}

const News: React.FC = () => {
  const [posts, setPosts] = useState<BoardPost[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cmsService
      .listBoardPosts(false)
      .then(setPosts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter((post) => {
    const searchable = `${post.title} ${post.excerpt} ${post.body} ${post.category}`.toLowerCase();
    return searchable.includes(query.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-r from-blue-900 to-cyan-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-5">
            <Megaphone className="h-12 w-12 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">LHMY 소식</h1>
          <p className="text-center text-blue-100 text-lg max-w-3xl mx-auto">
            등대 말레이시아의 교육, 축구, 공동체 활동을 관리자가 직접 게시하고 업데이트합니다.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">게시판</h2>
            <p className="text-gray-600 mt-1">공지, 활동 보고, 후원 소식을 한곳에서 확인하세요.</p>
          </div>
          <label className="relative block md:w-80">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm focus:border-blue-500"
              placeholder="소식 검색"
            />
          </label>
        </div>

        {loading && <p className="rounded-lg bg-white p-6 text-gray-600 shadow-sm">소식을 불러오는 중입니다.</p>}
        {error && <p className="rounded-lg bg-red-50 p-6 text-red-700">{error}</p>}

        {!loading && filteredPosts.length === 0 && (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <p className="text-gray-700">아직 공개된 소식이 없습니다.</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <article key={post.id || post.slug} className="rounded-lg bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
              {post.cover_image_url && (
                <img src={post.cover_image_url} alt="" className="h-52 w-full object-cover" />
              )}
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{post.category}</span>
                  {post.pinned && (
                    <span className="inline-flex items-center gap-1 text-amber-700">
                      <Pin className="h-4 w-4" />
                      고정
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(post.published_at || post.created_at)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{post.title}</h3>
                <p className="text-gray-700 line-clamp-3 mb-5">{post.excerpt || post.body}</p>
                <Link to={`/news/${post.slug}`} className="font-semibold text-blue-700 hover:text-blue-900">
                  자세히 보기
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default News;
