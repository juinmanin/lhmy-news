import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays } from 'lucide-react';
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

const NewsDetail: React.FC = () => {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<BoardPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cmsService
      .getBoardPostBySlug(slug)
      .then(setPost)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/news" className="inline-flex items-center gap-2 text-blue-700 font-semibold mb-8">
          <ArrowLeft className="h-4 w-4" />
          소식 목록
        </Link>

        {loading && <p className="rounded-lg bg-white p-6 shadow-sm">소식을 불러오는 중입니다.</p>}
        {error && <p className="rounded-lg bg-red-50 p-6 text-red-700">{error}</p>}
        {!loading && !post && (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-blue-900 mb-3">소식을 찾을 수 없습니다</h1>
            <p className="text-gray-600">삭제되었거나 아직 공개되지 않은 게시글입니다.</p>
          </div>
        )}

        {post && (
          <article className="rounded-lg bg-white shadow-sm ring-1 ring-gray-200 overflow-hidden">
            {post.cover_image_url && (
              <img src={post.cover_image_url} alt="" className="h-72 w-full object-cover" />
            )}
            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-5">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">{post.category}</span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  {formatDate(post.published_at || post.created_at)}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-5">{post.title}</h1>
              {post.excerpt && <p className="text-xl text-gray-700 border-l-4 border-amber-400 pl-4 mb-8">{post.excerpt}</p>}
              <div className="prose prose-blue max-w-none">
                {post.body.split('\n').map((line, index) => (
                  line.trim() ? <p key={index}>{line}</p> : <br key={index} />
                ))}
              </div>
            </div>
          </article>
        )}
      </section>
    </div>
  );
};

export default NewsDetail;
