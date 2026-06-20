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

export default function App() {
  const [selectedScenario, setSelectedScenario] = useState<Scenario>(scenarios[0]);
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
              <span className="brand-logo">Pamout</span>
              <span className="brand-subtitle">AI English Coach</span>
            </div>
            <ScenarioPicker
              scenarios={scenarios}
              selectedId={selectedScenario.id}
              onSelect={handleSelectScenario}
            />
            <div className="sidebar-footer">
              <div className="profile-info">
                <div className="profile-avatar" aria-hidden="true">
                  <svg viewBox="0 0 40 40" width="40" height="40" role="img" aria-label="데모 프로필 아바타">
                    <circle cx="20" cy="20" r="20" fill="#12343b" />
                    <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="700" fill="#ffffff">A</text>
                  </svg>
                </div>
                <div className="profile-meta">
                  <span className="profile-name">Arthur</span>
                  <span className="profile-level">데모 프로필 • Demo Profile</span>
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
