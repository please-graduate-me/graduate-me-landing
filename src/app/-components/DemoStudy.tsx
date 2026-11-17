'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/primitives/Button';
import { Card } from '@/components/ui/primitives/Card';
import { Text } from '@/components/ui/primitives/Text';
import { Select } from '@/components/ui/primitives/Select';
import { demoLesson } from '@/domains/demo/lib/lesson';
import type { Mode } from '@/domains/demo/model/contracts';
import { DemoGuide } from './DemoGuide';
import { DemoPlayer } from './DemoPlayer';
import { DemoAnswer } from './DemoAnswer';
import * as styles from './DemoStudy.css';

/** 영상 외 학습 데이터와 채점은 모두 브라우저 안에서 처리한다. */
export function DemoStudy() {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>('blank');
  const [loaded, setLoaded] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const segment = demoLesson.segments[index];

  return (
    <section
      className={styles.root}
      aria-label='로그인 없이 체험하기'>
      <DemoGuide />
      <div className={styles.workspace}>
        <Card className={styles.media}>
          {loaded ? (
            <DemoPlayer
              segment={segment}
              repeat={repeat}
            />
          ) : (
            <div className={styles.placeholder}>
              <Text as='p'>짧은 영어 영상을 듣고 받아써 보세요.</Text>
              <Button
                type='button'
                onClick={() => setLoaded(true)}>
                영상 불러오기
              </Button>
              <Text
                as='p'
                size='sm'
                color='secondary'>
                재생할 때 YouTube에 연결됩니다. 답안은 서버로 전송하지 않아요.
              </Text>
            </div>
          )}
          <Select
            label='구절 반복'
            value={repeat ? 'on' : 'off'}
            onChange={(event) => setRepeat(event.target.value === 'on')}>
            <option value='off'>반복 안 함</option>
            <option value='on'>1초 뒤 다시 듣기</option>
          </Select>
        </Card>
        <Card className={styles.exercise}>
          <div className={styles.toolbar}>
            <Button
              type='button'
              size='small'
              variant='secondary'
              disabled={index === 0}
              onClick={() => setIndex((value) => value - 1)}>
              이전 구절
            </Button>
            <Text role='status'>
              {index + 1} / {demoLesson.segments.length}
            </Text>
            <Button
              type='button'
              size='small'
              variant='secondary'
              disabled={index === demoLesson.segments.length - 1}
              onClick={() => setIndex((value) => value + 1)}>
              다음 구절
            </Button>
          </div>
          <Select
            label='받아쓰기 방식'
            value={mode}
            onChange={(event) => setMode(event.target.value as Mode)}>
            <option value='blank'>빈칸 받아쓰기</option>
            <option value='full'>전체 받아쓰기</option>
          </Select>
          {demoLesson.segments.flatMap((item) =>
            (['blank', 'full'] as const).map((answerMode) => (
              <div
                key={`${item.id}-${answerMode}`}
                hidden={item.id !== segment.id || answerMode !== mode}>
                <DemoAnswer
                  segment={item}
                  mode={answerMode}
                />
              </div>
            ))
          )}
          <Text
            as='p'
            size='sm'
            color='secondary'>
            체험 기록은 이 화면에서만 유지돼요. 대소문자와 문장부호까지 입력해
            주세요.
          </Text>
        </Card>
      </div>
    </section>
  );
}
