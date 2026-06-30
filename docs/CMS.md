# AIAN CMS (Strapi + Next.js) — POC

비개발자가 Strapi 관리자에서 About 콘텐츠(CEO, 연혁)를 수정하면 Next.js 페이지에 반영되는 POC입니다.

## 구조

| 폴더 | 역할 |
|------|------|
| `cms/` | Strapi 5 CMS (콘텐츠 입력·관리) |
| `web/` | Next.js 16 프론트 (Strapi API 연동) |
| `about/`, `index.html` 등 | 기존 정적 사이트 (그대로 유지) |

## 사전 요구

- Node.js 20+
- npm

## 1. Strapi 실행

```bash
cd cms
npm install
npm run develop
```

- 관리자: http://localhost:1337/admin (최초 1회 관리자 계정 생성)
- API: http://localhost:1337/api

최초 실행 시 `cms/src/index.ts` bootstrap이 다음을 자동 설정합니다.

- ko/en 로케일
- Public API 읽기 권한
- CEO·연혁·타임라인·사이트 설정 시드 데이터

## 2. Next.js 실행

```bash
cd web
cp .env.local.example .env.local   # STRAPI_URL=http://localhost:1337
npm install
npm run dev
```

- http://localhost:3000/ko/about/ceo
- http://localhost:3000/ko/about/history

## 3. 콘텐츠 수정 테스트

1. Strapi Admin → **About CEO** 또는 **About History** 편집
2. 저장·Publish
3. Next.js 페이지 새로고침 → 변경 반영 확인

## 콘텐츠 타입 (POC)

| 타입 | 종류 | 용도 |
|------|------|------|
| About CEO | Single | CEO 페이지 |
| About History | Single | 연혁 페이지 헤더 |
| Timeline Item | Collection | 연혁 타임라인 |
| Site Settings | Single | 로고·푸터 등 (다음 단계) |

## 다음 단계

- `home-page`, `product`, `case-study` 타입 추가
- 메인 페이지 Next.js 마이그레이션
- Strapi 미디어(CEO 사진) 업로드 연동
- 배포: Strapi(서버) + Next.js(Vercel 등)

## Windows 참고

기존 정적 사이트는 `serve.bat`로 계속 사용 가능합니다. CMS POC는 별도 터미널에서 `cms`와 `web`을 각각 실행하세요.
