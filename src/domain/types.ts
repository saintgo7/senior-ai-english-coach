export type ScenarioCategory = 'daily' | 'business' | 'travel' | 'it';

export type LessonTerm = {
  english: string;
  korean: string;
  example: string;
};

export type Scenario = {
  id: string;
  category: ScenarioCategory;
  title: string;
  durationMinutes: number;
  difficulty: 'easy' | 'medium';
  learnerGoal: string;
  coachRole: string;
  openingPrompt: string;
  keyWords: LessonTerm[];
  idioms: LessonTerm[];
  nativeExamples: string[];
  koreanExplanation: string;
};

export type PracticeTurnInput = {
  scenarioId: string;
  userText: string;
  inputMode: 'text' | 'voice';
};

export type PracticeTurnFeedback = {
  coachReply: string;
  nativeRewrite: string;
  koreanExplanation: string;
  keyUsageNote: string;
  reviewCandidates: string[];
  /**
   * 이 피드백이 실제 언어모델(LLM)이 검증한 결과인지 여부.
   * mock·stub(에코/규칙 기반) provider는 false, 실제 백엔드 LLM 응답만 true.
   * 미설정(undefined)은 기존 provider와의 호환을 위해 "검증 안 됨"으로 간주한다.
   */
  verified?: boolean;
};

export type ReviewCard = {
  id: string;
  scenarioId: string;
  originalSentence: string;
  nativeRewrite: string;
  koreanExplanation: string;
  keyExpressions: string[];
  createdAt: string;
};
