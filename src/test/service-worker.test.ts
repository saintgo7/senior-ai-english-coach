import { describe, expect, it, vi } from 'vitest';
// 라운드1 PWA 수정 회귀 테스트: fetch 핸들러가 성공한 GET 응답을 런타임 캐시에 적재(cache-on-fetch)하는지 검증한다.
// Vite의 ?raw 임포트로 SW 소스를 문자열로 읽어 node 타입 의존 없이 검증한다.
import swSource from '../../public/service-worker.js?raw';

type FetchListener = (event: { request: Request; respondWith: (p: Promise<Response>) => void }) => void;

// Execute the service-worker source with stubbed self/caches/fetch and return
// the registered 'fetch' listener plus the cache spy.
function loadServiceWorker() {
  const listeners: Record<string, FetchListener> = {};
  const cachePut = vi.fn().mockResolvedValue(undefined);
  const cache = { put: cachePut, match: vi.fn().mockResolvedValue(undefined), addAll: vi.fn().mockResolvedValue(undefined) };
  const caches = {
    open: vi.fn().mockResolvedValue(cache),
    match: vi.fn().mockResolvedValue(undefined),
    keys: vi.fn().mockResolvedValue([]),
    delete: vi.fn().mockResolvedValue(undefined),
  };
  const self = {
    addEventListener: (type: string, listener: FetchListener) => {
      listeners[type] = listener;
    },
  };
  const fetchFn = vi.fn();

  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const run = new Function('self', 'caches', 'fetch', swSource);
  run(self, caches, fetchFn);

  return { listeners, caches, cache, cachePut, fetchFn };
}

describe('service-worker cache-on-fetch', () => {
  it('stores a successful GET response in the runtime cache', async () => {
    const sw = loadServiceWorker();

    const request = new Request('https://example.test/assets/index-abc123.js');
    const response = new Response('console.log(1)', { status: 200 });
    sw.fetchFn.mockResolvedValue(response);

    let answered: Promise<Response> | undefined;
    sw.listeners.fetch({ request, respondWith: (p) => { answered = p; } });

    await answered;
    // Let the .then(cache.put) microtask chain settle.
    await Promise.resolve();
    await Promise.resolve();

    // Pre-fix the fetch handler never called cache.put for hashed assets.
    expect(sw.caches.open).toHaveBeenCalledWith('senior-ai-english-coach-v1');
    expect(sw.cachePut).toHaveBeenCalledTimes(1);
    expect(sw.cachePut.mock.calls[0][0]).toBe(request);
  });

  it('does not cache non-GET requests', async () => {
    const sw = loadServiceWorker();

    const request = new Request('https://example.test/api', { method: 'POST' });
    let answered: Promise<Response> | undefined;
    sw.listeners.fetch({ request, respondWith: (p) => { answered = p; } });

    expect(answered).toBeUndefined();
    expect(sw.fetchFn).not.toHaveBeenCalled();
    expect(sw.cachePut).not.toHaveBeenCalled();
  });
});
