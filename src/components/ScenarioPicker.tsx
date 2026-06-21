import { memo } from 'react';
import type { Scenario } from '../domain/types';

const categoryLabels = {
  daily: '일상 회화 • Daily',
  business: '비즈니스 • Business',
  travel: '여행 영어 • Travel',
  it: 'IT 비즈니스 • Tech',
} as const;

// Hoisted so the per-card style object is not re-created on every render of
// every one of the ~495 scenario buttons.
const unitLabelStyle = { fontFamily: 'Lora', fontWeight: 700, fontSize: '12px', marginRight: '4px' } as const;

function ScenarioPickerInner({
  scenarios,
  selectedId,
  onSelect,
}: {
  scenarios: Scenario[];
  selectedId: string;
  onSelect: (scenario: Scenario) => void;
}) {
  return (
    <section className="scenario-picker-section" aria-label="상황 선택">
      <h2 className="editorial-section-title">
        <span>Syllabus</span>
        학습 과정 선택
      </h2>
      <div className="scenario-grid">
        {scenarios.map((scenario, index) => {
          const numStr = String(index + 1).padStart(2, '0');
          return (
            <button
              className={`scenario-card ${selectedId === scenario.id ? 'selected' : ''}`}
              key={scenario.id}
              onClick={() => onSelect(scenario)}
              type="button"
            >
              <div className="scenario-meta">
                <span style={unitLabelStyle}>
                  Unit {numStr}
                </span>
                <span className={`badge category-${scenario.category}`}>
                  {categoryLabels[scenario.category]}
                </span>
                <span className={`badge difficulty-${scenario.difficulty}`}>
                  {scenario.difficulty === 'easy' ? 'Beginner • 초급' : 'Intermediate • 중급'}
                </span>
              </div>
              <strong className="scenario-title">
                {scenario.title}
              </strong>
              <small className="scenario-goal">
                Goal: {scenario.learnerGoal}
              </small>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// Memoized so selecting a scenario only re-renders the list when its props
// (scenarios/selectedId) actually change, not on unrelated App re-renders.
export const ScenarioPicker = memo(ScenarioPickerInner);
