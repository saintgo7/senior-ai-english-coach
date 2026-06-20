// ScenarioPicker의 카테고리·키워드 필터 동작 검증
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ScenarioPicker } from './ScenarioPicker';
import type { Scenario } from '../domain/types';

function makeScenario(overrides: Partial<Scenario>): Scenario {
  return {
    id: 'id',
    category: 'daily',
    title: '제목',
    durationMinutes: 20,
    difficulty: 'easy',
    learnerGoal: '목표',
    coachRole: 'coach',
    openingPrompt: 'Hello?',
    keyWords: [{ english: 'word', korean: '단어', example: 'A word.' }],
    idioms: [],
    nativeExamples: [],
    koreanExplanation: '설명',
    ...overrides,
  };
}

const sampleScenarios: Scenario[] = [
  makeScenario({
    id: 'daily-clinic',
    category: 'daily',
    title: '병원 예약 변경하기',
    keyWords: [{ english: 'appointment', korean: '예약', example: 'I have an appointment.' }],
  }),
  makeScenario({
    id: 'business-disagree',
    category: 'business',
    title: '회의에서 정중하게 다른 의견 말하기',
    keyWords: [{ english: 'perspective', korean: '관점', example: 'From my perspective.' }],
  }),
  makeScenario({
    id: 'travel-checkin',
    category: 'travel',
    title: '공항 체크인에서 요청하기',
    keyWords: [{ english: 'boarding pass', korean: '탑승권', example: 'My boarding pass.' }],
  }),
];

describe('ScenarioPicker filter UI', () => {
  it('renders all scenarios by default', () => {
    render(<ScenarioPicker scenarios={sampleScenarios} selectedId="daily-clinic" onSelect={vi.fn()} />);

    expect(screen.getByText('병원 예약 변경하기')).toBeInTheDocument();
    expect(screen.getByText('회의에서 정중하게 다른 의견 말하기')).toBeInTheDocument();
    expect(screen.getByText('공항 체크인에서 요청하기')).toBeInTheDocument();
    expect(screen.getByText('3개 과정 • 3 units')).toBeInTheDocument();
  });

  it('filters by category when a filter button is pressed', async () => {
    const user = userEvent.setup();
    render(<ScenarioPicker scenarios={sampleScenarios} selectedId="daily-clinic" onSelect={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: '비즈니스 • Business' }));

    expect(screen.getByText('회의에서 정중하게 다른 의견 말하기')).toBeInTheDocument();
    expect(screen.queryByText('병원 예약 변경하기')).not.toBeInTheDocument();
    expect(screen.queryByText('공항 체크인에서 요청하기')).not.toBeInTheDocument();
    expect(screen.getByText('1개 과정 • 1 units')).toBeInTheDocument();
  });

  it('filters by Korean title keyword', async () => {
    const user = userEvent.setup();
    render(<ScenarioPicker scenarios={sampleScenarios} selectedId="daily-clinic" onSelect={vi.fn()} />);

    await user.type(screen.getByLabelText('시나리오 검색'), '공항');

    expect(screen.getByText('공항 체크인에서 요청하기')).toBeInTheDocument();
    expect(screen.queryByText('병원 예약 변경하기')).not.toBeInTheDocument();
  });

  it('filters by English keyWord, case-insensitively', async () => {
    const user = userEvent.setup();
    render(<ScenarioPicker scenarios={sampleScenarios} selectedId="daily-clinic" onSelect={vi.fn()} />);

    await user.type(screen.getByLabelText('시나리오 검색'), 'APPOINTMENT');

    expect(screen.getByText('병원 예약 변경하기')).toBeInTheDocument();
    expect(screen.queryByText('회의에서 정중하게 다른 의견 말하기')).not.toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup();
    render(<ScenarioPicker scenarios={sampleScenarios} selectedId="daily-clinic" onSelect={vi.fn()} />);

    await user.type(screen.getByLabelText('시나리오 검색'), 'zzzznomatch');

    expect(screen.getByText('검색 결과가 없습니다. / No matching scenarios.')).toBeInTheDocument();
    expect(screen.getByText('0개 과정 • 0 units')).toBeInTheDocument();
  });

  it('combines category and keyword filters', async () => {
    const user = userEvent.setup();
    render(<ScenarioPicker scenarios={sampleScenarios} selectedId="daily-clinic" onSelect={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: '여행 영어 • Travel' }));
    await user.type(screen.getByLabelText('시나리오 검색'), '체크인');

    expect(screen.getByText('공항 체크인에서 요청하기')).toBeInTheDocument();
    expect(screen.getByText('1개 과정 • 1 units')).toBeInTheDocument();
  });
});
