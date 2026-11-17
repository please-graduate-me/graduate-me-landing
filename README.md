# Please graduate me 랜딩

`pleasegraduate.me`에서 제공할 소개와 로그인 없는 체험을 위한 독립 저장소다. 서비스 앱은 `https://app.pleasegraduate.me/login`으로 연결한다. 원격 저장소 생성, DNS 변경과 Cloudflare 배포는 아직 수행하지 않았다.

Next.js 16, React, TypeScript, vanilla-extract를 사용한다. `output: 'export'`와 `images.unoptimized: true`로 서버 없이 `out/`을 생성한다. Next.js 전용 플러그인을 위해 개발·빌드는 webpack을 사용한다.

## 로컬 개발

Node.js 22.12 이상, pnpm 10.33.0, Docker Compose Watch를 지원하는 Docker가 필요하다.

```sh
cp .env.example .env
pnpm install --frozen-lockfile
pnpm dev
```

`http://localhost:3002`에서 확인한다. Compose가 `.env`의 `NEXT_PUBLIC_APP_URL`을 컨테이너에 주입한다. 로컬 서비스 앱으로 이동하려면 `.env`에 `NEXT_PUBLIC_APP_URL=http://localhost:3000`을 지정한다. 환경변수를 바꾸면 `pnpm dev`를 다시 실행한다. `dev:app`은 컨테이너 내부 실행 명령이다.

```sh
pnpm dev:logs
pnpm dev:down
```

다른 서비스나 백엔드 컨테이너를 실행할 필요는 없다.

## 검사와 정적 빌드

```sh
pnpm check
pnpm test
pnpm build
```

`pnpm check`는 Prettier 적용, ESLint, 타입 검사를 순서대로 실행한다. `pnpm check:ci`는 포맷을 변경하지 않는다. `pnpm build`로 `out/`이 생성된다. `next start`는 정적 export에 사용하지 않는다.

## 이후 Cloudflare Pages 설정

| 항목                  | 값                              |
| --------------------- | ------------------------------- |
| 프레임워크            | Next.js (Static HTML Export)    |
| 빌드 명령             | `pnpm build`                    |
| 출력 디렉터리         | `out`                           |
| Node.js               | `22`                            |
| `NEXT_PUBLIC_APP_URL` | `https://app.pleasegraduate.me` |
| 사용자 지정 도메인    | `pleasegraduate.me`             |

`NEXT_PUBLIC_APP_URL`은 공개되는 빌드 시점 변수다. 변경하려면 다시 빌드해야 한다. SMTP 키, 인증 비밀값, 백엔드 주소는 넣지 않는다. `http` 또는 `https` 원점만 허용한다. 브라우저 런타임의 환경변수 변경으로 이미 내보낸 HTML을 바꿀 수 없다.

Cloudflare Pages의 Next.js 정적 내보내기 안내: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

서비스 앱의 `app.pleasegraduate.me` 연결과 인증 허용 원점·쿠키 설정은 해당 서비스와 infra의 배포 작업에서 함께 반영한다. 이 저장소는 DNS나 운영 설정을 변경하지 않는다.

## 이전 소스와 체험

화면·UI·스타일은 `graduate-me-frontend`의 `3c2348f^`에서 필요한 파일만 복사했다. 로그인 상태 분기와 AuthButton은 제거했다. 저장소 간 import는 없다.

`src/domains/demo/config/lesson.json`에는 기존 공개 데모의 준비된 구절 10개를 저장했다. 자료 준비·채점·힌트·구절 이동은 API 없이 동작하며 새 AI 요청을 만들지 않는다. 영상 불러오기를 누른 뒤에만 YouTube iframe SDK와 영상에 연결한다. 영상 제공자의 임베드 허용·네트워크 상태에 따라 재생은 제한될 수 있다. 답안은 전송·영구 저장하지 않으며 새로고침하면 초기화된다.
