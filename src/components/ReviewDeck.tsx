import type { ReviewCard } from '../domain/types';

export function ReviewDeck({ cards, onClear }: { cards: ReviewCard[]; onClear: () => void }) {
  return (
    <section className="review-deck" aria-label="복습 카드 목록">
      <div className="review-deck-header">
        <h2 style={{ display: 'flex', flexDirection: 'column' }}>
          <strong>개인 복습 단어장</strong>
          <span style={{ fontSize: '12px', color: 'var(--outline)', fontWeight: 600, marginTop: '2px' }}>
            저장된 복습 카드 {cards.length}개 • Journal ({cards.length})
          </span>
        </h2>
        {cards.length > 0 && (
          <button className="clear-all-btn" onClick={onClear} type="button">
            모두 비우기 • Clear
          </button>
        )}
      </div>
      {cards.length === 0 ? (
        <p style={{ color: 'var(--outline)', margin: 0, fontSize: '14px', fontStyle: 'italic' }}>
          아직 저장된 표현이 없습니다. 대화 실습 피드백에서 보관하고 싶은 교정 문장을 저장해 보세요.
          <span style={{ display: 'block', fontSize: '12px', marginTop: '4px', opacity: 0.8 }}>
            No bookmarks saved. Add native corrections to your list while practicing.
          </span>
        </p>
      ) : (
        <div className="review-card-list">
          {cards.map((card) => (
            <article className="glass-review-card" key={card.id}>
              <span className="review-original">Original Draft: {card.originalSentence}</span>
              <strong className="review-native">{card.nativeRewrite}</strong>
              <p className="review-explanation">{card.koreanExplanation}</p>
              <div className="review-tags">
                {card.keyExpressions.map((expr, i) => (
                  <span className="review-tag" key={`${expr}-${i}`}>
                    {expr}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
