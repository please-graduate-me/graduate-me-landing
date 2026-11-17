# 랜딩 코드 배치 규칙

서비스 프론트의 `src/` 배치, 의존 방향, vanilla-extract와 UI 시스템을 따른다. 라우팅만 정적 내보내기가 필요한 Next.js App Router를 사용한다.

- `src/app/page.tsx`: 소개 화면 조립. `layout.tsx`: 메타데이터와 공통 틀, 전역 스타일.
- `src/app/-components/`: 소개 일러스트, 체험 화면과 플레이어 훅. 파일당 컴포넌트 하나.
- `src/domains/demo/config/lesson.json`: 준비된 체험 자료. `model/`: 계약, `lib/`: JSON 검증과 브라우저 채점·재생 계산.
- `src/components/ui/{primitives,composites,layouts}/`: 업무를 모르는 기본 제어와 배치 틀.
- `src/lib/styles/`: 테마 토큰과 CSS 계층. `lib/config/`: 공개 서비스 URL. `lib/youtube/`: 외부 플레이어 어댑터.

의존 방향은 `app` → `-components` → `domains` → `components/ui`, `lib`다. 하위는 상위를 참조하지 않는다. `app` 내부는 상대 경로, 하위 계층은 `@/`를 쓴다. 별도 저장소의 소스를 import하지 않는다.

공통 UI는 props로 외형을 선택하고 화면은 배치만 조절한다. 색·간격·글꼴은 토큰, 기본 UI 외형은 `layered()`의 `ui` 계층, 화면 스타일은 계층 밖에 둔다. 전역 초기화와 로컬 글꼴은 `app/globals.css.ts`에서 관리한다.

체험 답안은 구절과 모드별 화면 상태다. JSON만 사용하고 인증·계정·API·DB·AI에 연결하지 않는다. 직접 정답과 힌트·정답 보기 후 정답을 구분한다. 페이지를 새로 열면 기록은 초기화된다. 외부 영상은 사용자가 요청했을 때만 연결한다.

실제 서비스 기능은 서비스 앱에서 제공한다. 모든 서비스 진입 링크는 빌드 시 검증한 `NEXT_PUBLIC_APP_URL` 원점의 `/login`으로 이동한다. 세션 조회·로그인 상태 분기·서버 기능은 없다.

`pnpm dev`는 Docker Compose에서 환경변수를 주입하고 3002번 포트로 실행한다. `pnpm check`, 관련 테스트, 정적 빌드와 Compose 구성을 확인한다. Cloudflare Pages는 `out/`만 제공한다.
