// 모든 시나리오를 통합해서 내보내는 진입점
import type { Scenario } from '../domain/types';
import { dailyHealthScenarios } from './scenarios/daily-health';
import { dailyFinanceScenarios } from './scenarios/daily-finance';
import { dailyCommunityScenarios } from './scenarios/daily-community';
import { dailySocialScenarios } from './scenarios/daily-social';
import { businessMeetingsScenarios } from './scenarios/business-meetings';
import { businessClientScenarios } from './scenarios/business-client';
import { businessHrScenarios } from './scenarios/business-hr';
import { travelTransitScenarios } from './scenarios/travel-transit';
import { travelCultureScenarios } from './scenarios/travel-culture';
import { travelEmergencyScenarios } from './scenarios/travel-emergency';
import { itAgileScenarios } from './scenarios/it-agile';
import { itCodeScenarios } from './scenarios/it-code';
import { itClientScenarios } from './scenarios/it-client';
import { itIncidentScenarios } from './scenarios/it-incident';
import { itRemoteScenarios } from './scenarios/it-remote';
import { itInterviewScenarios } from './scenarios/it-interview';
import { itLeadershipScenarios } from './scenarios/it-leadership';
import { itProductScenarios } from './scenarios/it-product';
import { itDevopsScenarios } from './scenarios/it-devops';

