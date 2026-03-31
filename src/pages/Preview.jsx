// 미리보기 페이지 - 최종 레이아웃 확인, 인라인 편집, 인쇄
import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNewsStore } from '../hooks/useNewsStore'
import NewsTemplate from '../components/NewsTemplate.jsx'
import EditToolbar from '../components/EditToolbar.jsx'
import SaveModal from '../components/SaveModal.jsx'
import { printNewsletter, setPrintTitle } from '../utils/printHelper'

export default function Preview() {
  const navigate = useNavigate()
  const { currentNews, saveToList, setCurrentNews } = useNewsStore()
  const [theme, setTheme] = useState(currentNews?.meta?.theme || 'beige')
  const [fontSize, setFontSize] = useState(1)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveToast, setSaveToast] = useState('')

  // contentEditable 인라인 편집 업데이트 핸들러
  const handleInlineUpdate = useCallback((path, value) => {
    setCurrentNews(prev => {
      const updated = { ...prev }
      const keys = path.split('.')

      // 중첩 객체 업데이트 (최대 3단계)
      if (keys.length === 2) {
        updated[keys[0]] = { ...updated[keys[0]], [keys[1]]: value }
      } else if (keys.length === 3) {
        const arr = [...(updated[keys[0]] || [])]
        const idx = parseInt(keys[1])
        if (!isNaN(idx)) {
          arr[idx] = { ...arr[idx], [keys[2]]: value }
        }
        updated[keys[0]] = arr
      } else if (keys.length === 4) {
        // mainArticle.photos.0.caption
        const arr = [...(updated[keys[0]][keys[1]] || [])]
        const idx = parseInt(keys[2])
        if (!isNaN(idx)) {
          arr[idx] = { ...arr[idx], [keys[3]]: value }
        }
        updated[keys[0]] = { ...updated[keys[0]], [keys[1]]: arr }
      }

      return updated
    })
  }, [setCurrentNews])

  // 테마 변경
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme)
    setCurrentNews(prev => ({
      ...prev,
      meta: { ...prev.meta, theme: newTheme }
    }))
  }

  // 로컬 저장
  const handleLocalSave = () => {
    saveToList()
    setSaveToast('✓ 로컬에 저장되었습니다!')
    setTimeout(() => setSaveToast(''), 3000)
  }

  // 인쇄
  const handlePrint = () => {
    const { meta } = currentNews
    setPrintTitle(meta?.name || '소식지', meta?.year, meta?.month)
    printNewsletter()
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#D4CCBC' }}>
      {/* 편집 도구 모음 */}
      <EditToolbar
        theme={theme}
        onThemeChange={handleThemeChange}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        onSave={() => setShowSaveModal(true)}
        onPrint={handlePrint}
        onBack={() => navigate('/editor')}
      />

      {/* 도구 모음 높이만큼 패딩 */}
      <div style={{ paddingTop: '52px' }}>
        {/* 진행 단계 표시 */}
        <div className="no-print" style={{ backgroundColor: '#EDE8DC', borderBottom: '1px solid #C4A35A' }}>
          <div className="max-w-3xl mx-auto px-4 py-2 flex items-center gap-4 text-xs">
            <span style={{ color: '#9a8060' }}>1 정보 입력</span>
            <span style={{ color: '#C4A35A' }}>→</span>
            <span style={{ color: '#9a8060' }}>2 내용 작성</span>
            <span style={{ color: '#C4A35A' }}>→</span>
            <span className="font-semibold" style={{ color: '#2C1810' }}>
              3 미리보기 및 출력
            </span>
          </div>
        </div>

        {/* 편집 안내 (인쇄 시 숨김) */}
        <div
          className="no-print text-center py-2 text-xs"
          style={{ color: '#7a6040' }}
        >
          💡 소식지의 텍스트를 직접 클릭하여 편집할 수 있습니다
        </div>

        {/* 소식지 미리보기 영역 */}
        <div className="py-6 px-4">
          <NewsTemplate
            newsData={currentNews}
            editable={true}
            fontSize={fontSize}
            onUpdate={handleInlineUpdate}
          />
        </div>

        {/* 하단 액션 버튼 (인쇄 시 숨김) */}
        <div
          className="no-print max-w-3xl mx-auto px-4 pb-8 flex flex-wrap gap-3 justify-center"
        >
          <button
            onClick={() => navigate('/editor')}
            className="btn-secondary"
          >
            ← 편집기로 돌아가기
          </button>

          <button
            onClick={() => setShowSaveModal(true)}
            className="btn-gold"
          >
            💾 저장하기
          </button>

          <button
            onClick={handlePrint}
            className="btn-primary"
          >
            🖨️ 인쇄 / PDF 저장
          </button>
        </div>

        {/* 인쇄 안내 (인쇄 시 숨김) */}
        <div
          className="no-print max-w-3xl mx-auto px-4 pb-8 text-center text-xs"
          style={{ color: '#7a6040' }}
        >
          <p>인쇄 버튼 클릭 후 → 대상: PDF로 저장 → 저장 클릭으로 PDF 파일을 만들 수 있습니다.</p>
        </div>
      </div>

      {/* 저장 모달 */}
      <SaveModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onLocalSave={handleLocalSave}
        newsData={currentNews}
      />

      {/* 저장 완료 토스트 */}
      {saveToast && (
        <div className="toast">
          {saveToast}
        </div>
      )}
    </div>
  )
}
