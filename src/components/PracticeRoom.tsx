import { Keyboard, Mic, Send } from 'lucide-react';
import { useState } from 'react';
import type { PracticeTurnFeedback, Scenario } from '../domain/types';
import type { AiCoachProvider } from '../services/aiCoachService';
import { NativeRewritePanel } from './NativeRewritePanel';

export function PracticeRoom({
  scenario,
  aiCoach,
  onSaveFeedback,
}: {
  scenario: Scenario;
  aiCoach: AiCoachProvider;
  onSaveFeedback: (originalSentence: string, feedback: PracticeTurnFeedback) => void;
}) {
  const [userText, setUserText] = useState('');
  const [feedback, setFeedback] = useState<PracticeTurnFeedback | null>(null);
  const [status, setStatus] = useState('타이핑으로 연습할 수 있습니다.');

  async function submitTurn() {
    setStatus('AI 코치가 표현을 다듬는 중입니다.');
    const nextFeedback = await aiCoach.submitPracticeTurn({
      scenarioId: scenario.id,
      userText,
      inputMode: 'text',
    });
    setFeedback(nextFeedback);
    setStatus('피드백이 준비되었습니다.');
  }

  return (
    <section className="panel practice-room">
      <div className="practice-header">
        <div>
          <p className="eyebrow">Practice Room</p>
          <h2>{scenario.title}</h2>
          <p>{scenario.openingPrompt}</p>
        </div>
        <div className="mode-pills" aria-label="입력 모드">
          <span><Keyboard size={20} /> 텍스트</span>
          <span><Mic size={20} /> 음성 준비</span>
        </div>
      </div>
      <label htmlFor="practice-input">연습 문장 입력</label>
      <textarea
        id="practice-input"
        value={userText}
        onChange={(event) => setUserText(event.target.value)}
        placeholder="예: I disagree your idea."
      />
      <div className="action-row">
        <button className="primary-action" onClick={submitTurn} type="button">
          <Send size={22} /> AI 코치에게 보내기
        </button>
        <p aria-live="polite">{status}</p>
      </div>
      {feedback ? (
        <NativeRewritePanel
          feedback={feedback}
          onSave={() => onSaveFeedback(userText, feedback)}
        />
      ) : null}
    </section>
  );
}
