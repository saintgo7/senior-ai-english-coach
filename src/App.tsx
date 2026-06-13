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
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB930q4es3Gu0EOgb2B9eXOc6fMaxcaJDAv1AwnBEWj2MxlBGV2SLd49938DRYuU4rno2CHutj5UGbbPLVOXcsV73pxm-jIfqRznEueBwDCa58EKkvZxjA66oA0O8wxJ82Q7R3gyGx1Z1w0bszqnDhX2akskJ2ak04fVS_cSkElNjqkMoCGVX8xyJpx0GB-5blVeeNH0TF-q84JurWgfwUKkpgI-RlB6kDG26MJrnjoNXUc_DYoYQkOOv8i_IHCdZNMCojY_gAA4aWO" alt="User profile avatar" />
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
