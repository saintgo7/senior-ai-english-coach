import { useMemo, useState } from 'react';
import { CourseTimer } from './components/CourseTimer';
import { LessonBrief } from './components/LessonBrief';
import { PracticeRoom } from './components/PracticeRoom';
import { NativeRewritePanel } from './components/NativeRewritePanel';
import { ReviewDeck } from './components/ReviewDeck';
import { ScenarioPicker } from './components/ScenarioPicker';
import { scenarios } from './data/scenarios';
import type { PracticeTurnFeedback, Scenario } from './domain/types';
import { useReviewDeck } from './hooks/useReviewDeck';
import { createAiCoachService, createMockAiCoachProvider } from './services/aiCoachService';

// 오프라인 PWA에서도 깨지지 않도록 인라인 SVG data URI로 제공하는 기본 프로필 아바타
const PROFILE_AVATAR =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2096%2096'%3E%3Crect%20width='96'%20height='96'%20rx='48'%20fill='%2312343b'/%3E%3Ccircle%20cx='48'%20cy='38'%20r='18'%20fill='%23f5f1e8'/%3E%3Cpath%20d='M20%2084c0-15.5%2012.5-28%2028-28s28%2012.5%2028%2028z'%20fill='%23f5f1e8'/%3E%3C/svg%3E";

export default function App() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[1]);
  const [feedback, setFeedback] = useState<PracticeTurnFeedback | null>(null);
  const [submittedText, setSubmittedText] = useState<string>('');
  const aiCoach = useMemo(() => createAiCoachService(createMockAiCoachProvider()), []);
  const { cards, addCard, clearCards } = useReviewDeck();

  function handleSelectScenario(scenario: Scenario) {
    setSelectedScenario(scenario);
    setFeedback(null);
    setSubmittedText('');
  }

  function saveFeedback() {
    if (!feedback) return;
    addCard({
      scenarioId: selectedScenario.id,
      originalSentence: submittedText,
      nativeRewrite: feedback.nativeRewrite,
      koreanExplanation: feedback.koreanExplanation,
      keyExpressions: feedback.reviewCandidates,
    });
  }

  return (
    <div className="app-shell hybrid-dashboard">
      <main className="main-content">
        <div className="hybrid-grid">
          {/* Left Column - Brand Logo & Syllabus */}
          <aside className="hybrid-left">
            <div className="brand-logo-container">
              <a href="#" className="brand-logo">Pamout</a>
              <span className="brand-subtitle">AI English Coach</span>
            </div>
            <ScenarioPicker
              scenarios={scenarios}
              selectedId={selectedScenario.id}
              onSelect={handleSelectScenario}
            />
            <div className="sidebar-footer">
              <div className="profile-info">
                <div className="profile-avatar">
                  <img src={PROFILE_AVATAR} alt="User profile avatar" />
                </div>
                <div className="profile-meta">
                  <span className="profile-name">Arthur</span>
                  <span className="profile-level">Intermediate</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Center Column - Active Practice Room & Rewrite Panel */}
          <div className="hybrid-center">
            <CourseTimer />
            <div className="workspace-card">
              <PracticeRoom
                scenario={selectedScenario}
                aiCoach={aiCoach}
                onSubmitted={setSubmittedText}
                onFeedback={setFeedback}
                submittedText={submittedText}
              />
              {feedback && (
                <NativeRewritePanel
                  feedback={feedback}
                  originalSentence={submittedText}
                  onSave={saveFeedback}
                />
              )}
            </div>
          </div>

          {/* Right Column - Reference Vocabulary & Journal */}
          <aside className="hybrid-right">
            <div className="reference-card">
              <LessonBrief scenario={selectedScenario} />
            </div>
            <div className="reference-card">
              <ReviewDeck cards={cards} onClear={clearCards} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
