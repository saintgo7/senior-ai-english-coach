import type { Scenario } from '../domain/types';

export function LessonBrief({ scenario }: { scenario: Scenario }) {
  return (
    <section className="panel lesson-brief">
      <div>
        <p className="eyebrow">{scenario.durationMinutes}분 코스</p>
        <h2>{scenario.title}</h2>
        <p>{scenario.koreanExplanation}</p>
      </div>
      <div className="term-columns">
        <div>
          <h3>단어</h3>
          {scenario.keyWords.map((term) => (
            <article className="term-card" key={term.english}>
              <strong>{term.english}</strong>
              <span>{term.korean}</span>
              <small>{term.example}</small>
            </article>
          ))}
        </div>
        <div>
          <h3>숙어</h3>
          {scenario.idioms.map((term) => (
            <article className="term-card" key={term.english}>
              <strong>{term.english}</strong>
              <span>{term.korean}</span>
              <small>{term.example}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
