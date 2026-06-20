import { describe, expect, it } from 'vitest';
import {
  createAiCoachProviderFromConfig,
  createAiCoachService,
  createMockAiCoachProvider,
  createStubAiCoachProvider,
} from './aiCoachService';

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

  it('marks mock feedback as not LLM-verified', async () => {
    const service = createAiCoachService(createMockAiCoachProvider());

    const feedback = await service.submitPracticeTurn({
      scenarioId: 'business-polite-disagreement',
      userText: 'hello',
      inputMode: 'text',
    });

    expect(feedback.verified).toBe(false);
  });
});

describe('StubAiCoachProvider (echo / rule-based local backend)', () => {
  it('echoes the user sentence and stays honestly unverified', async () => {
    const provider = createStubAiCoachProvider();

    const feedback = await provider.submitPracticeTurn({
      scenarioId: 'daily-clinic-appointment',
      userText: 'I want to change my appointment',
      inputMode: 'text',
    });

    expect(feedback.coachReply).toContain('I want to change my appointment');
    expect(feedback.verified).toBe(false);
  });

  it('appends a period when the sentence has no terminal punctuation', async () => {
    const provider = createStubAiCoachProvider();

    const feedback = await provider.submitPracticeTurn({
      scenarioId: 'daily-clinic-appointment',
      userText: 'hello there',
      inputMode: 'text',
    });

    expect(feedback.nativeRewrite).toBe('hello there.');
  });

  it('keeps existing terminal punctuation untouched', async () => {
    const provider = createStubAiCoachProvider();

    const feedback = await provider.submitPracticeTurn({
      scenarioId: 'daily-clinic-appointment',
      userText: 'Is this open?',
      inputMode: 'text',
    });

    expect(feedback.nativeRewrite).toBe('Is this open?');
  });

  it('returns a polite retry prompt on blank input', async () => {
    const provider = createStubAiCoachProvider();

    const feedback = await provider.submitPracticeTurn({
      scenarioId: 'daily-clinic-appointment',
      userText: '   ',
      inputMode: 'text',
    });

    expect(feedback.nativeRewrite).toBe('Could you say that one more time, please?');
    expect(feedback.verified).toBe(false);
  });
});

describe('createAiCoachProviderFromConfig', () => {
  it('selects the stub provider when kind is "stub"', async () => {
    const provider = createAiCoachProviderFromConfig({ kind: 'stub' });

    const feedback = await provider.submitPracticeTurn({
      scenarioId: 'daily-clinic-appointment',
      userText: 'good morning',
      inputMode: 'text',
    });

    // stub은 입력을 그대로 반영한다.
    expect(feedback.coachReply).toContain('good morning');
  });

  it('defaults to the mock provider for kind "mock"', async () => {
    const provider = createAiCoachProviderFromConfig({ kind: 'mock' });

    const feedback = await provider.submitPracticeTurn({
      scenarioId: 'business-polite-disagreement',
      userText: 'hello',
      inputMode: 'text',
    });

    expect(feedback.nativeRewrite).toBe('I see your point, but I have a slightly different view.');
  });
});
