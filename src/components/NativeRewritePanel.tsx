import type { PracticeTurnFeedback } from '../domain/types';

export function NativeRewritePanel({
  feedback,
  originalSentence,
  onSave,
}: {
  feedback: PracticeTurnFeedback;
  originalSentence: string;
  onSave: () => void;
}) {
  return (
    <section className="feedback-panel" aria-label="AI 코치 피드백">
      <div className="feedback-title-row">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", color: 'var(--secondary)' }}>
          auto_fix_high
        </span>
        <span>교정 노트 • Revision Sheet</span>
      </div>

      <div style={{ marginTop: '8px' }}>
        <span className="rewrite-section-label">초안 Draft</span>
        <div className="user-expression-box">
          <p style={{ margin: 0 }}>{originalSentence}</p>
        </div>
      </div>

      <div className="rewrite-divider" aria-hidden="true">
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
          arrow_downward
        </span>
      </div>

      <div>
        <span className="rewrite-section-label">원어민 교정 추천 Polished Draft</span>
        <div className="native-expression-box">
          <p style={{ margin: 0 }}>{feedback.nativeRewrite}</p>
        </div>
      </div>

      <div className="explanation-tip-box">
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
          menu_book
        </span>
        <div>
          <p style={{ margin: '0 0 4px', fontWeight: 700 }}>교정 설명 • Explanation</p>
          <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--text)' }}>{feedback.koreanExplanation}</p>
          <p style={{ margin: '6px 0 0', fontStyle: 'italic', fontSize: '12px', color: 'var(--outline)' }}>
            Usage note: {feedback.keyUsageNote}
          </p>
        </div>
      </div>

      <button className="save-bookmark-btn" onClick={onSave} type="button">
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
          bookmark
        </span>
        복습 카드에 저장 • Save to Review Deck
      </button>
    </section>
  );
}
