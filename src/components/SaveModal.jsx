// 저장 모달 컴포넌트 - 로컬 저장 및 Google Drive 저장 옵션
import React, { useState } from 'react'
import { saveToGoogleDrive, isGoogleDriveAvailable, signInGoogle } from '../services/googleDriveService'

/**
 * SaveModal 컴포넌트
 * @param {Object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {Function} props.onClose - 닫기 콜백
 * @param {Function} props.onLocalSave - 로컬 저장 콜백
 * @param {Object} props.newsData - 저장할 소식지 데이터
 */
export default function SaveModal({ isOpen, onClose, onLocalSave, newsData }) {
  const [isSavingDrive, setIsSavingDrive] = useState(false)
  const [driveStatus, setDriveStatus] = useState('')
  const driveAvailable = isGoogleDriveAvailable()

  if (!isOpen) return null

  // 로컬 저장
  const handleLocalSave = () => {
    onLocalSave?.()
    onClose?.()
  }

  // Google Drive 저장
  const handleDriveSave = async () => {
    setIsSavingDrive(true)
    setDriveStatus('')

    try {
      // Google 로그인
      const loggedIn = await signInGoogle()
      if (!loggedIn) {
        setDriveStatus('Google 로그인에 실패했습니다.')
        setIsSavingDrive(false)
        return
      }

      // Drive에 저장
      const result = await saveToGoogleDrive(newsData)

      if (result.success) {
        setDriveStatus('Google Drive에 저장되었습니다! ✓')
        setTimeout(onClose, 1500)
      } else {
        setDriveStatus(`저장 실패: ${result.error}`)
      }
    } catch (err) {
      console.error('Google Drive 저장 중 오류:', err)
      setDriveStatus(`저장 중 오류가 발생했습니다: ${err?.message || '알 수 없는 오류'}`)
    } finally {
      setIsSavingDrive(false)
    }
  }

  return (
    // 모달 오버레이
    <div
      className="fixed inset-0 flex items-center justify-center z-50 no-print"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div
        className="rounded-lg p-6 w-full max-w-md shadow-xl"
        style={{ backgroundColor: '#F5F0E8', border: '2px solid #C4A35A' }}
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg font-bold"
            style={{ fontFamily: 'Noto Serif KR, serif', color: '#2C1810' }}
          >
            소식지 저장
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* 소식지 정보 요약 */}
        {newsData?.meta && (
          <div
            className="rounded p-3 mb-4 text-sm"
            style={{ backgroundColor: '#EDE8DC', border: '1px solid #C4A35A' }}
          >
            <p style={{ color: '#2C1810' }}>
              <strong>{newsData.meta.name}</strong> &nbsp;
              {newsData.meta.year}년 {newsData.meta.month}월호 (제{newsData.meta.issue}호)
            </p>
          </div>
        )}

        {/* 저장 옵션 */}
        <div className="space-y-3">
          {/* 로컬 저장 */}
          <button
            onClick={handleLocalSave}
            className="w-full flex items-center gap-3 p-3 rounded text-left transition-colors hover:opacity-90"
            style={{ backgroundColor: '#2C1810', color: '#F5F0E8' }}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <div>
              <p className="font-semibold text-sm">기기에 저장</p>
              <p className="text-xs opacity-70">브라우저 로컬 저장소에 저장</p>
            </div>
          </button>

          {/* Google Drive 저장 */}
          <button
            onClick={handleDriveSave}
            disabled={!driveAvailable || isSavingDrive}
            className="w-full flex items-center gap-3 p-3 rounded text-left transition-colors disabled:opacity-50"
            style={{
              backgroundColor: driveAvailable ? '#4285F4' : '#9E9E9E',
              color: '#FFFFFF'
            }}
          >
            {isSavingDrive ? (
              <div className="spinner w-6 h-6 border-white border-t-transparent flex-shrink-0" />
            ) : (
              <svg className="w-6 h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.28 3L1 12l4.28 7.5h13.44L23 12 17.72 3H6.28zm1.14 2h9.16l4.28 7-4.28 7H7.42L3.14 12l4.28-7z"/>
              </svg>
            )}
            <div>
              <p className="font-semibold text-sm">
                {isSavingDrive ? '저장 중...' : 'Google Drive에 저장'}
              </p>
              <p className="text-xs opacity-80">
                {driveAvailable
                  ? 'Google 계정으로 로그인 후 저장'
                  : '.env에 API 키 설정 필요'}
              </p>
            </div>
          </button>

          {/* Drive 상태 메시지 */}
          {driveStatus && (
            <p
              className="text-sm text-center p-2 rounded"
              style={{
                color: driveStatus.includes('✓') ? '#2C1810' : '#c0392b',
                backgroundColor: driveStatus.includes('✓') ? '#d4edda' : '#f8d7da'
              }}
            >
              {driveStatus}
            </p>
          )}
        </div>

        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-2 text-sm rounded border transition-colors"
          style={{ borderColor: '#C4A35A', color: '#2C1810' }}
        >
          취소
        </button>
      </div>
    </div>
  )
}
