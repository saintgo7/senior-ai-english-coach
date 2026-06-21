// 라운드3 EDGECASE 수정 회귀 테스트: crypto.randomUUID가 없는(비보안 HTTP) 환경에서도 uuid()가 throw 없이 UUID를 반환하는지 검증한다.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { uuid } from './uuid';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('uuid fallback', () => {
  it('returns a UUID via crypto.randomUUID when available', () => {
    const id = uuid();
    expect(id).toMatch(/[0-9a-f-]{36}/i);
  });

  it('does not throw and returns a unique id when crypto.randomUUID is missing (non-secure HTTP context)', () => {
    // Simulate a plain-HTTP origin where randomUUID is undefined but
    // getRandomValues is still available.
    vi.stubGlobal('crypto', {
      getRandomValues: (arr: Uint8Array) => {
        for (let i = 0; i < arr.length; i += 1) arr[i] = i;
        return arr;
      },
    });

    let a: string | undefined;
    let b: string | undefined;
    expect(() => {
      a = uuid();
      b = uuid();
    }).not.toThrow();

    expect(a).toBeTruthy();
    // RFC4122 v4 shape: version nibble 4, variant nibble 8-b.
    expect(a).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(b).toBeTruthy();
  });

  it('still returns an id when neither randomUUID nor getRandomValues exist', () => {
    vi.stubGlobal('crypto', {});
    expect(() => uuid()).not.toThrow();
    expect(uuid()).toBeTruthy();
  });
});
