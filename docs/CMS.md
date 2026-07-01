# AIAN CMS (Strapi + Next.js)

비개발자가 Strapi 관리자에서 웹사이트 콘텐츠를 수정하면 Next.js 페이지에 반영됩니다.

## 구조

| 폴더 | 역할 |
|------|------|
| `cms/` | Strapi 5 CMS — 콘텐츠 입력·관리 |
| `web/` | Next.js 16 — Strapi API 연동 프론트 |
| `index.html`, `about/` 등 | 기존 정적 사이트 (그대로 유지) |

## Next.js = official site (in progress)

The Next.js app at `web/` is being aligned with the original `index.html` design:

- Full nav (Solutions · Industry · Customers · About)
- Full footer, contact form, reveal animations
- Hero video when `web/public/assets/hero-bg.mp4` is present
- About pages match original sidebar layout
- Solutions/Industry/Customers subpages served from `web/public/` (static HTML, links work)

**Still static (not Strapi yet):** solutions, industry, customers subpages.

Run: `start-cms.bat` + `start-web.bat` → http://localhost:3000/ko

### 0. Node.js 설치 (필수)

CMS는 **Node.js 20+** 가 필요합니다. 설치되어 있지 않으면:

1. https://nodejs.org/ → **LTS** 다운로드·설치
2. 설치 시 **Add to PATH** 체크
3. **CMD 창을 닫고 새로 연** 다음 확인:

```bat
node -v
npm -v
```

환경 확인:

```bat
check-cms-env.bat
setup-cms-env.bat
```

`cms/.env`는 Git에 포함되지 않습니다. 처음 clone/pull 후 **`setup-cms-env.bat`** 한 번 실행하거나, **`start-cms.bat`** 이 자동으로 생성합니다.

### 1. 실행

```bat
REM 터미널 1
start-cms.bat

REM 터미널 2 (최초 1회 npm install는 bat 안에서 자동)
start-web.bat
```

- Strapi Admin: http://localhost:1337/admin
- Next.js 사이트: http://localhost:3000/ko

## 콘텐츠 타입

| 타입 | 종류 | 페이지 |
|------|------|--------|
| Home Page | Single | 메인 `/ko` |
| Product | Collection | 메인 Products 섹션 |
| Case Study | Collection | 메인 Showcase 탭 |
| About CEO | Single | `/ko/about/ceo` |
| About History | Single | `/ko/about/history` |
| About Intro | Single | `/ko/about/intro` 상단 제목·설명 |
| Intro Card | Collection | `/ko/about/intro` 카드 4개 |
| About Location | Single | `/ko/about/location` |
| Timeline Item | Collection | 연혁 타임라인 |
| Site Settings | Single | 푸터·연락처 |

모든 타입은 **ko / en** 다국어 지원.

## 콘텐츠 수정 방법

1. Strapi Admin 로그인
2. Content Manager에서 해당 타입 선택
3. **오른쪽 위 Locale**을 `Korean (ko)` 또는 `English (en)`으로 맞춘 뒤 수정
4. **Save** 클릭 (Draft/Publish 없이 바로 반영)
5. Next.js 페이지 **강력 새로고침** (`Ctrl+Shift+R`) → http://localhost:3000/ko 또는 `/en`

### Publish 후 원래대로 돌아갈 때

| 원인 | 해결 |
|------|------|
| **Locale이 다름** | 수정한 언어와 보는 URL이 같아야 함 (`ko` ↔ `/ko`, `en` ↔ `/en`) |
| **웹 캐시** | `stop-web.bat` → `start-web.bat` 후 `Ctrl+Shift+R` |
| **Strapi 재시작 필요** | 스키마 변경 후 Strapi CMD에서 `Ctrl+C` → `start-cms.bat` 다시 실행 |
| **Save 안 함** | Publish 대신 **Save**만 누르면 됨 (Draft/Publish 비활성화됨) |

CEO 사진은 About CEO → **photo** 필드에서 Strapi 미디어로 업로드·교체 가능.

### About Intro 카드 수정 (Case Study와 동일 방식)

1. **About Intro** — 페이지 상단 `label`, `title`, `lead`
2. **Intro Card** — 카드 4개 (Collection, Case Study처럼 항목별로 열기)
   - Content Manager → **Intro Card** → 항목 선택
   - `title`, `body` 수정 → **Save**
   - Locale: **Korean (ko)** / **English (en)**
3. http://localhost:3000/ko/about/intro 새로고침

카드가 꼬였을 때: Strapi 종료 → `reset-about-intro.bat` → `start-cms.bat`

## 환경 변수

### cms/.env

```
STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE=ko
WEB_URL=http://localhost:3000
```

### web/.env.local

```
STRAPI_URL=http://127.0.0.1:1337
```

## Docker 배포

```bash
docker compose up --build
```

- CMS: http://localhost:1337
- Web: http://localhost:3000

프로덕션에서는 `APP_KEYS`, `ADMIN_JWT_SECRET` 등 시크릿을 반드시 교체하세요.

## Vercel + Strapi 서버

1. Strapi를 VPS/Railway/Render 등에 배포 (`cms/Dockerfile` 참고)
2. Vercel에 `web/` 프로젝트 연결
3. Vercel 환경변수: `STRAPI_URL=https://your-strapi.example.com`
4. Strapi CORS: `cms/config/middlewares.ts`에 Vercel 도메인 추가

## Bootstrap 시드

최초 실행 시 `cms/src/seed/bootstrap.ts`가 자동으로:

- ko/en 로케일 설정
- Public API 읽기 권한
- 기존 HTML 콘텐츠 시드 (CEO, 연혁, 메인, Products, Case Studies 등)
- CEO 사진 시드 (`cms/seed/ceo-photo.png`)

## 기존 정적 사이트

`serve.bat`로 기존 HTML 사이트는 계속 사용 가능합니다. CMS 버전은 `start-cms.bat` + `start-web.bat`로 별도 실행하세요.

## 문제 해결

### 브라우저에 `fetch failed` / `/ko`가 비어 있음

1. **Strapi가 완전히 떴는지 확인** — CMS 창에 `Strapi started successfully` 가 보일 때까지 기다린 뒤 새로고침
2. **API 직접 확인** — 브라우저에서 http://127.0.0.1:1337/api/home-page?locale=ko 열어 JSON이 보이면 CMS 정상
3. **`web/.env.local`** — `STRAPI_URL=http://127.0.0.1:1337` 권장 (Windows에서 `localhost`는 IPv6 문제로 실패할 수 있음). 코드가 `localhost`를 자동으로 `127.0.0.1`로 바꿉니다.
4. **스키마 변경 후** — `reset-about-intro.bat` → `start-cms.bat` → `start-web.bat` 순서로 재시작
5. **진단** — `check-cms-env.bat` 실행 (포트 + API 응답 확인)
