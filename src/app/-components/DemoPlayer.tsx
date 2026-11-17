'use client';
import { Button } from '@/components/ui/primitives/Button';
import { Text } from '@/components/ui/primitives/Text';
import { demoLesson } from '@/domains/demo/lib/lesson';
import { useYouTubePlayer } from './useYouTubePlayer';
import * as styles from './DemoPlayer.css';

/** 사용자가 영상을 요청했을 때만 외부 플레이어를 연결한다. */
export function DemoPlayer({
  segment,
  repeat,
}: {
  segment: { id: string; start: number; end: number };
  repeat: boolean;
}) {
  const { mount, ready, error, replay, toggle, playing, waiting, blocked } =
    useYouTubePlayer(demoLesson.youtubeId, segment, {
      autoReplay: repeat,
      replayDelay: 1,
      replayCount: null,
      playbackRate: 1,
    });

  return (
    <div className={styles.root}>
      <div
        ref={mount}
        className={styles.video}
      />
      <div className={styles.controls}>
        <Button
          type='button'
          disabled={!ready || !!error}
          onClick={replay}>
          이 구절 다시 듣기
        </Button>
        <Button
          type='button'
          variant='secondary'
          disabled={!ready || !!error}
          onClick={toggle}>
          {playing || waiting ? '일시정지' : '재생'}
        </Button>
      </div>
      {!ready && !error && (
        <Text
          as='p'
          role='status'>
          영상 불러오는 중
        </Text>
      )}
      {error && (
        <Text
          as='p'
          role='alert'>
          {error}
        </Text>
      )}
      {blocked && (
        <Text
          as='p'
          role='status'>
          영상의 재생 버튼을 눌러 주세요.
        </Text>
      )}
    </div>
  );
}
