// 편집 도구 모음 컴포넌트 - 미리보기 화면에서 사용
import React from 'react'

/**
 * EditToolbar 컴포넌트
 * @param {Object} props
 * @param {string} props.theme - 현재 테마 ('beige' | 'white' | 'blue')
 * @param {Function} props.onThemeChange - 테마 변경 콜백
 * @param {number} props.fontSize - 현재 폰트 크기 배율 (0.8~1.2)
 * @param {Function} props.onFontSizeChange - 폰트 크기 변경 콜백
 * @param {Function} props.onSave - 저장 콜백
 * @param {Function} props.onPrint - 인쇄 콜백
 * @param {Function} props.onBack - 뒤로가기 콜백
 */
export default function EditToolbar({
  theme = 'beige',
  onThemeChange,
  fontSize = 1,
  onFontSizeChange,
  onSave,
  onPrint,
  onBack,
}) {
  // 테마 옵션
  const themes = [
    { id: 'beige', label: '베이지', color: '#F5F0E8' },
    { id: 'white', label: '화이트', color: '#FFFFFF' },
    { id: 'blue', label: '블루', color: '#EFF4FB' },
  ]

  return (
    <div className="preview-toolbar no-print">
      {/* 뒤로가기 */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-paper hover:text-gold transition-colors"
        title="편집기로 돌아가기"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">편집기</span>
      </button>

      {/* 구분선 */}
      <div className="w-px h-6 bg-gold opacity-30" />

      {/* 컬러 테마 선택 */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-paper opacity-70 hidden md:inline">테마</span>
        <div className="flex gap-1">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => onThemeChange?.(t.id)}
              title={t.label}
              className={`w-6 h-6 rounded-full border-2 transition-all ${
                theme === t.id ? 'border-gold scale-110' : 'border-transparent hover:border-paper'
              }`}
              style={{ backgroundColor: t.color }}
            />
          ))}
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-px h-6 bg-gold opacity-30" />

      {/* 폰트 크기 조절 */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-paper opacity-70 hidden md:inline">글자</span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onFontSizeChange?.(Math.max(0.8, fontSize - 0.1))}
            disabled={fontSize <= 0.8}
            className="w-7 h-7 flex items-center justify-center rounded text-paper text-sm font-bold hover:bg-paper hover:text-ink transition-colors disabled:opacity-30"
            title="글자 크기 줄이기"
          >
            A-
          </button>
          <span className="text-xs text-paper opacity-70 w-8 text-center">
            {Math.round(fontSize * 100)}%
          </span>
          <button
            onClick={() => onFontSizeChange?.(Math.min(1.2, fontSize + 0.1))}
            disabled={fontSize >= 1.2}
            className="w-7 h-7 flex items-center justify-center rounded text-paper text-sm font-bold hover:bg-paper hover:text-ink transition-colors disabled:opacity-30"
            title="글자 크기 키우기"
          >
            A+
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-px h-6 bg-gold opacity-30" />

      {/* 편집 안내 */}
      <span className="text-xs text-paper opacity-60 hidden lg:inline">
        텍스트를 클릭하여 직접 편집
      </span>

      {/* 오른쪽 버튼 그룹 */}
      <div className="flex items-center gap-2 ml-auto">
        {/* 저장 버튼 */}
        <button
          onClick={onSave}
          className="flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-colors"
          style={{ backgroundColor: '#C4A35A', color: '#2C1810' }}
          title="소식지 저장"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          <span className="hidden sm:inline">저장</span>
        </button>

        {/* 인쇄 버튼 */}
        <button
          onClick={onPrint}
          className="flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-colors"
          style={{ backgroundColor: '#F5F0E8', color: '#2C1810' }}
          title="인쇄 / PDF 저장"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span className="hidden sm:inline">인쇄</span>
        </button>
      </div>
    </div>
  )
}
