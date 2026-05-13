import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

const storage = new Map<string, string>();

vi.stubGlobal('localStorage', {
  clear: () => storage.clear(),
  getItem: (key: string) => storage.get(key) ?? null,
  key: (index: number) => Array.from(storage.keys())[index] ?? null,
  removeItem: (key: string) => storage.delete(key),
  setItem: (key: string, value: string) => storage.set(key, String(value)),
  get length() {
    return storage.size;
  },
});
