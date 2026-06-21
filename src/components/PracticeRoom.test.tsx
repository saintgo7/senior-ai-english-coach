import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
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

// 라운드3 EDGECASE 수정 회귀 테스트: 한국어/CJK IME 조합 확정 Enter(isComposing=true)로 미완성 문장이 전송되지 않는지 검증한다.
describe('PracticeRoom IME composition guard', () => {
  it('does not submit on the Enter that confirms an IME composition', async () => {
    const user = userEvent.setup();
    const submit = vi.fn(() => Promise.resolve(feedback));
    const provider: AiCoachProvider = { submitPracticeTurn: submit };

    render(
      <PracticeRoom
        scenario={scenario}
        aiCoach={provider}
        onSubmitted={() => {}}
        onFeedback={() => {}}
        submittedText=""
      />,
    );

    const input = screen.getByLabelText('연습 문장 입력');
    await user.type(input, '안녕하세요');

    // Enter that only confirms the Hangul composition: pre-fix this submitted a
    // half-composed turn; post-fix the isComposing guard ignores it.
    fireEvent.keyDown(input, { key: 'Enter', isComposing: true });
    expect(submit).not.toHaveBeenCalled();

    // A real Enter (composition already finalized) still submits.
    fireEvent.keyDown(input, { key: 'Enter', isComposing: false });
    expect(submit).toHaveBeenCalledTimes(1);
  });
});

// 라운드3 A11Y 수정 회귀 테스트: 화자(COACH/LEARNER) 라벨이 CSS ::before가 아니라 실제 DOM 텍스트로 접근성 트리에 노출되는지 검증한다.
describe('PracticeRoom speaker attribution', () => {
  it('renders the COACH speaker label as real DOM text for the opening message', () => {
    const provider: AiCoachProvider = { submitPracticeTurn: () => Promise.resolve(feedback) };
    render(
      <PracticeRoom
        scenario={scenario}
        aiCoach={provider}
        onSubmitted={() => {}}
        onFeedback={() => {}}
        submittedText=""
      />,
    );

    expect(screen.getByText('COACH')).toBeInTheDocument();
  });
});
