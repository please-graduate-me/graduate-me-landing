import { describe, expect, it } from 'vitest';
import { demoLesson } from './lesson';
import { blankIndices, gradeAnswer, learningUnits } from './grading';

describe('배포에 포함하는 체험 자료', () => {
  it('10개 구절의 식별자와 재생 순서가 유효하다', () => {
    expect(demoLesson.segments).toHaveLength(10);

    expect(new Set(demoLesson.segments.map((segment) => segment.id)).size).toBe(
      10
    );

    for (const [index, segment] of demoLesson.segments.entries()) {
      expect(segment.end).toBeGreaterThan(segment.start);
      if (index > 0)
        expect(segment.start).toBeGreaterThanOrEqual(
          demoLesson.segments[index - 1].end
        );
    }
  });

  it('모든 구절에서 빈칸이 출제되고 두 모드 모두 채점할 수 있다', () => {
    for (const segment of demoLesson.segments) {
      const indices = blankIndices(segment.text, 20, segment.blankCandidates);
      const words = learningUnits(segment.text);

      expect(indices.length).toBeGreaterThan(0);

      expect(
        gradeAnswer(
          segment.text,
          'blank',
          indices.map((index) => words[index]),
          20,
          segment.blankCandidates
        ).correct
      ).toBe(true);

      expect(gradeAnswer(segment.text, 'full', segment.text).correct).toBe(
        true
      );
    }
  });
});
