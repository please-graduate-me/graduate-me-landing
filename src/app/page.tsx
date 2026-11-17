import { appLoginUrl } from '@/lib/config/appUrl';
import { Section } from '@/components/ui/layouts/Section';
import { Heading } from '@/components/ui/primitives/Heading';
import { Text } from '@/components/ui/primitives/Text';
import * as styles from './page.css';
import { ButtonLink } from '@/components/ui/primitives/ButtonLink';
import { DemoStudy } from './-components/DemoStudy';
import { Badge } from '@/components/ui/primitives/Badge';
import { Icon } from '@/components/ui/primitives/Icon';
import { HeroDecor } from './-components/HeroDecor';
import { MethodStrip } from './-components/MethodStrip';
import { HowItWorksStep } from './-components/HowItWorksStep';
import { SourceIllustration } from './-components/SourceIllustration';
import { BlankIllustration } from './-components/BlankIllustration';
import { QuestionIllustration } from './-components/QuestionIllustration';

/** 준비된 체험과 서비스 앱 진입을 정적 소개 화면에 연결한다. */
export default function Home() {
  return (
    <>
      <Section
        className={styles.hero}
        aria-labelledby='home-title'>
        <HeroDecor />
        <div className={styles.intro}>
          <p className={styles.eyebrow}>
            영어 · 태국어 PDF와 영어 영상으로 시작해요
          </p>
          <Heading
            level={1}
            id='home-title'
            type='display-1'
            weight='bold'
            justify='center'
            className={styles.title}>
            읽고, 듣고, 질문하며
            <br />
            <span className={styles.titleAccent}>나의 언어로.</span>
          </Heading>
          <Text
            as='p'
            display='block'
            size='lg'
            color='secondary'
            justify='center'
            className={styles.subtitle}>
            내가 고른 PDF와 영상을 한 구절씩 풀어 보며 배워요. 모르는 부분은
            조교와 함께 해결해요.
          </Text>
          <div className={styles.accountActions}>
            <ButtonLink
              href={appLoginUrl}
              size='large'>
              학습 시작하기{' '}
              <Icon
                name='arrow-right'
                size={16}
              />
            </ButtonLink>
            <ButtonLink
              variant='secondary'
              size='large'
              href='#try-learning'>
              로그인 없이 체험하기
            </ButtonLink>
          </div>
        </div>
      </Section>
      <MethodStrip />
      <Section
        id='how-it-works'
        className={styles.steps}
        aria-label='학습 방법'>
        <Heading
          level={2}
          type='display-2'
          weight='bold'
          justify='center'>
          내 자료로, 내 속도로.
        </Heading>
        <HowItWorksStep
          number='01'
          title='나의 자료에서 시작해요'
          description='PDF를 올리거나 공개 YouTube 주소를 붙여 넣으면, 번역과 핵심 단어, 요약이 준비돼요.'
          illustration={<SourceIllustration />}
        />
        <HowItWorksStep
          number='02'
          title='한 구절씩, 내 속도로'
          description='읽기만 하지 않고 빈칸 채우기와 받아쓰기로 직접 풀어 봐요. 풀 때마다 XP가 쌓여요.'
          illustration={<BlankIllustration />}
          reversed
        />
        <HowItWorksStep
          number='03'
          title='질문하고 다시 기억해요'
          description='궁금한 구절을 골라 조교를 태그해 물어보고, 기억할 표현은 표현집에 모아 반복해서 복습해요.'
          illustration={<QuestionIllustration />}
        />
      </Section>
      <Section
        id='try-learning'
        className={styles.demo}
        aria-labelledby='demo-title'>
        <div className={styles.demoHeading}>
          <div className={styles.demoIntro}>
            <Badge tone='brand'>로그인 없이 체험하기</Badge>
            <Heading
              level={2}
              id='demo-title'
              type='display-3'
              weight='bold'>
              한 구절만 직접 들어볼까요?
            </Heading>
            <Text
              as='p'
              display='block'
              color='secondary'>
              들리는 만큼 쓰고, 안 들린 부분은 다시 들어 보세요.
            </Text>
          </div>
          <span className={styles.demoNote}>영어 영상 받아쓰기 체험</span>
        </div>
        <DemoStudy />
      </Section>
      <Section
        className={styles.account}
        aria-labelledby='closing-title'>
        <Heading
          level={2}
          id='closing-title'
          type='display-2'
          weight='bold'
          color='inherit'
          justify='center'>
          오늘 첫 구절을 풀어 볼까요?
        </Heading>
        <ButtonLink
          href={appLoginUrl}
          size='large'
          className={styles.closingAction}>
          학습 시작하기
        </ButtonLink>
      </Section>
    </>
  );
}
