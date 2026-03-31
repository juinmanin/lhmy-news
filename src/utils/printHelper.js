// 인쇄 및 PDF 저장 유틸리티

/**
 * 소식지 인쇄 (PDF 저장 포함)
 * 브라우저 인쇄 다이얼로그를 열어 PDF로 저장 가능
 */
export function printNewsletter() {
  // 인쇄 전 처리
  document.title = '라이트하우스 소식지'

  // 인쇄 실행
  window.print()
}

/**
 * 인쇄 전 페이지 타이틀 설정
 * @param {string} name - 소식지 이름
 * @param {number} year - 연도
 * @param {number} month - 월
 */
export function setPrintTitle(name, year, month) {
  document.title = `${name}_${year}년_${month}월호`
}

/**
 * 인쇄 후 타이틀 원복
 */
export function resetTitle() {
  document.title = '라이트하우스 소식지'
}

/**
 * 특정 요소만 인쇄하는 함수
 * @param {string} elementId - 인쇄할 요소의 ID
 * @param {string} title - 인쇄 창 제목
 */
export function printElement(elementId, title = '라이트하우스 소식지') {
  const element = document.getElementById(elementId)
  if (!element) {
    console.warn(`요소를 찾을 수 없습니다: ${elementId}`)
    return
  }

  // 인쇄 전용 팝업 창 생성
  const printWindow = window.open('', '_blank', 'width=800,height=1000')
  if (!printWindow) {
    alert('팝업이 차단되었습니다. 팝업 허용 후 다시 시도해주세요.')
    return
  }

  // 현재 페이지의 스타일시트 가져오기
  const styles = Array.from(document.styleSheets)
    .map(sheet => {
      try {
        return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n')
      } catch {
        return `@import url('${sheet.href}');`
      }
    })
    .join('\n')

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>${styles}</style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `)

  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
  printWindow.close()
}

/**
 * 인쇄 가능 여부 확인
 * @returns {boolean}
 */
export function canPrint() {
  return typeof window !== 'undefined' && typeof window.print === 'function'
}
