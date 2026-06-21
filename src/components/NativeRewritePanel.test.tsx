import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NativeRewritePanel } from './NativeRewritePanel';
import type { PracticeTurnFeedback } from '../domain/types';

// 라운드1 HIGH 수정 회귀 테스트: 하드코딩 substring 분기 없이 학습자 실제 입력과 AI 실제 교정만 렌더링하는지 검증한다.
function makeFeedback(overrides: Partial<PracticeTurnFeedback> = {}): PracticeTurnFeedback {
  return {
    coachReply: 'coach reply',
    nativeRewrite: 'native rewrite',
    koreanExplanation: '설명',
    keyUsageNote: 'usage note',
    reviewCandidates: [],
    ...overrides,
  };
}

describe('NativeRewritePanel', () => {
  it('renders the learner draft verbatim even when it contains the word "change"', () => {
    // Pre-fix renderOriginal() returned the hardcoded
    // "I want to change my appointment time." for any input containing "change".
    const original = 'I need to change my flight to Boston.';
    render(
      <NativeRewritePanel
        feedback={makeFeedback()}
        originalSentence={original}
        onSave={() => {}}
      />,
    );

    expect(screen.getByText(original)).toBeInTheDocument();
    expect(
      screen.queryByText('I want to change my appointment time.'),
    ).not.toBeInTheDocument();
  });

  it('renders the AI rewrite verbatim even when it contains the word "reschedule"', () => {
    // Pre-fix renderNative() replaced any rewrite containing "reschedule" with a
    // hardcoded multi-clause sentence instead of feedback.nativeRewrite.
    const rewrite = 'Please reschedule the demo for next Tuesday.';
    render(
      <NativeRewritePanel
        feedback={makeFeedback({ nativeRewrite: rewrite })}
        originalSentence="my draft"
        onSave={() => {}}
      />,
    );

    expect(screen.getByText(rewrite)).toBeInTheDocument();
  });

  it('calls onSave when the save-to-deck button is clicked', () => {
    const onSave = vi.fn();
    render(
      <NativeRewritePanel
        feedback={makeFeedback()}
        originalSentence="my draft"
        onSave={onSave}
      />,
    );

    screen.getByRole('button', { name: /복습 카드에 저장/ }).click();
    expect(onSave).toHaveBeenCalledTimes(1);
  });
});
