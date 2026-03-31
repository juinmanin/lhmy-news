// 편집기 페이지 - 콘텐츠 입력 및 AI 스타일 변환
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNewsStore } from '../hooks/useNewsStore'
import ArticleEditor from '../components/ArticleEditor.jsx'
import { enhanceAllContent } from '../services/editorService'

export default function Editor() {
  const navigate = useNavigate()
  const { currentNews, updateMainArticle, updateSubArticle, updateMeta } = useNewsStore()
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [activeTab, setActiveTab] = useState('main') // 'main' | 'sub1' | 'sub2'

  const meta = currentNews?.meta || {}
  const mainArticle = currentNews?.mainArticle || {}
  const subArticles = currentNews?.subArticles || [{}, {}]

  // AI 편집자 모드 - 텍스트 자동 향상
  const handleEnhance = async () => {
    if (!mainArticle.body && !mainArticle.title) {
      alert('먼저 기사 내용을 입력해주세요.')
      return
    }

    setIsEnhancing(true)
    try {
      const enhanced = await enhanceAllContent(currentNews)

      // 향상된 내용 적용
      updateMainArticle(enhanced.mainArticle)
      enhanced.subArticles?.forEach((article, i) => {
        updateSubArticle(i, article)
      })

      alert('✓ 편집자 스타일로 변환되었습니다!')
    } catch (err) {
      alert('변환 중 오류가 발생했습니다: ' + err.message)
    } finally {
      setIsEnhancing(false)
    }
  }

  // 미리보기로 이동
  const handlePreview = () => {
    if (!mainArticle.title && !mainArticle.body) {
      if (!confirm('메인 기사 내용이 없습니다. 그래도 미리보기로 이동하시겠습니까?')) return
    }
    navigate('/preview')
  }

  // 탭 메뉴
  const tabs = [
    { id: 'main', label: '📰 메인 기사' },
    { id: 'sub1', label: '📄 서브 기사 1' },
    { id: 'sub2', label: '📄 서브 기사 2' },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F0E8' }}>
      {/* 상단 네비게이션 */}
      <nav className="app-nav no-print">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-sm hover:opacity-80 transition-opacity"
          style={{ color: '#C4A35A' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          처음으로
        </button>

        <div className="app-nav-title">
          {meta.name || '라이트하우스 소식지'} — {meta.year}년 {meta.month}월호
        </div>

        <div className="flex items-center gap-2">
          {/* 편집자 모드 변환 버튼 */}
          <button
            onClick={handleEnhance}
            disabled={isEnhancing}
            className="flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-colors disabled:opacity-50"
            style={{ backgroundColor: '#C4A35A', color: '#2C1810' }}
          >
            {isEnhancing ? (
              <>
                <div className="spinner w-4 h-4 border-2" style={{ borderColor: '#2C1810', borderTopColor: 'transparent' }} />
                변환 중...
              </>
            ) : (
              <>✨ 편집자 변환</>
            )}
          </button>
        </div>
      </nav>

      {/* 진행 단계 표시 */}
      <div className="no-print" style={{ backgroundColor: '#EDE8DC', borderBottom: '1px solid #C4A35A' }}>
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-4 text-xs">
          <span style={{ color: '#9a8060' }}>
            1 정보 입력
          </span>
          <span style={{ color: '#C4A35A' }}>→</span>
          <span className="font-semibold" style={{ color: '#2C1810' }}>
            2 내용 작성
          </span>
          <span style={{ color: '#C4A35A' }}>→</span>
          <span style={{ color: '#9a8060' }}>
            3 미리보기 및 출력
          </span>
        </div>
      </div>

      <div className="editor-container">
        {/* 탭 네비게이션 */}
        <div
          className="flex rounded-t-lg overflow-hidden mb-0 no-print"
          style={{ border: '1px solid #C4A35A', borderBottom: 'none' }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-3 text-sm font-medium transition-colors"
              style={{
                backgroundColor: activeTab === tab.id ? '#2C1810' : '#EDE8DC',
                color: activeTab === tab.id ? '#F5F0E8' : '#5a3c2c',
                borderBottom: activeTab === tab.id ? 'none' : '1px solid #C4A35A',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 탭 콘텐츠 */}
        <div
          className="editor-section rounded-tl-none"
          style={{ borderTopLeftRadius: 0 }}
        >
          {activeTab === 'main' && (
            <ArticleEditor
              type="main"
              article={mainArticle}
              onChange={(updated) => updateMainArticle(updated)}
            />
          )}

          {activeTab === 'sub1' && (
            <ArticleEditor
              type="sub"
              index={0}
              article={subArticles[0]}
              onChange={(updated) => updateSubArticle(0, updated)}
            />
          )}

          {activeTab === 'sub2' && (
            <ArticleEditor
              type="sub"
              index={1}
              article={subArticles[1]}
              onChange={(updated) => updateSubArticle(1, updated)}
            />
          )}
        </div>

        {/* 편집자 변환 안내 */}
        <div
          className="rounded p-4 mb-4 text-sm"
          style={{ backgroundColor: '#EDE8DC', border: '1px solid #C4A35A' }}
        >
          <p className="font-semibold mb-1" style={{ color: '#2C1810' }}>
            ✨ 편집자 변환이란?
          </p>
          <p style={{ color: '#5a3c2c' }}>
            작성한 내용을 신문/잡지 편집자 스타일로 자동 변환합니다.
            헤드라인을 더 간결하게, 본문을 더 읽기 쉽게 다듬어드립니다.
          </p>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            ← 이전
          </button>
          <button
            onClick={handlePreview}
            className="btn-primary"
          >
            미리보기 →
          </button>
        </div>
      </div>
    </div>
  )
}
