import { describe, expect, it } from 'vitest';
import { loginUrl } from './appUrl';

describe('서비스 진입 주소', () => {
  it('운영과 로컬 원점의 로그인 주소를 만든다', () => {
    expect(loginUrl('https://app.pleasegraduate.me')).toBe(
      'https://app.pleasegraduate.me/login'
    );

    expect(loginUrl('http://localhost:3000/')).toBe(
      'http://localhost:3000/login'
    );
  });

  it.each([
    'javascript:alert(1)',
    'https://user:secret@example.com',
    'https://example.com/path',
    'https://example.com?key=value',
    'https://example.com#login',
    '/login',
    '',
  ])('잘못된 서비스 원점 %s는 빌드를 중단시킨다', (value) => {
    expect(() => loginUrl(value)).toThrow();
  });
});
