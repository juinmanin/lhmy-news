// 소식지 데이터 전역 상태 관리 훅
import { useLocalStorage } from './useLocalStorage'

// 소식지 기본 데이터 구조
const DEFAULT_NEWS_DATA = {
  // 소식지 메타 정보
  meta: {
    name: '라이트하우스 소식지',
    issue: 1,
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    subtitle: '모두가 함께하는 이야기',
    template: 'classic', // 'classic' | 'modern'
    theme: 'beige',      // 'beige' | 'white' | 'blue'
  },
  // 메인 기사
  mainArticle: {
    title: '',
    lead: '',
    body: '',
    photos: [], // [{ dataUrl, caption }]
  },
  // 서브 기사 (최대 2개)
  subArticles: [
    { title: '', body: '', photo: null },
    { title: '', body: '', photo: null },
  ],
  // 저장 일시
  savedAt: null,
}

// 소식지 목록 관리
const DEFAULT_NEWS_LIST = []

export function useNewsStore() {
  // 현재 편집 중인 소식지 데이터
  const [currentNews, setCurrentNews, clearCurrentNews] = useLocalStorage(
    'lhmy_current_news',
    DEFAULT_NEWS_DATA
  )

  // 저장된 소식지 목록
  const [newsList, setNewsList] = useLocalStorage(
    'lhmy_news_list',
    DEFAULT_NEWS_LIST
  )

  // 메타 정보 업데이트
  const updateMeta = (updates) => {
    setCurrentNews(prev => ({
      ...prev,
      meta: { ...prev.meta, ...updates }
    }))
  }

  // 메인 기사 업데이트
  const updateMainArticle = (updates) => {
    setCurrentNews(prev => ({
      ...prev,
      mainArticle: { ...prev.mainArticle, ...updates }
    }))
  }

  // 서브 기사 업데이트 (인덱스 기반)
  const updateSubArticle = (index, updates) => {
    setCurrentNews(prev => {
      const newSubArticles = [...prev.subArticles]
      newSubArticles[index] = { ...newSubArticles[index], ...updates }
      return { ...prev, subArticles: newSubArticles }
    })
  }

  // 현재 소식지를 목록에 저장
  const saveToList = () => {
    const saved = {
      ...currentNews,
      savedAt: new Date().toISOString(),
      id: Date.now(),
    }
    setNewsList(prev => {
      // 같은 ID가 있으면 업데이트, 없으면 추가
      const exists = prev.findIndex(n => n.id === saved.id)
      if (exists >= 0) {
        const updated = [...prev]
        updated[exists] = saved
        return updated
      }
      return [saved, ...prev]
    })
    return saved
  }

  // 목록에서 소식지 불러오기
  const loadFromList = (id) => {
    const found = newsList.find(n => n.id === id)
    if (found) {
      setCurrentNews(found)
    }
    return found
  }

  // 목록에서 소식지 삭제
  const deleteFromList = (id) => {
    setNewsList(prev => prev.filter(n => n.id !== id))
  }

  // 새 소식지 초기화
  const createNew = () => {
    clearCurrentNews()
  }

  return {
    currentNews,
    newsList,
    updateMeta,
    updateMainArticle,
    updateSubArticle,
    saveToList,
    loadFromList,
    deleteFromList,
    createNew,
    setCurrentNews,
  }
}
