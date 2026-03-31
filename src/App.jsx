// 앱 라우팅 설정
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Editor from './pages/Editor.jsx'
import Preview from './pages/Preview.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 홈: 소식지 기본 정보 입력 + 템플릿 선택 */}
        <Route path="/" element={<Home />} />
        {/* 편집기: 콘텐츠 입력 및 AI 스타일 변환 */}
        <Route path="/editor" element={<Editor />} />
        {/* 미리보기: 최종 레이아웃 확인 및 인쇄 */}
        <Route path="/preview" element={<Preview />} />
        {/* 기타 경로는 홈으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
