import { z } from 'zod';

/** 정적 체험 자료의 구절과 재생 범위를 검증한다. */
export const demoLessonSchema = z.object({
  youtubeId: z.string().regex(/^[a-zA-Z0-9_-]{11}$/),
  status: z.literal('ready'),
  segments: z
    .array(
      z
        .object({
          id: z.string(),
          start: z.number().nonnegative(),
          end: z.number().positive(),
          text: z.string().min(1).max(5000),
          translation: z.string().nullable().optional(),
          blankCandidates: z
            .array(z.number().int().nonnegative())
            .nullable()
            .optional(),
        })
        .refine((segment) => segment.end > segment.start)
    )
    .min(1),
});

/** 화면은 체험의 두 받아쓰기 모드만 관리한다. */
export type Mode = 'blank' | 'full';

/** 단어별 차이는 원문과 입력을 함께 표시한다. */
export type Difference = {
  kind: 'match' | 'missing' | 'extra' | 'replace';
  expected?: string;
  actual?: string;
};

/** 채점은 계정이나 서버 상태 없이 브라우저에서 완료한다. */
export type Grade = { correct: boolean; differences: Difference[] };

/** 복사한 플레이어에 필요한 재생 설정만 유지한다. */
export type LearningSettings = {
  autoReplay: boolean;
  replayDelay: number;
  replayCount: number | null;
  playbackRate: number;
};
