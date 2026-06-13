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
