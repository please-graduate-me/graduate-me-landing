import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

/** 체험과 소개 사이에 여백을 둔다. */
export const root = style({ marginTop: vars.space.lg });

/** 작은 화면에서는 영상과 답안을 차례로 배치한다. */
export const workspace = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
  gap: vars.space.lg,
  '@media': { '(max-width: 800px)': { gridTemplateColumns: 'minmax(0, 1fr)' } },
});

/** 영상과 반복 설정을 묶는다. */
export const media = style({
  padding: vars.space.lg,
  display: 'grid',
  gap: vars.space.md,
  alignContent: 'start',
  minWidth: 0,
});

/** 답안 조작을 한 패널에서 이어 간다. */
export const exercise = style({
  padding: vars.space.lg,
  display: 'grid',
  gap: vars.space.lg,
  minWidth: 0,
});

/** 이전과 다음 구절 사이에 현재 위치를 표시한다. */
export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space.sm,
  flexWrap: 'wrap',
});

/** 동의하기 전에는 외부 영상을 불러오지 않는다. */
export const placeholder = style({
  minHeight: 240,
  display: 'grid',
  alignContent: 'center',
  justifyItems: 'center',
  gap: vars.space.lg,
  textAlign: 'center',
});
