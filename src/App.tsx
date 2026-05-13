import { useMemo, useState } from 'react';
import { CourseTimer } from './components/CourseTimer';
import { LessonBrief } from './components/LessonBrief';
import { PracticeRoom } from './components/PracticeRoom';
import { ReviewDeck } from './components/ReviewDeck';
import { ScenarioPicker } from './components/ScenarioPicker';
import { scenarios } from './data/scenarios';
import type { PracticeTurnFeedback, Scenario } from './domain/types';
import { useReviewDeck } from './hooks/useReviewDeck';
import { createAiCoachService, createMockAiCoachProvider } from './services/aiCoachService';

export default function App() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[1]);
  const aiCoach = useMemo(() => createAiCoachService(createMockAiCoachProvider()), []);
  const { cards, addCard, clearCards } = useReviewDeck();

  function saveFeedback(originalSentence: string, feedback: PracticeTurnFeedback) {
    addCard({
      scenarioId: selectedScenario.id,
      originalSentence,
      nativeRewrite: feedback.nativeRewrite,
      koreanExplanation: feedback.koreanExplanation,
      keyExpressions: feedback.reviewCandidates,
    });
  }

  return (
    <main className="app-shell">
      <section className="hero-band">
        <p className="eyebrow">Senior AI English Coach</p>
        <h1>1시간 상황별 AI 회화 훈련</h1>
        <p className="hero-copy">일상, 비즈니스, 여행 상황에서 말하고 고치고 복습합니다.</p>
      </section>
      <div className="content-grid">
        <CourseTimer />
        <ScenarioPicker
          scenarios={scenarios}
          selectedId={selectedScenario.id}
          onSelect={setSelectedScenario}
        />
        <LessonBrief scenario={selectedScenario} />
        <PracticeRoom
          scenario={selectedScenario}
          aiCoach={aiCoach}
          onSaveFeedback={saveFeedback}
        />
        <ReviewDeck cards={cards} onClear={clearCards} />
      </div>
    </main>
  );
}
