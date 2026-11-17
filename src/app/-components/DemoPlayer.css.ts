import { style } from '@vanilla-extract/css';
import { vars } from '@/lib/styles/theme.css';

/** 플레이어 상태와 조작을 모은다. */
export const root = style({ display: 'grid', gap: vars.space.md });

/** 영상은 컨테이너 폭에 맞추되 비율을 유지한다. */
export const video = style({
  aspectRatio: '16 / 9',
  width: '100%',
  overflow: 'hidden',
  borderRadius: vars.radius.panel,
});

/** 작은 화면에서도 재생 조작이 잘리지 않게 한다. */
export const controls = style({
  display: 'flex',
  gap: vars.space.sm,
  flexWrap: 'wrap',
});
