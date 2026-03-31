// 텍스트 편집 서비스 - 규칙 기반 텍스트 향상
// 추후 OpenAI API로 교체 가능하도록 인터페이스 설계

/**
 * 텍스트를 잡지/신문 스타일로 향상시키는 함수
 * @param {string} rawText - 원본 텍스트
 * @param {'headline' | 'body' | 'caption'} type - 텍스트 종류
 * @returns {Promise<string>} 향상된 텍스트
 */
export async function enhanceText(rawText, type) {
  if (!rawText || rawText.trim().length === 0) return rawText

  // 실제 AI API 연동 시 이 부분을 교체
  // const response = await fetch('https://api.openai.com/v1/chat/completions', { ... })

  switch (type) {
    case 'headline':
      return enhanceHeadline(rawText)
    case 'body':
      return enhanceBody(rawText)
    case 'caption':
      return enhanceCaption(rawText)
    default:
      return rawText
  }
}

/**
 * 헤드라인 향상 - 강렬하고 간결하게
 */
function enhanceHeadline(text) {
  let result = text.trim()

  // 불필요한 조사 제거 (헤드라인 스타일)
  result = result
    .replace(/\s+입니다\s*$/, '')
    .replace(/\s+했습니다\s*$/, '')
    .replace(/\s+합니다\s*$/, '')

  // 첫 글자 대문자화 (영어 포함 시)
  result = result.charAt(0).toUpperCase() + result.slice(1)

  // 특수 기호 추가 (헤드라인 느낌)
  if (!result.endsWith('!') && !result.endsWith('?') && !result.endsWith('…')) {
    if (result.length < 20) {
      // 짧은 헤드라인에는 느낌표 없이
    }
  }

  return result
}

/**
 * 본문 향상 - 신문 기사 스타일로 변환
 */
function enhanceBody(text) {
  let result = text.trim()

  // 문단 분리
  const paragraphs = result.split(/\n\n+/)

  const enhancedParagraphs = paragraphs.map((para, index) => {
    let p = para.trim()

    // 첫 문단은 리드 문단 스타일 (약간 강조)
    if (index === 0) {
      // 문장 부호 정규화
      p = normalizePunctuation(p)
      return p
    }

    p = normalizePunctuation(p)
    return p
  })

  // 문단 간격 추가
  result = enhancedParagraphs.join('\n\n')

  // 중복 공백 제거
  result = result.replace(/  +/g, ' ')

  return result
}

/**
 * 사진 캡션 향상 - 간결하고 서술적으로
 */
function enhanceCaption(text) {
  let result = text.trim()

  // 캡션은 간결하게 (50자 이내 권장)
  result = normalizePunctuation(result)

  // 마침표로 끝나지 않으면 추가
  if (result && !result.match(/[.!?。]$/)) {
    result += '.'
  }

  return result
}

/**
 * 문장 부호 정규화
 */
function normalizePunctuation(text) {
  return text
    .replace(/,\s*/g, ', ')     // 쉼표 뒤 공백 정규화
    .replace(/\.\s*/g, '. ')    // 마침표 뒤 공백 정규화
    .replace(/  +/g, ' ')       // 중복 공백 제거
    .trim()
}

/**
 * 전체 소식지 내용을 일괄 향상
 * @param {Object} newsData - 소식지 데이터 객체
 * @returns {Promise<Object>} 향상된 소식지 데이터
 */
export async function enhanceAllContent(newsData) {
  const enhanced = { ...newsData }

  // 메인 기사 향상
  if (newsData.mainArticle) {
    enhanced.mainArticle = {
      ...newsData.mainArticle,
      title: await enhanceText(newsData.mainArticle.title, 'headline'),
      lead: await enhanceText(newsData.mainArticle.lead, 'body'),
      body: await enhanceText(newsData.mainArticle.body, 'body'),
    }

    // 사진 캡션 향상
    if (newsData.mainArticle.photos) {
      enhanced.mainArticle.photos = await Promise.all(
        newsData.mainArticle.photos.map(async (photo) => ({
          ...photo,
          caption: await enhanceText(photo.caption || '', 'caption'),
        }))
      )
    }
  }

  // 서브 기사 향상
  if (newsData.subArticles) {
    enhanced.subArticles = await Promise.all(
      newsData.subArticles.map(async (article) => ({
        ...article,
        title: await enhanceText(article.title, 'headline'),
        body: await enhanceText(article.body, 'body'),
      }))
    )
  }

  return enhanced
}
