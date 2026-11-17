/** 정적 빌드에 포함할 서비스 주소를 검증하고 로그인 경로를 만든다. */
export function loginUrl(value: string) {
  const url = new URL(value);

  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== '/'
  ) {
    throw new Error(
      'NEXT_PUBLIC_APP_URL에는 서비스 앱의 http 또는 https 원점만 지정하세요.'
    );
  }

  return new URL('/login', url).href;
}

/** 공개 URL만 빌드에 포함하며 인증 정보는 랜딩에서 취급하지 않는다. */
export const appLoginUrl = loginUrl(
  process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.pleasegraduate.me'
);
