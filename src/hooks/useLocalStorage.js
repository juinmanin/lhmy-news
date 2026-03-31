// localStorage를 React state처럼 사용하는 커스텀 훅
import { useState, useEffect } from 'react'

export function useLocalStorage(key, initialValue) {
  // 초기값: localStorage에서 읽거나 기본값 사용
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`useLocalStorage 읽기 오류 (key: ${key}):`, error)
      return initialValue
    }
  })

  // 값 변경 시 localStorage 업데이트
  const setValue = (value) => {
    try {
      // 함수형 업데이트 지원
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.warn(`useLocalStorage 쓰기 오류 (key: ${key}):`, error)
    }
  }

  // 값 삭제 함수
  const removeValue = () => {
    try {
      setStoredValue(initialValue)
      window.localStorage.removeItem(key)
    } catch (error) {
      console.warn(`useLocalStorage 삭제 오류 (key: ${key}):`, error)
    }
  }

  return [storedValue, setValue, removeValue]
}
