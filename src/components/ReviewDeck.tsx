import type { ReviewCard } from '../domain/types';

export function ReviewDeck({ cards, onClear }: { cards: ReviewCard[]; onClear: () => void }) {
  return (
    <section className="panel review-deck">
      <div className="section-heading">
        <h2>저장된 복습 카드 {cards.length}개</h2>
        <button className="secondary-action" onClick={onClear} type="button">전체 지우기</button>
      </div>
      {cards.length === 0 ? (
        <p>아직 저장된 표현이 없습니다. 역할극 후 유용한 표현을 저장하세요.</p>
      ) : (
        <div className="review-list">
          {cards.map((card) => (
            <article className="review-card" key={card.id}>
              <small>{card.originalSentence}</small>
              <strong>{card.nativeRewrite}</strong>
              <p>{card.koreanExplanation}</p>
              <span>{card.keyExpressions.join(' · ')}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
