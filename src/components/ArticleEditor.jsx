// 기사 편집 컴포넌트 - 제목, 본문, 사진 업로드 포함
import React from 'react'
import PhotoUploader from './PhotoUploader.jsx'

/**
 * ArticleEditor 컴포넌트
 * @param {Object} props
 * @param {'main' | 'sub'} props.type - 기사 종류
 * @param {number} props.index - 서브 기사 인덱스 (type=sub일 때)
 * @param {Object} props.article - 기사 데이터
 * @param {Function} props.onChange - 변경 콜백
 */
export default function ArticleEditor({ type = 'main', index, article, onChange }) {
  const isMain = type === 'main'

  const handleChange = (field, value) => {
    onChange({ ...article, [field]: value })
  }

  return (
    <div className="space-y-4">
      {/* 제목 입력 */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#2C1810' }}>
          {isMain ? '메인 기사 제목' : `서브 기사 ${(index ?? 0) + 1} 제목`}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={article?.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder={isMain ? '이달의 주요 소식 제목을 입력하세요' : '서브 기사 제목'}
          className="input-field"
        />
      </div>

      {/* 리드 문단 (메인 기사만) */}
      {isMain && (
        <div>
          <label className="block text-sm font-medium mb-1" style={{ color: '#2C1810' }}>
            리드 문단
            <span className="text-xs ml-2 font-normal" style={{ color: '#7a6040' }}>
              (기사의 핵심을 요약한 첫 문장)
            </span>
          </label>
          <textarea
            value={article?.lead || ''}
            onChange={(e) => handleChange('lead', e.target.value)}
            placeholder="이번 달 소식의 핵심을 한두 문장으로 요약해주세요."
            className="textarea-field"
            rows={2}
          />
        </div>
      )}

      {/* 본문 입력 */}
      <div>
        <label className="block text-sm font-medium mb-1" style={{ color: '#2C1810' }}>
          본문 내용
        </label>
        <textarea
          value={article?.body || ''}
          onChange={(e) => handleChange('body', e.target.value)}
          placeholder={
            isMain
              ? '이달의 주요 활동과 소식을 자유롭게 작성해주세요.\n\n문단 구분은 빈 줄로 해주세요.'
              : '간단한 내용을 작성해주세요.'
          }
          className="textarea-field"
          rows={isMain ? 8 : 4}
        />
        {/* 글자 수 표시 */}
        <p className="text-right text-xs mt-1" style={{ color: '#9a8060' }}>
          {(article?.body || '').length}자
        </p>
      </div>

      {/* 사진 업로드 */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#2C1810' }}>
          {isMain ? '활동 사진 (최대 2장)' : '대표 사진 (선택)'}
        </label>
        {isMain ? (
          <PhotoUploader
            photos={article?.photos || []}
            onChange={(photos) => handleChange('photos', photos)}
            maxPhotos={2}
          />
        ) : (
          <PhotoUploader
            photos={article?.photo}
            onChange={(photo) => handleChange('photo', photo)}
            single
          />
        )}
      </div>
    </div>
  )
}
