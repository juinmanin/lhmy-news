// 홈 페이지 - 소식지 기본 정보 입력 및 템플릿 선택
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNewsStore } from '../hooks/useNewsStore'

// 레이아웃 템플릿 옵션
const TEMPLATES = [
  {
    id: 'classic',
    name: '클래식',
    description: '전통적인 신문 스타일 · 베이지 배경 · 명조체',
    preview: (
      <div className="w-full h-32 rounded border-2 flex flex-col p-2 gap-1"
        style={{ backgroundColor: '#F5F0E8', borderColor: '#C4A35A' }}>
        <div className="h-4 rounded" style={{ backgroundColor: '#2C1810', width: '60%' }} />
        <div className="flex gap-1 flex-1">
          <div className="flex-1 rounded" style={{ backgroundColor: '#C4A35A', opacity: 0.4 }} />
          <div className="flex-1 rounded" style={{ backgroundColor: '#C4A35A', opacity: 0.4 }} />
        </div>
        <div className="flex gap-1">
          <div className="flex-1 h-3 rounded" style={{ backgroundColor: '#2C1810', opacity: 0.3 }} />
          <div className="flex-1 h-3 rounded" style={{ backgroundColor: '#2C1810', opacity: 0.3 }} />
        </div>
      </div>
    ),
  },
  {
    id: 'modern',
    name: '모던',
    description: '현대적인 잡지 스타일 · 화이트 배경 · 고딕체',
    preview: (
      <div className="w-full h-32 rounded border-2 flex flex-col p-2 gap-1"
        style={{ backgroundColor: '#FFFFFF', borderColor: '#4a6fa5' }}>
        <div className="h-4 rounded" style={{ backgroundColor: '#1a2744', width: '70%' }} />
        <div className="flex gap-1 flex-1">
          <div className="w-2/3 rounded" style={{ backgroundColor: '#dce8f5' }} />
          <div className="w-1/3 flex flex-col gap-1">
            <div className="flex-1 rounded" style={{ backgroundColor: '#4a6fa5', opacity: 0.3 }} />
            <div className="flex-1 rounded" style={{ backgroundColor: '#4a6fa5', opacity: 0.3 }} />
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex-1 h-3 rounded" style={{ backgroundColor: '#1a2744', opacity: 0.2 }} />
          <div className="flex-1 h-3 rounded" style={{ backgroundColor: '#1a2744', opacity: 0.2 }} />
        </div>
      </div>
    ),
  },
]

