import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { PracticeRoom } from './PracticeRoom';
import type { AiCoachProvider } from '../services/aiCoachService';
import type { PracticeTurnFeedback, Scenario } from '../domain/types';

// 라운드1 BUGS 수정 회귀 테스트: 제출 진행 중 Enter/버튼 재입력이 중복 턴을 만들지 않는지 검증한다.
const feedback: PracticeTurnFeedback = {
  coachReply: 'ok',
  nativeRewrite: 'native',
  koreanExplanation: '설명',
  keyUsageNote: 'note',
  reviewCandidates: [],
};

const scenario: Scenario = {
  id: 'test-scenario',
  category: 'daily',
  title: 'Test Scenario',
  durationMinutes: 10,
  difficulty: 'easy',
  learnerGoal: 'practice',
  coachRole: 'coach',
  openingPrompt: 'Shall we start?',
  keyWords: [],
  idioms: [],
  nativeExamples: [],
  koreanExplanation: '설명',
};

// A provider whose pending promise we resolve manually, so we can fire a second
// submit while the first is still in flight.
function createDeferredProvider() {
  let calls = 0;
  let resolveCurrent: (() => void) | null = null;
  const provider: AiCoachProvider = {
    submitPracticeTurn() {
      calls += 1;
      return new Promise<PracticeTurnFeedback>((resolve) => {
        resolveCurrent = () => resolve(feedback);
      });
    },
  };
  return {
    provider,
    get calls() {
      return calls;
    },
    resolveCurrent: () => resolveCurrent?.(),
  };
}

describe('PracticeRoom submit guard', () => {
  it('ignores a second submit (Enter) while the first turn is still pending', async () => {
    const user = userEvent.setup();
    const deferred = createDeferredProvider();

    render(
      <PracticeRoom
        scenario={scenario}
        aiCoach={deferred.provider}
        onSubmitted={() => {}}
        onFeedback={() => {}}
        submittedText=""
      />,
    );

    const input = screen.getByLabelText('연습 문장 입력');
    await user.type(input, 'Hello coach');
    await user.click(screen.getByRole('button', { name: 'AI 코치에게 보내기' }));

    // First turn is in flight; pre-fix the input stayed enabled and Enter could
    // fire another overlapping turn. Post-fix the input is disabled and the
    // guard early-returns.
    expect(input).toBeDisabled();
    await user.keyboard('{Enter}');

    expect(deferred.calls).toBe(1);

    deferred.resolveCurrent();
  });
});
