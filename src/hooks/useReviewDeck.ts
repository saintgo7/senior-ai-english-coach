import { useCallback, useEffect, useState } from 'react';
import type { ReviewCard } from '../domain/types';
import { uuid } from '../utils/uuid';

const STORAGE_KEY = 'senior-ai-english-review-cards';

export type NewReviewCard = Omit<ReviewCard, 'id' | 'createdAt'>;

function readStoredCards(): ReviewCard[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as ReviewCard[];
  } catch {
    return [];
  }
}

export function useReviewDeck() {
  const [cards, setCards] = useState<ReviewCard[]>(() => readStoredCards());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const addCard = useCallback((card: NewReviewCard) => {
    setCards((current) => [
      {
        ...card,
        id: uuid(),
        createdAt: new Date().toISOString(),
      },
      ...current,
    ]);
  }, []);

  const clearCards = useCallback(() => {
    setCards([]);
  }, []);

  return { cards, addCard, clearCards };
}
