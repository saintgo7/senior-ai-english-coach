import type { Scenario } from '../domain/types';

export const scenarios: Scenario[] = [
  {
    id: 'daily-clinic-appointment',
    category: 'daily',
    title: '병원 예약 변경하기',
    durationMinutes: 20,
    difficulty: 'easy',
    learnerGoal: '진료 예약을 정중하게 변경한다.',
    coachRole: 'You are a clinic receptionist helping the learner reschedule.',
    openingPrompt: 'Good morning, how can I help you with your appointment?',
    keyWords: [
      { english: 'appointment', korean: '예약', example: 'I have an appointment at 2 p.m.' },
      { english: 'reschedule', korean: '일정을 변경하다', example: 'Can I reschedule my appointment?' },
      { english: 'available', korean: '가능한', example: 'What times are available tomorrow?' },
    ],
    idioms: [
      { english: 'something came up', korean: '일이 생겼다', example: 'Something came up this afternoon.' },
      { english: 'fit me in', korean: '시간을 끼워 넣어 주다', example: 'Could you fit me in tomorrow morning?' },
    ],
    nativeExamples: [
      'Something came up, so I need to reschedule my appointment.',
      'Is there any availability tomorrow morning?',
    ],
    koreanExplanation: '예약 변경은 이유를 짧게 말하고 가능한 시간을 묻는 방식이 자연스럽습니다.',
  },
  {
    id: 'business-polite-disagreement',
    category: 'business',
    title: '회의에서 정중하게 다른 의견 말하기',
    durationMinutes: 20,
    difficulty: 'medium',
    learnerGoal: '상대 의견을 인정하면서 내 관점을 말한다.',
    coachRole: 'You are a colleague discussing a project decision.',
    openingPrompt: 'I think we should launch the campaign next week. What do you think?',
    keyWords: [
      { english: 'clarify', korean: '명확히 하다', example: 'Let me clarify my concern.' },
      { english: 'perspective', korean: '관점', example: 'From my perspective, we need more time.' },
      { english: 'alternative', korean: '대안', example: 'Can I suggest an alternative?' },
    ],
    idioms: [
      { english: 'I see your point', korean: '무슨 말인지 이해합니다', example: 'I see your point, but I have a different view.' },
      { english: 'on the same page', korean: '같은 이해를 하다', example: 'Let us make sure we are on the same page.' },
    ],
    nativeExamples: [
      'I see your point, but I have a slightly different view.',
      'Could we consider one alternative before we decide?',
    ],
    koreanExplanation: '비즈니스에서는 바로 반대하기보다 상대 의견을 인정한 뒤 대안을 제시하는 표현이 안전합니다.',
  },
  {
    id: 'travel-airport-checkin',
    category: 'travel',
    title: '공항 체크인에서 요청하기',
    durationMinutes: 20,
    difficulty: 'easy',
    learnerGoal: '체크인 상황에서 좌석과 수하물을 묻는다.',
    coachRole: 'You are an airline check-in agent.',
    openingPrompt: 'May I see your passport and booking confirmation?',
    keyWords: [
      { english: 'boarding pass', korean: '탑승권', example: 'Can I get my boarding pass?' },
      { english: 'aisle seat', korean: '통로 좌석', example: 'Do you have an aisle seat?' },
      { english: 'baggage allowance', korean: '수하물 허용량', example: 'What is my baggage allowance?' },
    ],
    idioms: [
      { english: 'if possible', korean: '가능하다면', example: 'I would like an aisle seat, if possible.' },
      { english: 'check in a bag', korean: '짐을 부치다', example: 'I need to check in one bag.' },
    ],
    nativeExamples: [
      'Could I have an aisle seat, if possible?',
      'I would like to check in one bag.',
    ],
    koreanExplanation: '여행 영어는 짧고 정중한 요청형 문장이 가장 실용적입니다.',
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === id);
}
