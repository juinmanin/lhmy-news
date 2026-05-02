import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarRange, FileText, Printer } from 'lucide-react';
import { cmsService } from '../lib/cms';
import type { NewsletterIssue } from '../types/cms';

const Newsletter: React.FC = () => {
  const [issues, setIssues] = useState<NewsletterIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cmsService
      .listNewsletterIssues(false)
      .then(setIssues)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      <section className="bg-[#2c1810] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FileText className="h-14 w-14 text-amber-300 mx-auto mb-5" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">월간 소식지</h1>
          <p className="text-stone-200 text-lg max-w-3xl mx-auto">
            매달의 게시글과 활동 기록을 모아 인쇄 가능한 소식지로 발행합니다.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && <p className="rounded-lg bg-white p-6 shadow-sm">소식지를 불러오는 중입니다.</p>}
        {error && <p className="rounded-lg bg-red-50 p-6 text-red-700">{error}</p>}

        {!loading && issues.length === 0 && (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 mb-3">공개된 소식지가 없습니다</h2>
            <p className="text-gray-600">관리자 화면에서 초안을 생성하고 게시하면 이곳에 표시됩니다.</p>
          </div>
        )}

        <div className="space-y-6">
          {issues.map((issue) => (
            <article key={issue.id || issue.slug} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-stone-200">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500 mb-3">
                    <span className="inline-flex items-center gap-1">
                      <CalendarRange className="h-4 w-4" />
                      {issue.issue_month}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Printer className="h-4 w-4" />
                      인쇄/PDF 지원
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-stone-950 mb-2">{issue.title}</h2>
                  <p className="text-gray-700">{issue.summary}</p>
                </div>
                <Link
                  to={`/newsletter/${issue.slug}`}
                  className="inline-flex justify-center rounded-lg bg-[#2c1810] px-5 py-3 font-semibold text-white hover:bg-[#42251a]"
                >
                  소식지 보기
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
