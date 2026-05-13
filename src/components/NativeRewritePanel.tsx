import type { PracticeTurnFeedback } from '../domain/types';

export function NativeRewritePanel({
  feedback,
  onSave,
}: {
  feedback: PracticeTurnFeedback;
  onSave: () => void;
}) {
  return (
    <section className="feedback-panel" aria-label="AI 코치 피드백">
      <p className="coach-reply">{feedback.coachReply}</p>
      <h3>원어민식 표현</h3>
      <blockquote>{feedback.nativeRewrite}</blockquote>
      <p>{feedback.koreanExplanation}</p>
      <p className="usage-note">{feedback.keyUsageNote}</p>
      <button className="primary-action" onClick={onSave} type="button">
        복습 카드로 저장
      </button>
    </section>
  );
}
