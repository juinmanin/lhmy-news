# 🏠 라이트하우스 소식지 (lhmy-news)

매달 "라이트하우스 소식지"를 신문/잡지 스타일로 제작할 수 있는 웹앱입니다.
사진과 간단한 글을 입력하면 잡지 편집자 관점으로 레이아웃을 자동 구성하고, 수정 후 PDF/인쇄 형태로 출력할 수 있습니다.

---

## 📋 주요 기능

- **4단계 워크플로우**: 정보 입력 → 내용 작성 → 미리보기 → 출력
- **신문 스타일 레이아웃**: A4 비율 기반 클래식/모던 템플릿
- **사진 업로드**: 드래그&드롭 지원, 최대 2장 (base64 변환)
- **편집자 변환**: 텍스트를 신문/잡지 스타일로 자동 향상
- **인라인 편집**: 미리보기 화면에서 텍스트 직접 수정
- **컬러 테마**: 베이지(기본), 화이트, 블루
- **저장/출력**: 로컬 저장(localStorage) + Google Drive 연동 준비 + PDF 인쇄

---

## 🛠️ 기술 스택

- **Frontend**: React 18 + Vite
- **스타일링**: Tailwind CSS + 커스텀 CSS
- **라우팅**: React Router v6
- **저장**: localStorage
- **출력**: window.print() + CSS print media query

---

## 🚀 설치 및 실행

### 요구 사항

- Node.js 18 이상
- npm 9 이상

### 설치

```bash
git clone https://github.com/juinmanin/lhmy-news.git
cd lhmy-news
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 http://localhost:5173 접속

### 프로덕션 빌드

```bash
npm run build
npm run preview
```

---

## 🔑 Google Drive 연동 설정

Google Drive 저장 기능은 선택 사항입니다. API 키 없이도 앱이 정상 동작합니다.

### 설정 방법

1. `.env.example` 파일을 복사하여 `.env` 파일 생성:

```bash
cp .env.example .env
```

2. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성

3. **Google Drive API** 활성화

4. **OAuth 2.0 클라이언트 ID** 및 **API 키** 발급

5. `.env` 파일에 키 입력:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_GOOGLE_API_KEY=your_google_api_key_here
```

6. 개발 서버 재시작

---

## 📖 사용 방법

### 1단계: 소식지 기본 정보 입력 (`/`)

- 소식지 이름, 호수, 연도, 월, 부제목 입력
- 레이아웃 템플릿 선택 (클래식 또는 모던)
- **소식지 작성 시작** 버튼 클릭

### 2단계: 내용 작성 (`/editor`)

- **메인 기사** 탭: 제목, 리드 문단, 본문 작성 + 사진 2장 업로드
- **서브 기사 1/2** 탭: 각 서브 기사 제목, 내용, 사진(선택) 입력
- **✨ 편집자 변환** 버튼: 작성한 내용을 신문 스타일로 자동 향상
- **미리보기** 버튼으로 다음 단계 이동

### 3단계: 미리보기 및 편집 (`/preview`)

- 실제 소식지 레이아웃 확인 (A4 비율)
- 텍스트 클릭 → 직접 인라인 편집 가능
- 상단 도구 모음에서 컬러 테마 변경
- 글자 크기 조절 (80% ~ 120%)
- **저장하기**: 로컬 또는 Google Drive에 저장
- **인쇄/PDF 저장**: 브라우저 인쇄 다이얼로그 → PDF로 저장

---

## 📁 파일 구조

```
lhmy-news/
├── index.html                    # HTML 진입점
├── package.json                  # 의존성 관리
├── vite.config.js                # Vite 설정
├── tailwind.config.js            # Tailwind CSS 설정
├── postcss.config.cjs            # PostCSS 설정
├── .env.example                  # 환경변수 예시
├── src/
│   ├── main.jsx                  # React DOM 진입점
│   ├── App.jsx                   # 라우팅 설정
│   ├── index.css                 # 전역 스타일 (신문 레이아웃 포함)
│   ├── pages/
│   │   ├── Home.jsx              # 홈: 정보 입력 + 템플릿 선택
│   │   ├── Editor.jsx            # 편집기: 콘텐츠 입력
│   │   └── Preview.jsx           # 미리보기: 레이아웃 확인 + 인쇄
│   ├── components/
│   │   ├── NewsTemplate.jsx      # 소식지 레이아웃 컴포넌트
│   │   ├── ArticleEditor.jsx     # 기사 편집 폼
│   │   ├── PhotoUploader.jsx     # 사진 업로드 (드래그&드롭)
│   │   ├── EditToolbar.jsx       # 미리보기 편집 도구 모음
│   │   └── SaveModal.jsx         # 저장 모달
│   ├── hooks/
│   │   ├── useNewsStore.js       # 소식지 데이터 상태 관리
│   │   └── useLocalStorage.js    # localStorage 훅
│   ├── services/
│   │   ├── editorService.js      # 텍스트 향상 서비스
│   │   └── googleDriveService.js # Google Drive API 서비스
│   └── utils/
│       ├── printHelper.js        # 인쇄/PDF 유틸리티
│       └── layoutHelper.js       # 레이아웃 계산 유틸리티
└── README.md
```

---

## 🤝 기여 방법

1. 저장소 Fork
2. 기능 브랜치 생성: `git checkout -b feature/새기능`
3. 변경사항 커밋: `git commit -m "feat: 새 기능 추가"`
4. 브랜치 Push: `git push origin feature/새기능`
5. Pull Request 생성

---

## 📄 라이선스

MIT License

