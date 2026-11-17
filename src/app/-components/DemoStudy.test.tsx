import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { DemoStudy } from './DemoStudy';
import { demoLesson } from '@/domains/demo/lib/lesson';
import { learningUnits, blankIndices } from '@/domains/demo/lib/grading';

let container: HTMLDivElement;
let root: Root;
let network: ReturnType<typeof vi.fn>;

function click(label: string) {
  const button = [
    ...container.querySelectorAll<HTMLButtonElement>('button'),
  ].find((item) => item.textContent === label && !item.closest('[hidden]'));

  expect(button).toBeDefined();
  act(() => button!.click());
}

function changeMode(value: 'blank' | 'full') {
  const select = container.querySelectorAll<HTMLSelectElement>('select')[1];

  act(() => {
    select.value = value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

function fill(input: HTMLInputElement | HTMLTextAreaElement, value: string) {
  act(() => {
    // React가 추적하는 현재 값과 사용자 입력 이벤트를 구분한다.
    const prototype =
      input instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;

    Object.getOwnPropertyDescriptor(prototype, 'value')!.set!.call(
      input,
      value
    );

    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);

  network = vi.fn(() => {
    throw new Error('체험에서 서버 요청이 발생했습니다.');
  });

  vi.stubGlobal('fetch', network);
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  act(() => root.render(<DemoStudy />));
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe('정적 체험 화면', () => {
  it('입력과 채점, 구절 이동, 모드 전환을 서버 호출 없이 처리한다', () => {
    expect(container.querySelector('iframe')).toBeNull();
    const segment = demoLesson.segments[0];
    const words = learningUnits(segment.text);

    const answers = blankIndices(segment.text, 20, segment.blankCandidates).map(
      (index) => words[index]
    );

    const inputs = [
      ...container.querySelectorAll<HTMLInputElement>('input'),
    ].filter((item) => !item.closest('[hidden]'));

    inputs.forEach((input, index) => fill(input, answers[index]));
    click('채점하기');
    expect(container.textContent).toContain('직접 맞혔어요!');
    changeMode('full');

    const textarea = [
      ...container.querySelectorAll<HTMLTextAreaElement>('textarea'),
    ].find((item) => !item.closest('[hidden]'))!;

    fill(textarea, segment.text);
    click('채점하기');
    expect(textarea.value).toBe(segment.text);
    changeMode('blank');
    expect(inputs[0].value).toBe(answers[0]);
    click('다음 구절');
    click('이전 구절');
    expect(inputs[0].value).toBe(answers[0]);
    expect(network).not.toHaveBeenCalled();
    expect(document.querySelector('script[src*="youtube.com"]')).toBeNull();
  });

  it('힌트와 정답을 본 시도는 직접 맞힌 기록과 구분한다', () => {
    changeMode('full');
    click('힌트');
    click('정답 보기');

    const textarea = [
      ...container.querySelectorAll<HTMLTextAreaElement>('textarea'),
    ].find((item) => !item.closest('[hidden]'))!;

    fill(textarea, demoLesson.segments[0].text);
    click('채점하기');
    expect(container.textContent).toContain('도움을 받아 완성했어요.');
    expect(container.textContent).not.toContain('직접 맞혔어요!');
    expect(network).not.toHaveBeenCalled();
  });
});
