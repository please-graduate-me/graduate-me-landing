import { appLoginUrl } from '@/lib/config/appUrl';
import { Link } from '@/components/ui/primitives/Link';
import { TopNav } from '@/components/ui/layouts/TopNav';
import { TopNavHeading } from '@/components/ui/layouts/TopNavHeading';
import { HStack } from '@/components/ui/layouts/HStack';
import { Text } from '@/components/ui/primitives/Text';
import type { ReactNode } from 'react';
import * as styles from './LandingShell.css';
import { ButtonLink } from '@/components/ui/primitives/ButtonLink';
import { BrandLogo } from './BrandLogo';

/** 공개 화면은 학습 앱과 같은 브랜드를 유지하면서 간결한 진입 탐색을 제공한다. */
export function LandingShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <TopNav
        label='서비스 소개'
        heading={
          <TopNavHeading
            heading='Please graduate me'
            headingHref='/'
            logo={<BrandLogo />}
          />
        }
        endContent={
          <ButtonLink
            href={appLoginUrl}
            variant='secondary'>
            로그인
          </ButtonLink>
        }
      />
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <HStack gap={4}>
          <Text weight='bold'>Please graduate me</Text>
          <Text color='secondary'>읽고, 듣고, 질문하며 나의 언어로.</Text>
          <Link href={appLoginUrl}>학습 시작하기</Link>
        </HStack>
      </footer>
    </div>
  );
}
