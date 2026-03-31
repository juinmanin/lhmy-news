// Google Drive API 연동 서비스
// 현재는 인터페이스만 구현 - 실제 API 키 설정 후 활성화

// 환경변수에서 클라이언트 ID 및 API 키 읽기
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || ''

// Google Drive API 스코프
const SCOPES = 'https://www.googleapis.com/auth/drive.file'
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'

// API 초기화 여부
let isInitialized = false
let tokenClient = null

/**
 * Google API 클라이언트 초기화
 * @returns {Promise<boolean>} 초기화 성공 여부
 */
export async function initGoogleDriveApi() {
  if (!CLIENT_ID || !API_KEY) {
    console.warn('Google Drive API 키가 설정되지 않았습니다. .env 파일을 확인하세요.')
    return false
  }

  try {
    // gapi 스크립트 동적 로드
    await loadGapiScript()
    await new Promise((resolve) => window.gapi.load('client', resolve))
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    })

    // Google Identity Services 토큰 클라이언트 초기화
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: () => {},
    })

    isInitialized = true
    return true
  } catch (error) {
    console.error('Google Drive API 초기화 실패:', error)
    return false
  }
}

/**
 * Google 로그인 및 인증
 * @returns {Promise<boolean>} 로그인 성공 여부
 */
export async function signInGoogle() {
  if (!isInitialized) {
    const init = await initGoogleDriveApi()
    if (!init) return false
  }

  return new Promise((resolve) => {
    tokenClient.callback = (response) => {
      if (response.error) {
        resolve(false)
        return
      }
      resolve(true)
    }
    tokenClient.requestAccessToken({ prompt: 'consent' })
  })
}

/**
 * Google Drive에 소식지 데이터 저장
 * @param {Object} newsData - 저장할 소식지 데이터
 * @returns {Promise<{success: boolean, fileId?: string, error?: string}>}
 */
export async function saveToGoogleDrive(newsData) {
  if (!isInitialized) {
    return { success: false, error: 'API가 초기화되지 않았습니다.' }
  }

  try {
    const fileName = `소식지_${newsData.meta?.name || '라이트하우스'}_${newsData.meta?.year || ''}년_${newsData.meta?.month || ''}월.json`
    const content = JSON.stringify(newsData, null, 2)

    // 파일 메타데이터
    const metadata = {
      name: fileName,
      mimeType: 'application/json',
      parents: ['root'],
    }

    // Multipart 업로드
    const boundary = '-------314159265358979323846'
    const delimiter = `\r\n--${boundary}\r\n`
    const closeDelim = `\r\n--${boundary}--`

    const multipartBody =
      delimiter +
      'Content-Type: application/json\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      'Content-Type: application/json\r\n\r\n' +
      content +
      closeDelim

    const response = await window.gapi.client.request({
      path: '/upload/drive/v3/files',
      method: 'POST',
      params: { uploadType: 'multipart' },
      headers: { 'Content-Type': `multipart/related; boundary="${boundary}"` },
      body: multipartBody,
    })

    return { success: true, fileId: response.result.id }
  } catch (error) {
    console.error('Google Drive 저장 실패:', error)
    return { success: false, error: error.message || '저장 중 오류가 발생했습니다.' }
  }
}

/**
 * Google Drive에서 소식지 데이터 불러오기
 * @param {string} fileId - 파일 ID
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export async function loadFromGoogleDrive(fileId) {
  if (!isInitialized) {
    return { success: false, error: 'API가 초기화되지 않았습니다.' }
  }

  try {
    const response = await window.gapi.client.drive.files.get({
      fileId,
      alt: 'media',
    })

    const data = typeof response.result === 'string'
      ? JSON.parse(response.result)
      : response.result

    return { success: true, data }
  } catch (error) {
    console.error('Google Drive 불러오기 실패:', error)
    return { success: false, error: error.message || '불러오기 중 오류가 발생했습니다.' }
  }
}

/**
 * Google Drive에 저장된 소식지 파일 목록 가져오기
 * @returns {Promise<{success: boolean, files?: Array, error?: string}>}
 */
export async function listGoogleDriveFiles() {
  if (!isInitialized) {
    return { success: false, error: 'API가 초기화되지 않았습니다.' }
  }

  try {
    const response = await window.gapi.client.drive.files.list({
      q: "mimeType='application/json' and name contains '소식지'",
      fields: 'files(id, name, createdTime, modifiedTime)',
      orderBy: 'modifiedTime desc',
    })

    return { success: true, files: response.result.files || [] }
  } catch (error) {
    console.error('Google Drive 파일 목록 조회 실패:', error)
    return { success: false, error: error.message || '목록 조회 중 오류가 발생했습니다.' }
  }
}

/**
 * GAPI 스크립트 동적 로드 헬퍼
 */
function loadGapiScript() {
  return new Promise((resolve, reject) => {
    if (window.gapi) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://apis.google.com/js/api.js'
    script.onload = resolve
    script.onerror = () => reject(new Error('GAPI 스크립트 로드 실패'))
    document.head.appendChild(script)
  })
}

/**
 * API 연동 가능 여부 확인
 * @returns {boolean}
 */
export function isGoogleDriveAvailable() {
  return !!(CLIENT_ID && API_KEY)
}