const coreScenarios: Scenario[] = [
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
      { english: 'confirmation', korean: '확인', example: 'Could you send me a confirmation email?' },
      { english: 'cancellation', korean: '취소', example: 'Is there a fee for a late cancellation?' },
    ],
    idioms: [
      { english: 'something came up', korean: '일이 생겼다', example: 'Something came up this afternoon.' },
      { english: 'fit me in', korean: '시간을 끼워 넣어 주다', example: 'Could you fit me in tomorrow morning?' },
      { english: 'short notice', korean: '촉박한 통보', example: 'I apologize for the short notice.' },
    ],
    nativeExamples: [
      'Something came up, so I need to reschedule my appointment.',
      'Is there any availability tomorrow morning?',
      'I apologize for the short notice — something urgent came up.',
      'Could you fit me in any time before noon on Friday?',
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
      { english: 'concern', korean: '우려 사항', example: 'I have a concern about the timeline.' },
      { english: 'consensus', korean: '합의', example: 'Can we reach a consensus before the meeting ends?' },
    ],
    idioms: [
      { english: 'I see your point', korean: '무슨 말인지 이해합니다', example: 'I see your point, but I have a different view.' },
      { english: 'on the same page', korean: '같은 이해를 하다', example: 'Let us make sure we are on the same page.' },
      { english: 'play devil\'s advocate', korean: '반대 입장에서 따져보다', example: 'Let me play devil\'s advocate for a moment.' },
    ],
    nativeExamples: [
      'I see your point, but I have a slightly different view.',
      'Could we consider one alternative before we decide?',
      'Let me play devil\'s advocate — what if the market is not ready yet?',
      'I just want to make sure we are on the same page about the risks.',
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
      { english: 'overhead bin', korean: '머리 위 수납 칸', example: 'Is there space in the overhead bin?' },
      { english: 'gate', korean: '탑승 게이트', example: 'Which gate do I need to go to?' },
    ],
    idioms: [
      { english: 'if possible', korean: '가능하다면', example: 'I would like an aisle seat, if possible.' },
      { english: 'check in a bag', korean: '짐을 부치다', example: 'I need to check in one bag.' },
      { english: 'make it in time', korean: '제때 도착하다', example: 'Will I make it in time for my connecting flight?' },
    ],
    nativeExamples: [
      'Could I have an aisle seat, if possible?',
      'I would like to check in one bag.',
      'What is the baggage allowance for this flight?',
      'Will I make it in time for my connecting flight if there is a delay?',
    ],
    koreanExplanation: '여행 영어는 짧고 정중한 요청형 문장이 가장 실용적입니다.',
  },
  {
    id: 'it-feature-demo',
    category: 'it',
    title: '신기능 데모 발표하기',
    durationMinutes: 25,
    difficulty: 'medium',
    learnerGoal: '새로 개발한 기능을 클라이언트나 팀에게 단계별로 설명한다.',
    coachRole: 'You are a product owner attending a live feature demo. Ask clarifying questions about how it works and whether it covers edge cases.',
    openingPrompt: 'Thanks for setting this up. Can you walk us through what is new in this release?',
    keyWords: [
      { english: 'walk (someone) through', korean: '단계별로 설명하다', example: 'Let me walk you through the new dashboard step by step.' },
      { english: 'demonstrate', korean: '시연하다', example: 'I will demonstrate how the file upload works.' },
      { english: 'integration', korean: '통합 연동', example: 'This feature supports direct integration with Slack and Teams.' },
      { english: 'workflow', korean: '업무 흐름, 워크플로', example: 'It simplifies the approval workflow from five steps to two.' },
      { english: 'deploy', korean: '배포하다', example: 'We deployed this update to production last Friday.' },
    ],
    idioms: [
      { english: 'out of the box', korean: '별도 설정 없이 바로 사용 가능한', example: 'This works out of the box — no extra configuration needed.' },
      { english: 'under the hood', korean: '내부적으로 (겉으로 드러나지 않는 부분)', example: 'Under the hood, we optimized the query time by about forty percent.' },
      { english: 'run through', korean: '빠르게 훑어보다', example: 'Let me run through the edge cases at the end if we have time.' },
    ],
    nativeExamples: [
      'Let me walk you through the new upload flow step by step.',
      'Out of the box, it supports up to twenty concurrent users with no extra setup.',
      'Under the hood, we reduced average API response time from 800ms to around 200ms.',
      'I will run through the error states briefly so you know what users will see.',
    ],
    koreanExplanation: '데모 발표는 "Let me walk you through..."로 시작하면 청중이 흐름을 따라오기 쉽습니다. 기술 내부 사항은 "under the hood"로 자연스럽게 구분하고, "out of the box"는 추가 설정 없이 즉시 쓸 수 있다는 의미로 제품 소개 시 자주 씁니다.',
  },
  {
    id: 'it-sprint-planning',
    category: 'it',
    title: '스프린트 플래닝 참여하기',
    durationMinutes: 25,
    difficulty: 'medium',
    learnerGoal: '스프린트 플래닝 미팅에서 스토리 포인트와 완료 조건을 논의한다.',
    coachRole: 'You are a scrum master running the sprint planning meeting. Push the learner to clarify estimates and acceptance criteria.',
    openingPrompt: 'Let us go through the backlog items for this sprint. Before we start estimating, does anyone have questions?',
    keyWords: [
      { english: 'story points', korean: '스토리 포인트 (작업 규모·난이도 단위)', example: 'I would estimate this ticket at five story points.' },
      { english: 'acceptance criteria', korean: '인수 기준, 완료 조건', example: 'Can you clarify the acceptance criteria for this ticket before we commit?' },
      { english: 'velocity', korean: '벨로시티 (팀의 스프린트당 처리량)', example: 'Our velocity last sprint was thirty-two points, so let us not over-commit.' },
      { english: 'blocker', korean: '작업을 막는 장애물', example: 'Do we have any blockers on this item that we need to resolve first?' },
      { english: 'backlog', korean: '백로그 (미처리 작업 목록)', example: 'That feature should go into the backlog for a future sprint.' },
    ],
    idioms: [
      { english: 'in scope / out of scope', korean: '범위 내/범위 밖', example: 'That change feels out of scope for this sprint — let us push it to the next one.' },
      { english: 'carry over', korean: '이월하다', example: 'We may need to carry over two items from last sprint.' },
      { english: 'flag it', korean: '(문제나 위험을) 표시하다, 팀에 알리다', example: 'Flag it early if the estimate feels too low once you start.' },
    ],
    nativeExamples: [
      'I would estimate this ticket at three story points — the logic is fairly straightforward.',
      'Can we clarify the acceptance criteria before we commit to this item?',
      'That feels out of scope for this sprint; let us put it in the backlog.',
      'Our velocity was thirty points last sprint, so let us cap this sprint at around the same.',
    ],
    koreanExplanation: '스프린트 플래닝에서 추정치를 말할 때는 "I would estimate this at..." 구문이 자연스럽습니다. "commit to this"는 이 작업을 스프린트에 확정한다는 뜻이며, "out of scope"는 이번 범위가 아니라는 것을 팀에 명확하게 전달하는 핵심 표현입니다.',
  },
  {
    id: 'it-technical-debt',
    category: 'it',
    title: '기술 부채를 경영진에게 설명하기',
    durationMinutes: 25,
    difficulty: 'medium',
    learnerGoal: '비기술직 상사나 경영진에게 리팩토링 필요성을 설득력 있게 설명한다.',
    coachRole: 'You are a non-technical product director. You are skeptical about spending two weeks on refactoring instead of shipping new features. Ask tough questions.',
    openingPrompt: 'I saw the team wants to spend two weeks on refactoring. Why can we not just keep building new features instead?',
    keyWords: [
      { english: 'refactor', korean: '리팩토링하다, 코드를 재구조화하다', example: 'We need to refactor this module before safely adding new features.' },
      { english: 'legacy code', korean: '레거시 코드 (오래되어 유지보수가 어려운 코드)', example: 'The legacy code is slowing down every new release by at least a week.' },
      { english: 'scalability', korean: '확장성', example: 'The current architecture has serious scalability issues beyond one thousand users.' },
      { english: 'bottleneck', korean: '병목 지점', example: 'This database query is the main bottleneck causing slow page loads.' },
      { english: 'maintainability', korean: '유지보수성', example: 'Poor maintainability means even small changes take days to test safely.' },
    ],
    idioms: [
      { english: 'technical debt', korean: '기술 부채 (빠른 개발 결정으로 쌓인 코드 문제)', example: 'We have been accumulating technical debt for the past two years.' },
      { english: 'band-aid solution', korean: '임시방편 (근본 문제를 해결하지 않는 처치)', example: 'We kept applying band-aid solutions, and now the system is fragile.' },
      { english: 'pay down (debt)', korean: '(부채를) 갚다, 해소하다', example: 'Two focused sprints now will pay down enough debt to double our shipping speed.' },
    ],
    nativeExamples: [
      'Think of technical debt like a financial loan — the longer we ignore it, the more interest we pay in lost engineering time.',
      'We have been applying band-aid solutions for a year, and now even a small change breaks something else.',
      'If we invest two weeks paying down this debt, we estimate new features will ship twice as fast afterward.',
      'The legacy code is the main reason our release cycle has stretched from one week to three.',
    ],
    koreanExplanation: '비기술직 경영진에게 기술 부채를 설명할 때 금융 비유("like a loan", "interest", "pay down")를 쓰면 즉시 이해합니다. "band-aid solution"은 근본 해결 없이 증상만 막는 임시방편을 뜻하며, 엔지니어링 대화에서 매우 자주 쓰입니다.',
  },
  {
    id: 'it-code-review',
    category: 'it',
    title: '코드 리뷰 피드백 주고받기',
    durationMinutes: 20,
    difficulty: 'medium',
    learnerGoal: 'PR 코드 리뷰에서 정중하게 피드백을 주거나 받는다.',
    coachRole: 'You are a senior developer who has left comments on the learner\'s pull request. Go through the comments together and discuss the changes.',
    openingPrompt: 'I have left a few comments on your pull request. Can we go through them together?',
    keyWords: [
      { english: 'edge case', korean: '예외 상황, 경계값 케이스', example: 'Have you considered the edge case where the input array is empty?' },
      { english: 'readability', korean: '가독성', example: 'A more descriptive variable name would help readability here.' },
      { english: 'redundant', korean: '불필요한, 중복된', example: 'This null check is redundant — the guard clause above already handles it.' },
      { english: 'convention', korean: '코딩 관례, 팀 컨벤션', example: 'This does not follow our naming convention for boolean variables.' },
      { english: 'nit', korean: '사소한 지적 (blocking이 아닌 개선 제안)', example: 'This is a nit, but I would extract this into a named constant.' },
    ],
    idioms: [
      { english: 'blocking comment', korean: '병합을 막는 필수 수정 사항', example: 'This is a blocking comment — we cannot merge until the null check is added.' },
      { english: 'LGTM', korean: 'Looks Good To Me (승인 표현)', example: 'Everything else LGTM — fix the edge case and feel free to merge.' },
      { english: 'in the weeds', korean: '세부 사항에 너무 깊이 파고들다', example: 'Let us not get too in the weeds — the overall approach is solid.' },
    ],
    nativeExamples: [
      'This is a nit, but would you mind using a named constant here instead of the magic number?',
      'The edge case where userId is null would cause a runtime crash — can we add a guard before the loop?',
      'Everything else LGTM; once you address that null check, feel free to merge.',
      'I see your point — I will rename the variable to make the intent clearer.',
    ],
    koreanExplanation: '코드 리뷰에서는 직접 명령("Change this")보다 "Would you mind...?", "Can we...?" 같은 부드러운 제안형이 협업 문화에 맞습니다. "nit"를 먼저 명시하면 상대방이 작은 지적에 방어적으로 반응하지 않으며, "blocking"은 반드시 고쳐야 병합 가능하다는 신호입니다.',
  },
  {
    id: 'it-incident-escalation',
    category: 'it',
    title: '장애 상황 에스컬레이션하기',
    durationMinutes: 20,
    difficulty: 'medium',
    learnerGoal: '프로덕션 장애 발생 시 상황을 간결하고 명확하게 보고하고 대응 방향을 논의한다.',
    coachRole: 'You are the engineering manager who just got paged. You need a clear situation report and want to understand severity, impact, and next steps quickly.',
    openingPrompt: 'I just got paged. Give me a quick summary — what is the situation right now?',
    keyWords: [
      { english: 'outage', korean: '서비스 장애, 중단', example: 'We are seeing a partial outage on the payment service.' },
      { english: 'severity', korean: '심각도 (Sev-1이 최고 등급)', example: 'This is a severity-one incident — it is affecting all users.' },
      { english: 'root cause', korean: '근본 원인', example: 'We have not confirmed the root cause yet, but we suspect the morning deploy.' },
      { english: 'rollback', korean: '롤백, 이전 버전으로 되돌리기', example: 'We are preparing a rollback to the previous stable release.' },
      { english: 'mitigation', korean: '완화 조치 (완전 해결 전 임시 조치)', example: 'We applied a mitigation that reduced errors by eighty percent.' },
    ],
    idioms: [
      { english: 'all hands on deck', korean: '모두 긴급 투입', example: 'This is all hands on deck — I need every available engineer in the channel.' },
      { english: 'ETA', korean: '예상 완료 시간 (Estimated Time of Arrival)', example: 'What is the ETA on the rollback decision?' },
      { english: 'blast radius', korean: '영향 범위', example: 'The blast radius looks contained to EU region — roughly ten percent of traffic.' },
    ],
    nativeExamples: [
      'We have a severity-one outage on the checkout flow — it started around 14:20 UTC.',
      'Root cause is still under investigation, but we suspect the deploy from this morning.',
      'We are evaluating a rollback; ETA on that decision is about fifteen minutes.',
      'The blast radius looks contained to EU region users — roughly twelve percent of total traffic.',
    ],
    koreanExplanation: '장애 보고는 "What happened, When, Who is affected, What we are doing" 순서로 간결하게 전달해야 합니다. "severity-one"은 최고 등급 장애를 뜻하며, ETA는 구두로도 자주 쓰는 표현입니다. "blast radius"는 군사 용어에서 온 IT 업계 표현으로 영향 범위를 의미합니다.',
  },
  {
    id: 'it-requirements-gathering',
    category: 'it',
    title: '클라이언트 요구사항 수집하기',
    durationMinutes: 20,
    difficulty: 'easy',
    learnerGoal: '클라이언트 미팅에서 핵심 불편 사항과 우선순위를 명확하게 파악한다.',
    coachRole: 'You are a client stakeholder who has vague ideas about what you want. You need the learner to ask the right questions to uncover your real needs.',
    openingPrompt: 'We are excited to get started. We have some rough ideas about what we need, but we are not entirely sure where to begin — where do you usually start?',
    keyWords: [
      { english: 'use case', korean: '사용 사례, 활용 시나리오', example: 'Can you walk me through a typical use case from start to finish?' },
      { english: 'priority', korean: '우선순위', example: 'Which of these features has the highest priority for your team right now?' },
      { english: 'constraint', korean: '제약 조건 (기술·예산·일정 등)', example: 'Are there any technical or budget constraints we should factor in?' },
      { english: 'stakeholder', korean: '이해 관계자', example: 'Who are the main stakeholders who will sign off on this project?' },
      { english: 'pain point', korean: '핵심 불편 사항', example: 'What is the biggest pain point in your current workflow?' },
    ],
    idioms: [
      { english: 'nice to have', korean: '있으면 좋지만 필수는 아닌 것', example: 'That sounds like a nice to have — let us lock in the must-haves first.' },
      { english: 'as-is vs to-be', korean: '현재 상태 vs 목표 상태', example: 'Let us map out the as-is process before we design the to-be solution.' },
      { english: 'on the same page', korean: '같은 이해를 공유하다', example: 'I want to make sure we are on the same page about scope before we proceed.' },
    ],
    nativeExamples: [
      'What is the biggest pain point in the way your team handles this process today?',
      'Could you walk me through a typical use case from start to finish?',
      'That sounds like a nice to have — let us make sure we nail the must-haves first.',
      'I want to make sure we are on the same page on scope before we move to the next step.',
    ],
    koreanExplanation: '요구사항 수집 미팅에서는 현재 문제("pain point")를 충분히 들은 뒤 우선순위("must-have vs nice to have")를 확인하는 순서가 효과적입니다. "walk me through"는 상대방이 자신의 업무 흐름을 직접 설명하도록 자연스럽게 유도하는 표현입니다.',
  },
];

export const scenarios: Scenario[] = [
  ...coreScenarios,
  ...dailyHealthScenarios,
  ...dailyFinanceScenarios,
  ...dailyCommunityScenarios,
  ...dailySocialScenarios,
  ...businessMeetingsScenarios,
  ...businessClientScenarios,
  ...businessHrScenarios,
  ...travelTransitScenarios,
  ...travelCultureScenarios,
  ...travelEmergencyScenarios,
  ...itAgileScenarios,
  ...itCodeScenarios,
  ...itClientScenarios,
  ...itIncidentScenarios,
  ...itRemoteScenarios,
  ...itInterviewScenarios,
  ...itLeadershipScenarios,
  ...itProductScenarios,
  ...itDevopsScenarios,
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find((scenario) => scenario.id === id);
}
