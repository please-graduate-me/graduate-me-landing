'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/primitives/Button';
import { Input } from '@/components/ui/primitives/Input';
import { TextArea } from '@/components/ui/primitives/TextArea';
import { Text } from '@/components/ui/primitives/Text';
import {
  blankIndices,
  gradeAnswer,
  learningUnits,
} from '@/domains/demo/lib/grading';
import type { Grade, Mode } from '@/domains/demo/model/contracts';
import * as styles from './DemoAnswer.css';

type Segment = {
  text: string;
  translation?: string | null;
  blankCandidates?: number[] | null;
};

/** 모드와 구절마다 답안과 도움 사용 여부를 독립적으로 보관한다. */
export function DemoAnswer({
  segment,
  mode,
}: {
  segment: Segment;
  mode: Mode;
}) {
  const [full, setFull] = useState('');
  const [blanks, setBlanks] = useState<string[]>([]);
  const [result, setResult] = useState<Grade | null>(null);
  const [hinted, setHinted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const words = learningUnits(segment.text);
  const indices = blankIndices(segment.text, 20, segment.blankCandidates);
  const assisted = hinted || revealed;

  return (
    <form
      className={styles.root}
      onSubmit={(event) => {
        event.preventDefault();

        setResult(
          gradeAnswer(
            segment.text,
            mode,
            mode === 'full' ? full : blanks,
            20,
            segment.blankCandidates
          )
        );
      }}>
      {mode === 'full' ? (
        <TextArea
          label='들은 문장'
          value={full}
          rows={4}
          maxLength={5000}
          spellCheck={false}
          autoComplete='off'
          onChange={(event) => {
            setFull(event.target.value);
            setResult(null);
          }}
        />
      ) : (
        <div className={styles.sentence}>
          {words.map((word, index) => {
            const position = indices.indexOf(index);

            return position < 0 ? (
              <span key={index}>{word}</span>
            ) : (
              <Input
                key={index}
                aria-label={`빈칸 ${position + 1}`}
                value={blanks[position] ?? ''}
                maxLength={300}
                spellCheck={false}
                autoComplete='off'
                className={styles.blank}
                onChange={(event) => {
                  setBlanks((values) =>
                    indices.map((_, item) =>
                      item === position
                        ? event.target.value
                        : (values[item] ?? '')
                    )
                  );

                  setResult(null);
                }}
              />
            );
          })}
        </div>
      )}
      <div className={styles.actions}>
        <Button>채점하기</Button>
        <Button
          type='button'
          variant='secondary'
          onClick={() => setHinted(true)}>
          힌트
        </Button>
        <Button
          type='button'
          variant='ghost'
          onClick={() => setRevealed(true)}>
          정답 보기
        </Button>
      </div>
      {hinted && (
        <Text as='p'>
          첫 글자 힌트:{' '}
          {mode === 'full'
            ? words.map((word) => word[0]).join(' · ')
            : indices.map((index) => words[index][0]).join(' · ')}
        </Text>
      )}
      {revealed && <Text as='p'>원문: {segment.text}</Text>}
      {result && (
        <div
          aria-live='polite'
          role='status'
          className={styles.feedback}>
          <Text
            as='p'
            weight='bold'>
            {result.correct
              ? assisted
                ? '도움을 받아 완성했어요.'
                : '직접 맞혔어요!'
              : '원문과 다른 부분을 확인해 보세요.'}
          </Text>
          <div className={styles.differences}>
            {result.differences.map((difference, index) => (
              <span
                key={index}
                className={
                  difference.kind === 'match' ? styles.match : styles.mismatch
                }>
                {difference.kind === 'match'
                  ? difference.actual
                  : `${difference.actual || '빈 답안'} → ${difference.expected || '삭제'}`}
              </span>
            ))}
          </div>
          {segment.translation && <Text as='p'>{segment.translation}</Text>}
        </div>
      )}
    </form>
  );
}
