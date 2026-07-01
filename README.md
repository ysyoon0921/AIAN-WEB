# AIAN Website

> **정본(canonical) = `web/`** — Next.js 정적 생성(SSG) 사이트. 서버·DB·CMS 없음.

## 구조

| 폴더 | 상태 | 설명 |
|------|------|------|
| **`web/`** | ✅ **사용 중 (정본)** | Next.js + TailwindCSS + MDX. 콘텐츠는 저장소 안에. Vercel 정적 배포. |
| `cms/` | ⚠️ 은퇴(deprecated) | 예전 Strapi CMS. 더 이상 배포/사용 안 함. 참고용 보존. |
| 루트 `index.html`, `about/`, `assets/` 등 | ⚠️ 은퇴(deprecated) | 최초 정적 HTML 프로토타입. `web/`로 대체됨. |

## 로컬 실행 (`web/`)

```bash
cd web
npm install
npm run dev      # http://localhost:3000  (개발 서버)
npm run build    # 정적 생성 (모든 페이지 프리렌더)
```

## 콘텐츠 수정 방법 (코드만, DB 없음)

- **페이지 문구·제품·사례**: `web/src/content/data.ts` (한/영) 수정 → 저장 → push
- **소식(News)**: `web/src/content/news/{ko,en}/` 에 `YYYY-MM-DD-slug.mdx` 파일 추가/삭제
  - 프론트매터 `title` / `date` / `summary` + 본문(Markdown). 목록·상세·정렬 자동.
- 수정 → `git push` → Vercel 자동 빌드·배포.

## 배포 (Vercel)

이 저장소는 Next 앱이 **`web/` 하위 폴더**에 있으므로, Vercel 프로젝트에서:

1. GitHub 저장소를 Vercel에 Import
2. **Root Directory = `web`** 로 설정 (중요)
3. Framework: Next.js (자동 감지), Build: `next build` (기본값)
4. Deploy → 이후 `main`(또는 연결 브랜치)에 push할 때마다 자동 배포

서버·데이터베이스·환경변수 불필요.
