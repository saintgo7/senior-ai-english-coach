import { describe, expect, it } from 'vitest';
import { scenarios, getScenarioById } from './scenarios';

describe('scenarios', () => {
  it('includes daily, business, and travel scenario categories', () => {
    expect(new Set(scenarios.map((scenario) => scenario.category))).toEqual(
      new Set(['daily', 'business', 'travel']),
    );
  });

  it('gives every scenario words, idioms, coach role, and a learner prompt', () => {
    for (const scenario of scenarios) {
      expect(scenario.title).toBeTruthy();
      expect(scenario.coachRole).toBeTruthy();
      expect(scenario.learnerGoal).toBeTruthy();
      expect(scenario.keyWords.length).toBeGreaterThanOrEqual(3);
      expect(scenario.idioms.length).toBeGreaterThanOrEqual(2);
      expect(scenario.openingPrompt).toContain('?');
    }
  });

  it('finds a scenario by id', () => {
    expect(getScenarioById('business-polite-disagreement')?.category).toBe('business');
  });
});
