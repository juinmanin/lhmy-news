// 레이아웃 자동 계산 유틸리티

/**
 * 콘텐츠 양에 따라 최적 칼럼 수 반환
 * @param {string} text - 본문 텍스트
 * @returns {number} 칼럼 수 (1~3)
 */
export function getOptimalColumnCount(text) {
  if (!text) return 1
  const length = text.length
  if (length < 200) return 1
  if (length < 500) return 2
  return 3
}

/**
 * 사진 개수에 따른 레이아웃 그리드 클래스 반환
 * @param {number} photoCount - 사진 개수
 * @returns {string} Tailwind grid 클래스
 */
export function getPhotoGridClass(photoCount) {
  switch (photoCount) {
    case 0: return ''
    case 1: return 'grid grid-cols-1'
    case 2: return 'grid grid-cols-2 gap-2'
    case 3: return 'grid grid-cols-3 gap-2'
    default: return 'grid grid-cols-2 gap-2'
  }
}

/**
 * 텍스트 길이에 따른 폰트 크기 자동 조정
 * @param {string} headline - 헤드라인 텍스트
 * @param {'main' | 'sub'} type - 헤드라인 종류
 * @returns {string} CSS 폰트 크기
 */
export function getHeadlineFontSize(headline, type = 'main') {
  if (!headline) return type === 'main' ? '1.8rem' : '1rem'

  const length = headline.length

  if (type === 'main') {
    if (length <= 10) return '2.2rem'
    if (length <= 20) return '1.8rem'
    if (length <= 30) return '1.5rem'
    return '1.3rem'
  } else {
    if (length <= 15) return '1.1rem'
    if (length <= 25) return '1rem'
    return '0.9rem'
  }
}

/**
 * 서브 기사 유효성 검사 (내용이 있는 항목만 필터링)
 * @param {Array} subArticles - 서브 기사 배열
 * @returns {Array} 내용이 있는 서브 기사 배열
 */
export function getValidSubArticles(subArticles) {
  if (!Array.isArray(subArticles)) return []
  return subArticles.filter(
    article => article && (article.title?.trim() || article.body?.trim())
  )
}

/**
 * 날짜를 한국어 형식으로 포맷
 * @param {number} year - 연도
 * @param {number} month - 월
 * @returns {string} 포맷된 날짜 문자열
 */
export function formatKoreanDate(year, month) {
  return `${year}년 ${month}월`
}

/**
 * 호수를 한국어 형식으로 포맷
 * @param {number} issue - 호수
 * @returns {string} 포맷된 호수
 */
export function formatIssue(issue) {
  return `제${issue}호`
}

/**
 * 이미지 파일을 base64로 변환
 * @param {File} file - 이미지 파일
 * @returns {Promise<string>} base64 데이터 URL
 */
export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = () => reject(new Error('파일 읽기 실패'))
    reader.readAsDataURL(file)
  })
}

/**
 * base64 이미지 크기 추정 (KB)
 * @param {string} dataUrl - base64 데이터 URL
 * @returns {number} 추정 크기 (KB)
 */
export function getBase64SizeKB(dataUrl) {
  if (!dataUrl) return 0
  const base64Length = dataUrl.split(',')[1]?.length || 0
  return Math.round((base64Length * 3) / 4 / 1024)
}

/**
 * 색상 테마별 CSS 클래스 반환
 * @param {'beige' | 'white' | 'blue'} theme - 테마 이름
 * @returns {string} CSS 클래스
 */
export function getThemeClass(theme) {
  const themes = {
    beige: '',
    white: 'theme-white',
    blue: 'theme-blue',
  }
  return themes[theme] || ''
}