export default function Home() {
  const navigate = useNavigate()
  const { currentNews, updateMeta, newsList, loadFromList, deleteFromList, createNew } = useNewsStore()
  const [showHistory, setShowHistory] = useState(false)

  // 현재 년/월 기본값
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1

  const meta = currentNews?.meta || {}

  // 시작하기
  const handleStart = () => {
    if (!meta.name?.trim()) {
      alert('소식지 이름을 입력해주세요.')
      return
    }
    navigate('/editor')
  }

  // 저장된 소식지 불러오기
  const handleLoad = (id) => {
    loadFromList(id)
    navigate('/editor')
  }

  // 저장된 소식지 삭제
  const handleDelete = (id, e) => {
    e.stopPropagation()
    if (confirm('이 소식지를 삭제하시겠습니까?')) {
      deleteFromList(id)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F0E8' }}>
      {/* 상단 헤더 */}
      <header style={{ backgroundColor: '#2C1810' }} className="py-4 px-6">
        <h1
          className="text-2xl font-bold text-center"
          style={{ color: '#C4A35A', fontFamily: 'Noto Serif KR, serif' }}
        >
          🏠 라이트하우스 소식지
        </h1>
        <p className="text-center text-xs mt-1" style={{ color: '#9a7050' }}>
          월간 소식지를 쉽고 아름답게 만들어보세요
        </p>
      </header>

      <main className="max-w-2xl mx-auto py-8 px-4">
        {/* 소식지 기본 정보 입력 */}
        <div className="editor-section">
          <h2 className="editor-section-title">📰 소식지 기본 정보</h2>

          <div className="space-y-4">
            {/* 소식지 이름 */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#2C1810' }}>
                소식지 이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={meta.name || ''}
                onChange={(e) => updateMeta({ name: e.target.value })}
                placeholder="라이트하우스 소식지"
                className="input-field"
              />
            </div>

            {/* 호수, 연도, 월 */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#2C1810' }}>
                  호수
                </label>
                <input
                  type="number"
                  value={meta.issue || 1}
                  min={1}
                  onChange={(e) => updateMeta({ issue: parseInt(e.target.value) || 1 })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#2C1810' }}>
                  연도
                </label>
                <input
                  type="number"
                  value={meta.year || currentYear}
                  min={2020}
                  max={2099}
                  onChange={(e) => updateMeta({ year: parseInt(e.target.value) || currentYear })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#2C1810' }}>
                  월
                </label>
                <select
                  value={meta.month || currentMonth}
                  onChange={(e) => updateMeta({ month: parseInt(e.target.value) })}
                  className="input-field"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}월</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 부제목 */}
            <div>
              <label className="block text-sm font-medium mb-1" style={{ color: '#2C1810' }}>
                부제목
                <span className="text-xs ml-2 font-normal" style={{ color: '#7a6040' }}>
                  (선택)
                </span>
              </label>
              <input
                type="text"
                value={meta.subtitle || ''}
                onChange={(e) => updateMeta({ subtitle: e.target.value })}
                placeholder="모두가 함께하는 이야기"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* 템플릿 선택 */}
        <div className="editor-section">
          <h2 className="editor-section-title">🎨 레이아웃 템플릿</h2>

          <div className="grid grid-cols-2 gap-4">
            {TEMPLATES.map((template) => (
              <div
                key={template.id}
                onClick={() => updateMeta({ template: template.id })}
                className={`template-card cursor-pointer ${meta.template === template.id ? 'selected' : ''}`}
              >
                {template.preview}
                <div className="mt-2">
                  <p className="font-semibold text-sm" style={{ color: '#2C1810' }}>
                    {template.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#7a6040' }}>
                    {template.description}
                  </p>
                </div>
                {meta.template === template.id && (
                  <div className="mt-2 text-xs font-medium" style={{ color: '#C4A35A' }}>
                    ✓ 선택됨
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 시작 버튼 */}
        <div className="flex gap-3">
          <button
            onClick={handleStart}
            className="btn-primary flex-1 py-3 text-base"
          >
            ✍️ 소식지 작성 시작
          </button>

          <button
            onClick={() => {
              createNew()
              navigate('/editor')
            }}
            className="btn-secondary px-4 py-3"
            title="새 소식지 만들기"
          >
            새로 만들기
          </button>
        </div>

        {/* 저장된 소식지 목록 */}
        {newsList.length > 0 && (
          <div className="mt-6 editor-section">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="w-full flex items-center justify-between editor-section-title mb-0 pb-0 border-0"
              style={{ border: 'none', background: 'none', cursor: 'pointer' }}
            >
              <span>📂 저장된 소식지 ({newsList.length}개)</span>
              <span style={{ color: '#C4A35A' }}>{showHistory ? '▲' : '▼'}</span>
            </button>

            {showHistory && (
              <div className="mt-3 space-y-2">
                {newsList.map((news) => (
                  <div
                    key={news.id}
                    onClick={() => handleLoad(news.id)}
                    className="flex items-center justify-between p-3 rounded cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#EDE8DC', border: '1px solid #C4A35A' }}
                  >
                    <div>
                      <p className="font-medium text-sm" style={{ color: '#2C1810' }}>
                        {news.meta?.name} - {news.meta?.year}년 {news.meta?.month}월호
                      </p>
                      <p className="text-xs" style={{ color: '#7a6040' }}>
                        저장: {news.savedAt ? new Date(news.savedAt).toLocaleDateString('ko-KR') : '-'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#C4A35A', color: '#2C1810' }}>
                        불러오기
                      </span>
                      <button
                        onClick={(e) => handleDelete(news.id, e)}
                        className="text-xs text-red-500 hover:text-red-700 px-1"
                        title="삭제"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
