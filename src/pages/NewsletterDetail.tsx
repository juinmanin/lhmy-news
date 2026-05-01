import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Printer } from 'lucide-react';
import { cmsService } from '../lib/cms';
import type { NewsletterIssue } from '../types/cms';

const NewsletterDetail: React.FC = () => {
  const { issue = '' } = useParams();
  const [newsletter, setNewsletter] = useState<NewsletterIssue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cmsService
      .getNewsletterIssueBySlug(issue)
      .then(setNewsletter)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [issue]);

  return (
    <div className="min-h-screen bg-stone-200">
      <div className="no-print sticky top-16 z-30 border-b border-stone-300 bg-white/95 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link to="/newsletter" className="inline-flex items-center gap-2 text-stone-800 font-semibold">
            <ArrowLeft className="h-4 w-4" />
            소식지 목록
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2c1810] px-4 py-2 text-white font-semibold"
          >
            <Printer className="h-4 w-4" />
            인쇄/PDF
          </button>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0">
        {loading && <p className="rounded-lg bg-white p-6 shadow-sm">소식지를 불러오는 중입니다.</p>}
        {error && <p className="rounded-lg bg-red-50 p-6 text-red-700">{error}</p>}
        {!loading && !newsletter && (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-stone-900 mb-3">소식지를 찾을 수 없습니다</h1>
            <p className="text-gray-600">삭제되었거나 아직 공개되지 않은 소식지입니다.</p>
          </div>
        )}

        {newsletter && (
          <article className="newsletter-page mx-auto bg-[#f8f3ea] p-8 md:p-12 shadow-2xl print:shadow-none">
            <header className="border-b-4 border-[#2c1810] pb-6 mb-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm tracking-[0.2em] uppercase text-[#8a6b3c]">Lighthouse Malaysia</p>
                  <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#2c1810] mt-2">{newsletter.title}</h1>
                </div>
                <div className="shrink-0 rounded-full border-2 border-[#c4a35a] px-5 py-3 text-center">
                  <p className="text-sm text-[#6b5430]">Issue</p>
                  <p className="font-bold text-[#2c1810]">{newsletter.issue_month}</p>
                </div>
              </div>
              {newsletter.summary && <p className="mt-6 text-lg text-[#4c3627]">{newsletter.summary}</p>}
            </header>

            {newsletter.editor_note && (
              <aside className="mb-8 border-l-4 border-[#c4a35a] bg-white/60 p-5">
                <p className="text-sm font-bold text-[#8a6b3c] mb-2">Editor Note</p>
                <p className="text-[#3c2a20]">{newsletter.editor_note}</p>
              </aside>
            )}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {newsletter.articles.map((article, index) => (
                <section key={article.id || index} className={index === 0 ? 'md:col-span-2' : ''}>
                  {article.image_url && (
                    <img src={article.image_url} alt="" className="mb-4 h-56 w-full object-cover grayscale-[20%]" />
                  )}
                  <h2 className={index === 0 ? 'text-3xl font-serif font-bold text-[#2c1810]' : 'text-2xl font-serif font-bold text-[#2c1810]'}>
                    {article.title}
                  </h2>
                  <div className="mt-3 text-[#3c2a20] leading-8">
                    {article.body.split('\n').map((line, lineIndex) => (
                      line.trim() ? <p key={lineIndex} className="mb-3">{line}</p> : <br key={lineIndex} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <footer className="mt-10 border-t border-[#c4a35a] pt-5 text-center text-sm text-[#6b5430]">
              등대 말레이시아 · LHMY.kr · {newsletter.issue_month}
            </footer>
          </article>
        )}
      </section>
    </div>
  );
};

export default NewsletterDetail;
