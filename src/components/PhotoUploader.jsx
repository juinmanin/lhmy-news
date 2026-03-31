// 사진 업로드 컴포넌트 - 드래그&드롭 및 클릭 업로드 지원
import React, { useRef, useState } from 'react'
import { fileToBase64, getBase64SizeKB } from '../utils/layoutHelper'

/**
 * PhotoUploader 컴포넌트
 * @param {Object} props
 * @param {Array} props.photos - 현재 사진 배열 [{ dataUrl, caption }]
 * @param {Function} props.onChange - 사진 변경 콜백
 * @param {number} props.maxPhotos - 최대 사진 개수 (기본: 2)
 * @param {boolean} props.single - 단일 사진 모드 (기본: false)
 */
export default function PhotoUploader({ photos = [], onChange, maxPhotos = 2, single = false }) {
  const fileInputRef = useRef(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState('')

  // 파일 처리
  const handleFiles = async (files) => {
    setError('')
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'))

    if (fileArray.length === 0) {
      setError('이미지 파일만 업로드 가능합니다.')
      return
    }

    const currentCount = single ? 0 : photos.length
    const remaining = maxPhotos - currentCount
    const filesToProcess = fileArray.slice(0, remaining)

    if (filesToProcess.length === 0) {
      setError(`최대 ${maxPhotos}장까지만 업로드 가능합니다.`)
      return
    }

    try {
      const newPhotos = await Promise.all(
        filesToProcess.map(async (file) => {
          const dataUrl = await fileToBase64(file)
          const sizeKB = getBase64SizeKB(dataUrl)

          // 10MB 이상 경고
          if (sizeKB > 10240) {
            console.warn(`큰 이미지 파일: ${file.name} (${sizeKB}KB)`)
          }

          return {
            dataUrl,
            caption: '',
            name: file.name,
          }
        })
      )

      if (single) {
        onChange(newPhotos[0])
      } else {
        onChange([...photos, ...newPhotos])
      }
    } catch {
      setError('파일 처리 중 오류가 발생했습니다.')
    }
  }

  // 드래그 이벤트
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => setIsDragOver(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  // 사진 삭제
  const removePhoto = (index) => {
    if (single) {
      onChange(null)
    } else {
      const updated = photos.filter((_, i) => i !== index)
      onChange(updated)
    }
  }

  // 캡션 변경
  const updateCaption = (index, caption) => {
    if (single) {
      onChange({ ...photos[0], caption })
    } else {
      const updated = photos.map((p, i) => i === index ? { ...p, caption } : p)
      onChange(updated)
    }
  }

  // 단일 모드 처리
  const photoList = single
    ? (photos ? [photos] : [])
    : photos

  return (
    <div>
      {/* 업로드 영역 */}
      {(single ? photoList.length === 0 : photoList.length < maxPhotos) && (
        <div
          className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
          aria-label="사진 업로드 영역"
        >
          <div className="flex flex-col items-center gap-2">
            {/* 업로드 아이콘 */}
            <svg className="w-10 h-10 text-gold opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium" style={{ color: '#7a6040' }}>
              사진을 드래그하거나 클릭하여 업로드
            </p>
            <p className="text-xs" style={{ color: '#9a8060' }}>
              PNG, JPG, WEBP · 최대 {maxPhotos}장
              {!single && photoList.length > 0 && ` (${photoList.length}/${maxPhotos})`}
            </p>
          </div>
        </div>
      )}

      {/* 오류 메시지 */}
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}

      {/* 업로드된 사진 목록 */}
      {photoList.length > 0 && (
        <div className={`mt-3 ${single ? '' : 'grid grid-cols-2 gap-3'}`}>
          {photoList.map((photo, index) => (
            photo && (
              <div key={index} className="relative group">
                {/* 사진 미리보기 */}
                <div className="relative border-2 rounded overflow-hidden" style={{ borderColor: '#C4A35A' }}>
                  <img
                    src={photo.dataUrl}
                    alt={`업로드된 사진 ${index + 1}`}
                    className="w-full object-cover"
                    style={{ height: '120px' }}
                  />
                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    title="사진 삭제"
                  >
                    ✕
                  </button>
                </div>

                {/* 캡션 입력 */}
                <input
                  type="text"
                  value={photo.caption || ''}
                  onChange={(e) => updateCaption(index, e.target.value)}
                  placeholder="사진 설명 (선택)"
                  className="input-field mt-1 text-xs"
                  style={{ padding: '4px 8px' }}
                />
              </div>
            )
          ))}
        </div>
      )}

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={!single}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        aria-hidden="true"
      />
    </div>
  )
}
