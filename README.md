# 김선미의 그림책 질문놀이 — 홈페이지

정적 HTML/CSS/JS로 제작된 반응형 홈페이지입니다. 빌드 과정이 없는 순수 정적
사이트이며, GitHub에 올린 뒤 Vercel로 바로 배포하도록 구성되어 있습니다.

- 공식 도메인: **kimsunmipicturebook.com**
- URL 구조: `/about`, `/parent-education`처럼 `.html` 확장자가 없는 clean URL
  (Vercel의 `cleanUrls` 설정으로 `about.html` 파일이 `/about` 경로로 서빙됩니다)

## Vercel 배포 방법

1. 이 폴더 전체를 GitHub 저장소에 푸시합니다.
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin <저장소 URL>
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com)에서 "Add New Project" → 위 GitHub 저장소를 선택합니다.
3. Framework Preset은 **Other**를 선택합니다 (빌드 명령 없음, Output Directory는 루트).
   `package.json`이 없는 순수 정적 파일 구조이므로 Vercel이 자동으로 그대로 서빙합니다.
4. 배포 후 Vercel 프로젝트의 **Settings → Domains**에서 `kimsunmipicturebook.com`
   (필요 시 `www.kimsunmipicturebook.com`도)을 추가하고, 도메인 등록기관에서
   안내된 DNS 레코드(A/CNAME)를 설정합니다.
5. `vercel.json`에 이미 `cleanUrls: true`, `trailingSlash: false`가 설정되어 있어
   `about.html` 요청은 `/about`으로 301 리다이렉트되고, `/about`은 `about.html`을
   서빙합니다. 별도 설정이 필요 없습니다.

## 로컬 미리보기

빌드 과정이 필요 없는 순수 정적 사이트입니다. `serve.ps1`은 Vercel의 clean URL
동작(`/about` → `about.html`)을 로컬에서도 동일하게 재현하는 간단한 PowerShell
정적 서버입니다 (배포에는 필요하지 않으며, 로컬 확인용입니다).

```powershell
powershell -ExecutionPolicy Bypass -File serve.ps1
```
그 다음 브라우저에서 `http://localhost:8791` 접속.

## 구조

```
index.html                      HOME              → /
about.html                      ABOUT 김선미        → /about
picture-book-question-play.html 그림책 질문놀이      → /picture-book-question-play
parent-education.html           부모교육            → /parent-education
teacher-education.html          교사교육            → /teacher-education
case-studies.html               현장사례 (연령 필터)  → /case-studies
publications.html               저서·연구           → /publications
testimonials.html               강의후기 (기관/대상 필터) → /testimonials
contact.html                    강의문의 (문의 폼)    → /contact
faq.html                        자주 묻는 질문 (FAQPage 구조화 데이터) → /faq
professional-courses.html       전문과정 허브 (한국그림책학교/마들렌) → /professional-courses
course-toddler-reading-instructor.html   영유아 그림책 읽기 지도사 과정 → /course-toddler-reading-instructor
course-senior-reading-instructor.html    시니어 그림책 읽기 지도사 과정 → /course-senior-reading-instructor
course-emotional-curator-2.html          그림책 감성큐레이터 2급       → /course-emotional-curator-2
course-emotional-curator-1.html          그림책 감성큐레이터 1급       → /course-emotional-curator-1
course-emotional-play-instructor.html    그림책 감성놀이지도사         → /course-emotional-play-instructor
                                 (5개 과정 페이지 모두 Course 구조화 데이터 포함)
404.html                        404 페이지 (Vercel이 자동 인식)
sitemap.xml / robots.txt        검색엔진 색인용 (kimsunmipicturebook.com 기준)
vercel.json                     clean URL / 캐시 헤더 설정
assets/css/styles.css           디자인 시스템 (색상·타이포·컴포넌트)
assets/js/main.js               모바일 메뉴, 필터, 문의 폼 mailto 전송
assets/img/                     실제 반영된 사진·책 표지 이미지
assets/docs/                    연구·칼럼 PDF 등 다운로드 자료
```

## 배포 전 확인 사항 (모두 실제 정보로 반영 완료)

아래 항목은 모두 실제 정보로 채워져 있습니다. 임의로 지어낸 내용은 없습니다.
연락처가 바뀌는 경우에만 아래 위치를 참고해 수정하세요.

### 1. 연락처 (반영 완료)
- 전화 010-9043-2964 — 모든 페이지 푸터와 `contact.html` 전화 문의 카드에 `tel:` 링크로 반영.
- 이메일 hoho7744@gmail.com — 모든 페이지 푸터, `contact.html` 이메일 문의 카드,
  `<form id="lecture-inquiry-form" data-contact-email="hoho7744@gmail.com">`에 반영되어
  [문의 보내기] 버튼이 실제 메일 작성 화면으로 연결됩니다.

### 2. 네이버 블로그 링크
현재 실제 블로그 주소(`https://blog.naver.com/6865100`)가 모든 페이지에 연결되어 있습니다.
홈(index.html)과 현장사례(case-studies.html)의 "0~2세 영아 사례 보기" / "3~5세 유아 사례 보기"
버튼은 연령별 카테고리가 아직 나뉘어 있지 않아 블로그 메인으로 연결됩니다. 블로그에
연령별 카테고리를 만들면 해당 버튼의 `href`만 그 카테고리 URL로 바꿔주면 됩니다.

### 3. 인스타그램 (반영 완료)
`https://www.instagram.com/havruta_aha_ssam/`로 모든 페이지 푸터와
Person JSON-LD `sameAs`에 실제 반영되었습니다.

### 4. 이미지 (반영 완료)
- HOME 히어로, ABOUT 프로필 사진: `assets/img/kim-seonmi-hero.png`
- 부모교육·교사교육 현장 사진, 저서 표지, 현장사례·강의후기 사진: 모두 실제 사진으로 반영
  완료되었으며, 큰 원본 사진은 장변 1600px / JPEG 품질 84로 리사이즈·압축해 페이지 용량을
  줄였습니다 (원본은 이 세션의 백업 폴더에만 보관되어 있으므로, 더 높은 해상도가 필요하면
  원본 사진을 다시 보내주세요).

### 5. 현장사례 / 강의후기 실제 데이터 (반영 완료)
`case-studies.html`·HOME의 대표 현장사례 3개 카드, `testimonials.html`의 강의후기 카드는
모두 실제 사진·그림책명·인스타그램 릴스 링크로 채워져 있습니다. 새 사례나 후기가 생기면
같은 형식(`.case-card` / `.review-card`)으로 카드를 추가하면 됩니다.

### 6. 저서 표지 이미지 및 서점 링크 (반영 완료)
`publications.html`에 실제 책 표지, 공동저자, 출판사, YES24/큐리어스 서점 링크가
반영되어 있습니다.

## SEO/GEO 참고사항

- 모든 페이지에 고유한 title/description/canonical(`kimsunmipicturebook.com` 기준)/OG가 설정되어 있습니다.
- 홈페이지·ABOUT 페이지에 김선미 Person JSON-LD, 저서·연구 페이지에 Book JSON-LD,
  FAQ 페이지에 FAQPage JSON-LD가 포함되어 있습니다.
- 모든 핵심 텍스트(소개, 강의 내용, FAQ 답변 등)는 이미지가 아닌 순수 HTML 텍스트로
  작성되어 있어 JavaScript 실행 없이도 검색엔진과 생성형 AI가 그대로 읽을 수 있습니다.
- 배포 후 Google Search Console / 네이버 서치어드바이저에
  `https://kimsunmipicturebook.com/sitemap.xml`을 제출하세요.
