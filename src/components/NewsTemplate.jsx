// 소식지 레이아웃 컴포넌트 - A4 비율 기반 신문 스타일
import React from 'react'
import {
  getOptimalColumnCount,
  getPhotoGridClass,
  getHeadlineFontSize,
  getValidSubArticles,
  formatKoreanDate,
  formatIssue,
  getThemeClass,
} from '../utils/layoutHelper'

/**
 * NewsTemplate 컴포넌트
 * @param {Object} props
 * @param {Object} props.newsData - 소식지 전체 데이터
 * @param {boolean} props.editable - 인라인 편집 활성화 여부
 * @param {number} props.fontSize - 폰트 크기 배율
 * @param {Function} props.onUpdate - 인라인 편집 후 업데이트 콜백
 */
export default function NewsTemplate({
  newsData,
  editable = false,
  fontSize = 1,
  onUpdate,
}) {
  const { meta, mainArticle, subArticles } = newsData || {}
  const validSubArticles = getValidSubArticles(subArticles)
  const columnCount = getOptimalColumnCount(mainArticle?.body)
  const themeClass = getThemeClass(meta?.theme)

  // contentEditable 변경 핸들러
  const handleEdit = (path, e) => {
    if (!editable || !onUpdate) return
    const value = e.currentTarget.innerText
    onUpdate(path, value)
  }

  // contentEditable 속성
  const editProps = (path) =>
    editable
      ? {
          contentEditable: true,
          suppressContentEditableWarning: true,
          onBlur: (e) => handleEdit(path, e),
        }
      : {}

  return (
    <div
      className={`newspaper-page ${themeClass}`}
      id="newspaper-print-area"
      style={{ fontSize: `${fontSize}rem` }}
    >
      {/* ===== 최상단 헤더 ===== */}
      <div className="newspaper-header">
        {/* 좌: 소식지명 */}
        <div
          className="text-sm font-medium"
          style={{ color: '#5a3c2c', fontFamily: 'Noto Serif KR, serif' }}
          {...editProps('meta.name')}
        >
          {meta?.name || '라이트하우스 소식지'}
        </div>

        {/* 중앙: 호수 배지 */}
        <div className="issue-badge">
          {meta?.issue || 1}
        </div>

        {/* 우: 날짜 및 부제목 */}
        <div className="text-right">
          <div className="text-sm font-medium" style={{ color: '#5a3c2c' }}>
            {formatKoreanDate(meta?.year || new Date().getFullYear(), meta?.month || new Date().getMonth() + 1)}
          </div>
          <div className="text-xs" style={{ color: '#7a6040' }} {...editProps('meta.subtitle')}>
            {meta?.subtitle || ''}
          </div>
        </div>
      </div>

      {/* ===== 소식지 메인 타이틀 ===== */}
      <div className="newspaper-title-area">
        <h1
          className="newspaper-title"
          {...editProps('meta.name')}
        >
          {meta?.name || '라이트하우스 소식지'}
        </h1>
        {meta?.subtitle && (
          <p className="newspaper-subtitle" {...editProps('meta.subtitle')}>
            {meta.subtitle}
          </p>
        )}
        <p className="newspaper-subtitle" style={{ marginTop: '2px' }}>
          {formatIssue(meta?.issue || 1)} &nbsp;·&nbsp;{formatKoreanDate(meta?.year || new Date().getFullYear(), meta?.month || new Date().getMonth() + 1)}
        </p>
      </div>

      <hr className="section-divider" />

      {/* ===== 메인 기사 ===== */}
      <div className="main-article">
        {/* 메인 헤드라인 */}
        {mainArticle?.title && (
          <h2
            className="main-headline"
            style={{ fontSize: getHeadlineFontSize(mainArticle.title, 'main') }}
            {...editProps('mainArticle.title')}
          >
            {mainArticle.title}
          </h2>
        )}

        {/* 리드 문단 */}
        {mainArticle?.lead && (
          <p className="article-lead" {...editProps('mainArticle.lead')}>
            {mainArticle.lead}
          </p>
        )}

        <hr className="thin-divider" />

        {/* 사진 그리드 */}
        {mainArticle?.photos && mainArticle.photos.length > 0 && (
          <div className={getPhotoGridClass(mainArticle.photos.length)}>
            {mainArticle.photos.map((photo, i) => (
              photo?.dataUrl && (
                <div key={i} className="photo-item">
                  <img
                    src={photo.dataUrl}
                    alt={photo.caption || `활동 사진 ${i + 1}`}
                  />
                  {photo.caption && (
                    <div
                      className="photo-caption"
                      {...editProps(`mainArticle.photos.${i}.caption`)}
                    >
                      {photo.caption}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* 본문 (다단 칼럼) */}
        {mainArticle?.body && (
          <div
            className={`article-body mt-3 ${columnCount === 2 ? 'column-layout-2' : columnCount === 3 ? 'column-layout-3' : ''}`}
            {...editProps('mainArticle.body')}
          >
            {mainArticle.body.split('\n').map((line, i) => (
              line.trim() ? (
                <p key={i} style={{ marginBottom: '0.6em' }}>{line}</p>
              ) : (
                <br key={i} />
              )
            ))}
          </div>
        )}

        {/* 내용이 없을 때 플레이스홀더 */}
        {!mainArticle?.title && !mainArticle?.body && (
          <div className="text-center py-8" style={{ color: '#9a8060' }}>
            <p className="text-sm">메인 기사 내용을 편집기에서 입력해주세요.</p>
          </div>
        )}
      </div>

      {/* ===== 서브 기사 섹션 ===== */}
      {validSubArticles.length > 0 && (
        <>
          <hr className="section-divider" />
          <div className={`sub-articles-grid ${validSubArticles.length === 1 ? 'grid-cols-1' : ''}`}>
            {validSubArticles.map((article, i) => (
              <div key={i} className="sub-article">
                {/* 서브 기사 제목 */}
                {article.title && (
                  <h3
                    className="sub-article-title"
                    style={{ fontSize: getHeadlineFontSize(article.title, 'sub') }}
                    {...editProps(`subArticles.${i}.title`)}
                  >
                    {article.title}
                  </h3>
                )}

                {/* 서브 기사 사진 */}
                {article.photo?.dataUrl && (
                  <img
                    src={article.photo.dataUrl}
                    alt={article.title || `서브 기사 ${i + 1}`}
                    className="sub-article-photo"
                  />
                )}

                {/* 서브 기사 본문 */}
                {article.body && (
                  <p
                    className="sub-article-body"
                    {...editProps(`subArticles.${i}.body`)}
                  >
                    {article.body}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ===== 하단 푸터 ===== */}
      <div
        className="mt-4 pt-3 text-center text-xs"
        style={{
          borderTop: '1px solid #C4A35A',
          color: '#7a6040',
          fontFamily: 'Noto Serif KR, serif',
        }}
      >
        {meta?.name || '라이트하우스 소식지'} · {formatIssue(meta?.issue || 1)} · {formatKoreanDate(meta?.year || new Date().getFullYear(), meta?.month || new Date().getMonth() + 1)}
      </div>
    </div>
  )
}
