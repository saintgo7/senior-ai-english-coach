import type { Scenario } from '../domain/types';

const categoryLabels = {
  daily: '일상',
  business: '비즈니스',
  travel: '여행',
} as const;

export function ScenarioPicker({
  scenarios,
  selectedId,
  onSelect,
}: {
  scenarios: Scenario[];
  selectedId: string;
  onSelect: (scenario: Scenario) => void;
}) {
  return (
    <section className="panel" aria-label="상황 선택">
      <h2>상황별 코스</h2>
      <div className="scenario-grid">
        {scenarios.map((scenario) => (
          <button
            className={`scenario-card ${selectedId === scenario.id ? 'selected' : ''}`}
            key={scenario.id}
            onClick={() => onSelect(scenario)}
            type="button"
          >
            <span>{categoryLabels[scenario.category]}</span>
            <strong>{scenario.title}</strong>
            <small>{scenario.learnerGoal}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
