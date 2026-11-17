import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

/** 답안과 피드백을 입력 순서로 배치한다. */
export const root = style({ display: 'grid', gap: vars.space.md });

/** 문장 안에서 빈칸 입력을 이어서 표시한다. */
export const sentence = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sm,
  flexWrap: 'wrap',
  fontSize: vars.fontSize.body,
});

/** 짧은 빈칸 입력도 모바일 폭을 넘지 않게 한다. */
export const blank = style({ width: 120, maxWidth: '100%' });

/** 채점과 도움 조작은 줄바꿈을 허용한다. */
export const actions = style({
  display: 'flex',
  gap: vars.space.sm,
  flexWrap: 'wrap',
});

/** 채점 결과를 별도 영역으로 알린다. */
export const feedback = style({ display: 'grid', gap: vars.space.sm });

/** 문장 차이가 긴 경우에도 화면 안에서 줄바꿈한다. */
export const differences = style({
  display: 'flex',
  gap: vars.space.sm,
  flexWrap: 'wrap',
  overflowWrap: 'anywhere',
});

/** 일치한 부분은 보조색으로 구분한다. */
export const match = style({ color: vars.color.muted });

/** 차이는 색 외에 화살표와 문구로도 구분한다. */
export const mismatch = style({ fontWeight: 700 });
