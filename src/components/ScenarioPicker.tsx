// 시나리오 목록을 카테고리·키워드로 필터링해 보여주는 선택 컴포넌트
import { useMemo, useState } from 'react';
import type { Scenario, ScenarioCategory } from '../domain/types';

const categoryLabels = {
  daily: '일상 회화 • Daily',
  business: '비즈니스 • Business',
  travel: '여행 영어 • Travel',
  it: 'IT 비즈니스 • Tech',
} as const;

type CategoryFilter = ScenarioCategory | 'all';

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: '전체 • All' },
  { value: 'daily', label: categoryLabels.daily },
  { value: 'business', label: categoryLabels.business },
  { value: 'travel', label: categoryLabels.travel },
  { value: 'it', label: categoryLabels.it },
];

// 제목·학습목표·키워드(영/한)에서 검색어를 찾는다.
function matchesKeyword(scenario: Scenario, keyword: string): boolean {
  const haystack = [
    scenario.title,
    scenario.learnerGoal,
    ...scenario.keyWords.flatMap((term) => [term.english, term.korean]),
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(keyword);
}

export function ScenarioPicker({
  scenarios,
  selectedId,
  onSelect,
}: {
  scenarios: Scenario[];
  selectedId: string;
  onSelect: (scenario: Scenario) => void;
}) {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [keyword, setKeyword] = useState('');

  const filteredScenarios = useMemo(() => {
    const trimmedKeyword = keyword.trim().toLowerCase();
    return scenarios.filter((scenario) => {
      if (categoryFilter !== 'all' && scenario.category !== categoryFilter) {
        return false;
      }
      if (trimmedKeyword && !matchesKeyword(scenario, trimmedKeyword)) {
        return false;
      }
      return true;
    });
  }, [scenarios, categoryFilter, keyword]);

  return (
    <section className="scenario-picker-section" aria-label="상황 선택">
      <h2 className="editorial-section-title">
        <span>Syllabus</span>
        학습 과정 선택
      </h2>

      <div className="scenario-filter-bar" role="group" aria-label="카테고리 필터">
        {categoryFilters.map((filter) => (
          <button
            className={`scenario-filter-btn ${categoryFilter === filter.value ? 'active' : ''}`}
            key={filter.value}
            onClick={() => setCategoryFilter(filter.value)}
            type="button"
            aria-pressed={categoryFilter === filter.value}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <input
        className="scenario-search-input"
        type="search"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="제목·키워드로 검색 / Search by title or keyword..."
        aria-label="시나리오 검색"
      />

      <p className="scenario-result-count" aria-live="polite">
        {filteredScenarios.length}개 과정 • {filteredScenarios.length} units
      </p>

      <div className="scenario-grid">
        {filteredScenarios.length === 0 ? (
          <p className="scenario-empty">검색 결과가 없습니다. / No matching scenarios.</p>
        ) : (
          filteredScenarios.map((scenario, index) => {
            const numStr = String(index + 1).padStart(2, '0');
            return (
              <button
                className={`scenario-card ${selectedId === scenario.id ? 'selected' : ''}`}
                key={scenario.id}
                onClick={() => onSelect(scenario)}
                type="button"
              >
                <div className="scenario-meta">
                  <span style={{ fontFamily: 'Lora', fontWeight: 700, fontSize: '12px', marginRight: '4px' }}>
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
          })
        )}
      </div>
    </section>
  );
}
