import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useReviewDeck } from './useReviewDeck';

describe('useReviewDeck', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves a review card to localStorage', () => {
    const { result } = renderHook(() => useReviewDeck());

    act(() => {
      result.current.addCard({
        scenarioId: 'business-polite-disagreement',
        originalSentence: 'I disagree your idea.',
        nativeRewrite: 'I see your point, but I have a slightly different view.',
        koreanExplanation: '상대 의견을 인정한 뒤 다른 관점을 말합니다.',
        keyExpressions: ['I see your point'],
      });
    });

    expect(result.current.cards).toHaveLength(1);
    expect(JSON.parse(localStorage.getItem('senior-ai-english-review-cards') ?? '[]')).toHaveLength(1);
  });

  it('clears all review cards', () => {
    const { result } = renderHook(() => useReviewDeck());

    act(() => {
      result.current.addCard({
        scenarioId: 'travel-airport-checkin',
        originalSentence: 'I want aisle seat.',
        nativeRewrite: 'Could I have an aisle seat, if possible?',
        koreanExplanation: '정중한 요청 표현입니다.',
        keyExpressions: ['aisle seat'],
      });
      result.current.clearCards();
    });

    expect(result.current.cards).toHaveLength(0);
    expect(localStorage.getItem('senior-ai-english-review-cards')).toBe('[]');
  });
});
