import type { PracticeTurnFeedback, PracticeTurnInput } from '../domain/types';

export type AiCoachProvider = {
  submitPracticeTurn(input: PracticeTurnInput): Promise<PracticeTurnFeedback>;
};

/**
 * provider 선택 플래그.
 * - 'mock'  : 시나리오 카테고리별 고정 응답(데모/통합테스트용). verified=false.
 * - 'stub'  : 입력을 그대로 반영하는 에코/규칙 기반 로컬 백엔드. verified=false.
 * - 'http'  : 실제 백엔드 LLM 엔드포인트 호출. 이 저장소에는 대응 서버가 없으므로
 *             명시적으로 endpoint를 켜기 전까지 사용 금지(외부 의존).
 */
export type AiCoachProviderKind = 'mock' | 'stub' | 'http';

export type AiCoachProviderConfig = {
  kind: AiCoachProviderKind;
  /** kind='http'일 때 호출할 엔드포인트. 미지정 시 기본 경로. */
  endpoint?: string;
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
          verified: false,
        };
      }

      if (input.scenarioId.includes('business')) {
        return {
          coachReply: 'That is clear. A more natural way is to acknowledge the other person before giving your different view.',
          nativeRewrite: 'I see your point, but I have a slightly different view.',
          koreanExplanation: '상대 의견을 인정한 뒤 다른 관점을 말하면 비즈니스 회의에서 더 부드럽게 들립니다.',
          keyUsageNote: '"I see your point"로 시작하면 반대 의견도 공격적으로 들리지 않습니다.',
          reviewCandidates: ['I see your point', 'a slightly different view'],
          verified: false,
        };
      }

      if (input.scenarioId.includes('travel')) {
        return {
          coachReply: 'Good. You can make that request sound smoother with "if possible."',
          nativeRewrite: 'Could I have an aisle seat, if possible?',
          koreanExplanation: '여행 상황에서는 "if possible"을 붙이면 정중하고 자연스럽습니다.',
          keyUsageNote: '"Could I have..."는 공항, 호텔, 식당에서 모두 쓸 수 있습니다.',
          reviewCandidates: ['Could I have', 'if possible'],
          verified: false,
        };
      }

      return {
        coachReply: 'Good start. Let us make it sound more natural and polite.',
        nativeRewrite: 'Something came up, so I need to reschedule my appointment.',
        koreanExplanation: '"Something came up"은 갑자기 일이 생겼다는 자연스러운 표현입니다.',
        keyUsageNote: '"reschedule"은 예약 변경에 가장 직접적으로 쓰이는 동사입니다.',
        reviewCandidates: ['Something came up', 'reschedule my appointment'],
        verified: false,
      };
    },
  };
}

/**
 * 로컬 stub 백엔드 — 외부 LLM 없이 입력을 그대로 반영하는 에코/규칙 기반 코치.
 * 실제 언어모델이 아니므로 항상 verified=false 를 돌려준다(정직성 표기).
 * 짧은 문장 끝에 마침표가 없으면 보강하는 정도의 단순 규칙만 적용한다.
 */
export function createStubAiCoachProvider(): AiCoachProvider {
  return {
    async submitPracticeTurn(input) {
      const trimmed = input.userText.trim();

      if (!trimmed) {
        return {
          coachReply: 'I did not catch any words. Please type one short sentence.',
          nativeRewrite: 'Could you say that one more time, please?',
          koreanExplanation: '입력이 비어 있어 다시 말해 달라는 정중한 표현을 제안합니다. (로컬 stub 응답 — 실제 LLM 교정 아님)',
          keyUsageNote: '이 응답은 외부 언어모델 없이 만든 규칙 기반 stub입니다.',
          reviewCandidates: ['Could you say that one more time?'],
          verified: false,
        };
      }

      // 끝에 종결 부호가 없으면 마침표를 붙이는 정도의 최소 정규화만 한다.
      const hasTerminal = /[.!?]$/.test(trimmed);
      const rewrite = hasTerminal ? trimmed : `${trimmed}.`;
      const firstWords = trimmed.split(/\s+/).slice(0, 3).join(' ');

      return {
        coachReply: `You said: "${trimmed}". (로컬 stub이 그대로 반영했습니다. 실제 코치 교정이 아닙니다.)`,
        nativeRewrite: rewrite,
        koreanExplanation:
          '이 결과는 외부 언어모델 없이 입력을 그대로 되돌려주는 로컬 stub 응답입니다. 실제 원어민식 교정은 백엔드 LLM 연동 후 제공됩니다.',
        keyUsageNote: 'stub provider는 데모/오프라인 확인용이며 문법·표현 교정을 보장하지 않습니다.',
        reviewCandidates: firstWords ? [firstWords] : [trimmed],
        verified: false,
      };
    },
  };
}

/**
 * 실제 백엔드 LLM 엔드포인트 호출 provider.
 * 주의: 이 저장소에는 대응 서버(`/api/coach/practice-turn`)가 없다(외부 의존).
 * verified 값은 백엔드 응답을 그대로 신뢰하며, 응답에 verified가 없으면
 * 검증된 LLM 경로로 간주해 true 로 채운다(이 provider는 실제 엔드포인트가
 * 명시적으로 설정된 경우에만 사용되기 때문이다).
 */
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

      const data = (await response.json()) as PracticeTurnFeedback;
      return { ...data, verified: data.verified ?? true };
    },
  };
}

/**
 * 플래그 기반 provider 팩토리.
 * 기본은 'mock'(또는 'stub'). 'http'는 실제 백엔드가 있을 때만 명시적으로 선택해야 한다.
 */
export function createAiCoachProviderFromConfig(config: AiCoachProviderConfig): AiCoachProvider {
  switch (config.kind) {
    case 'stub':
      return createStubAiCoachProvider();
    case 'http':
      return createHttpAiCoachProvider(config.endpoint);
    case 'mock':
    default:
      return createMockAiCoachProvider();
  }
}
