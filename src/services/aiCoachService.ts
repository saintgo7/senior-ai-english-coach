import type { PracticeTurnFeedback, PracticeTurnInput } from '../domain/types';

export type AiCoachProvider = {
  submitPracticeTurn(input: PracticeTurnInput): Promise<PracticeTurnFeedback>;
};

export function createAiCoachService(provider: AiCoachProvider): AiCoachProvider {
  return {
    submitPracticeTurn(input) {
      return provider.submitPracticeTurn({
        ...input,
        userText: input.userText.trim(),
      });
    },
  };
}

export function createMockAiCoachProvider(): AiCoachProvider {
  return {
    async submitPracticeTurn(input) {
      if (!input.userText) {
        return {
          coachReply: 'No problem. Please try one short sentence first.',
          nativeRewrite: 'Could you say that one more time, please?',
          koreanExplanation: '문장이 비어 있어 다시 말해 달라는 정중한 표현을 연습합니다.',
          keyUsageNote: '"Could you..."는 시니어 학습자가 안전하게 쓸 수 있는 정중한 요청 표현입니다.',
          reviewCandidates: ['Could you say that one more time?', 'one more time'],
        };
      }

      if (input.scenarioId.includes('business')) {
        return {
          coachReply: 'That is clear. A more natural way is to acknowledge the other person before giving your different view.',
          nativeRewrite: 'I see your point, but I have a slightly different view.',
          koreanExplanation: '상대 의견을 인정한 뒤 다른 관점을 말하면 비즈니스 회의에서 더 부드럽게 들립니다.',
          keyUsageNote: '"I see your point"로 시작하면 반대 의견도 공격적으로 들리지 않습니다.',
          reviewCandidates: ['I see your point', 'a slightly different view'],
        };
      }

      if (input.scenarioId.includes('travel')) {
        return {
          coachReply: 'Good. You can make that request sound smoother with "if possible."',
          nativeRewrite: 'Could I have an aisle seat, if possible?',
          koreanExplanation: '여행 상황에서는 "if possible"을 붙이면 정중하고 자연스럽습니다.',
          keyUsageNote: '"Could I have..."는 공항, 호텔, 식당에서 모두 쓸 수 있습니다.',
          reviewCandidates: ['Could I have', 'if possible'],
        };
      }

      return {
        coachReply: 'Good start. Let us make it sound more natural and polite.',
        nativeRewrite: 'Something came up, so I need to reschedule my appointment.',
        koreanExplanation: '"Something came up"은 갑자기 일이 생겼다는 자연스러운 표현입니다.',
        keyUsageNote: '"reschedule"은 예약 변경에 가장 직접적으로 쓰이는 동사입니다.',
        reviewCandidates: ['Something came up', 'reschedule my appointment'],
      };
    },
  };
}

export function createHttpAiCoachProvider(endpoint = '/api/coach/practice-turn'): AiCoachProvider {
  return {
    async submitPracticeTurn(input) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error(`AI coach request failed with status ${response.status}`);
      }

      return response.json() as Promise<PracticeTurnFeedback>;
    },
  };
}
