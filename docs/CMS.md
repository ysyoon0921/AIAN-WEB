# AIAN CMS (Strapi + Next.js)

비개발자가 Strapi 관리자에서 웹사이트 콘텐츠를 수정하면 Next.js 페이지에 반영됩니다.

## 구조

| 폴더 | 역할 |
|------|------|
| `cms/` | Strapi 5 CMS — 콘텐츠 입력·관리 |
| `web/` | Next.js 16 — Strapi API 연동 프론트 |
| `index.html`, `about/` 등 | 기존 정적 사이트 (그대로 유지) |

## 빠른 시작 (Windows)

```bat
REM 터미널 1
start-cms.bat

REM 터미널 2 (최초 1회)
cd web
copy .env.local.example .env.local
npm install
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
| About Intro | Single | `/ko/about/intro` |
| About Location | Single | `/ko/about/location` |
| Timeline Item | Collection | 연혁 타임라인 |
| Site Settings | Single | 푸터·연락처 |

모든 타입은 **ko / en** 다국어 지원.

## 콘텐츠 수정 방법

1. Strapi Admin 로그인
2. Content Manager에서 해당 타입 선택
3. 수정 후 **Publish**
4. Next.js 페이지 새로고침 → 반영 확인

CEO 사진은 About CEO → **photo** 필드에서 Strapi 미디어로 업로드·교체 가능.

## 환경 변수

### cms/.env

```
STRAPI_PLUGIN_I18N_INIT_LOCALE_CODE=ko
WEB_URL=http://localhost:3000
```

### web/.env.local

```
STRAPI_URL=http://localhost:1337
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
