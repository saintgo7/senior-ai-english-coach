import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('shows categories, lets a learner practice, and saves a review card', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getAllByText('일상 회화 • Daily')[0]).toBeInTheDocument();
    expect(screen.getAllByText('비즈니스 • Business')[0]).toBeInTheDocument();
    expect(screen.getAllByText('여행 영어 • Travel')[0]).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /회의에서 정중하게 다른 의견 말하기/ }));
    await user.type(screen.getByLabelText('연습 문장 입력'), 'I disagree your idea.');
    await user.click(screen.getByRole('button', { name: 'AI 코치에게 보내기' }));

    expect(await screen.findByText((_, element) => element?.tagName === 'P' && element?.textContent?.trim() === 'I see your point, but I have a slightly different view.')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /복습 카드/ }));
    expect(screen.getByText('저장된 복습 카드 1개 • Journal (1)')).toBeInTheDocument();
  });
});
