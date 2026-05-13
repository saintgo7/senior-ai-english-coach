import { describe, expect, it } from 'vitest';
import { createAiCoachService, createMockAiCoachProvider } from './aiCoachService';

describe('AiCoachService', () => {
  it('returns a role-play reply, native rewrite, Korean explanation, and review candidates', async () => {
    const service = createAiCoachService(createMockAiCoachProvider());

    const feedback = await service.submitPracticeTurn({
      scenarioId: 'business-polite-disagreement',
      userText: 'I disagree your idea.',
      inputMode: 'text',
    });

    expect(feedback.coachReply).toContain('different view');
    expect(feedback.nativeRewrite).toBe('I see your point, but I have a slightly different view.');
    expect(feedback.koreanExplanation).toContain('상대 의견을 인정');
    expect(feedback.reviewCandidates).toContain('I see your point');
  });

  it('normalizes blank input into a coaching prompt', async () => {
    const service = createAiCoachService(createMockAiCoachProvider());

    const feedback = await service.submitPracticeTurn({
      scenarioId: 'travel-airport-checkin',
      userText: '   ',
      inputMode: 'text',
    });

    expect(feedback.nativeRewrite).toBe('Could you say that one more time, please?');
    expect(feedback.koreanExplanation).toContain('문장이 비어');
  });
});
