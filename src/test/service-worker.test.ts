// public/service-worker.js의 캐싱 전략(install/activate/fetch)을 모의 환경에서 검증
import { beforeEach, describe, expect, it, vi } from 'vitest';
// Vite의 ?raw 임포트로 SW 스크립트 원문을 문자열로 가져온다(node:fs 불필요).
import swSource from '../../public/service-worker.js?raw';

// service-worker.js는 self에 리스너를 등록하는 평범한 스크립트다.
// 모의 self/caches/fetch를 주입해 스크립트를 실행하고, 등록된 핸들러를 회수한다.
type FetchEvent = {
  request: { method: string; url: string };
  respondWith: (value: Promise<Response> | Response) => void;
};

type LifecycleEvent = {
  waitUntil: (value: Promise<unknown>) => void;
};

function loadServiceWorker(env: {
  caches: any;
  fetch: typeof fetch;
}) {
  const listeners = new Map<string, (event: any) => void>();
  const self = {
    caches: env.caches,
    fetch: env.fetch,
    addEventListener(type: string, handler: (event: any) => void) {
      listeners.set(type, handler);
    },
  };

  // 스크립트 본문이 참조하는 전역(self, caches, fetch)을 인자로 주입한다.
  const run = new Function('self', 'caches', 'fetch', swSource) as (
    self: unknown,
    caches: unknown,
    fetch: unknown,
  ) => void;
  run(self, env.caches, env.fetch);

  return listeners;
}

// 최소한의 Cache/CacheStorage 모의 구현
function createCacheStorage(initialKeys: string[] = []) {
  const stores = new Map<string, Map<string, Response>>();
  for (const key of initialKeys) {
    stores.set(key, new Map());
  }
  const addAll = vi.fn(async (_urls: string[]) => undefined);

  const cacheStorage = {
    stores,
    open: vi.fn(async (name: string) => {
      if (!stores.has(name)) stores.set(name, new Map());
      const store = stores.get(name)!;
      return {
        addAll: (urls: string[]) => {
          for (const url of urls) store.set(url, new Response(url));
          return addAll(urls);
        },
      };
    }),
    keys: vi.fn(async () => Array.from(stores.keys())),
    delete: vi.fn(async (name: string) => stores.delete(name)),
    match: vi.fn(async (request: string | { url: string }) => {
      // caches.match는 Request 객체 또는 URL 문자열 모두 받을 수 있다.
      const url = typeof request === 'string' ? request : request.url;
      for (const store of stores.values()) {
        if (store.has(url)) return store.get(url);
      }
      return undefined;
    }),
    _addAllMock: addAll,
  };
  return cacheStorage;
}

describe('service-worker caching strategy', () => {
  let caches: ReturnType<typeof createCacheStorage>;

  beforeEach(() => {
    caches = createCacheStorage();
  });

  it('precaches the app shell on install', async () => {
    const listeners = loadServiceWorker({ caches, fetch: vi.fn() as unknown as typeof fetch });
    const install = listeners.get('install');
    expect(install).toBeDefined();

    let waited: Promise<unknown> | undefined;
    const event: LifecycleEvent = { waitUntil: (v) => (waited = v) };
    install!(event);
    await waited;

    expect(caches.open).toHaveBeenCalledWith('senior-ai-english-coach-v1');
    expect(caches._addAllMock).toHaveBeenCalledWith(['/', '/manifest.webmanifest']);
  });

  it('deletes stale caches on activate, keeping the current version', async () => {
    caches = createCacheStorage(['senior-ai-english-coach-v1', 'old-cache-v0', 'older-cache']);
    const listeners = loadServiceWorker({ caches, fetch: vi.fn() as unknown as typeof fetch });
    const activate = listeners.get('activate');
    expect(activate).toBeDefined();

    let waited: Promise<unknown> | undefined;
    activate!({ waitUntil: (v: Promise<unknown>) => (waited = v) } as LifecycleEvent);
    await waited;

    expect(caches.delete).toHaveBeenCalledWith('old-cache-v0');
    expect(caches.delete).toHaveBeenCalledWith('older-cache');
    expect(caches.delete).not.toHaveBeenCalledWith('senior-ai-english-coach-v1');
  });

  it('serves network response first when online (network-first)', async () => {
    const networkResponse = new Response('fresh');
    const fetchMock = vi.fn(async () => networkResponse) as unknown as typeof fetch;
    const listeners = loadServiceWorker({ caches, fetch: fetchMock });
    const onFetch = listeners.get('fetch');
    expect(onFetch).toBeDefined();

    let responded: Promise<Response> | Response | undefined;
    const event: FetchEvent = {
      request: { method: 'GET', url: '/index.html' },
      respondWith: (v) => (responded = v),
    };
    onFetch!(event);

    expect(fetchMock).toHaveBeenCalled();
    await expect(Promise.resolve(responded)).resolves.toBe(networkResponse);
  });

  it('falls back to cache when the network fails', async () => {
    caches = createCacheStorage();
    caches.stores.set('shell', new Map([['/offline-page', new Response('cached page')]]));
    const fetchMock = vi.fn(async () => {
      throw new Error('offline');
    }) as unknown as typeof fetch;

    const listeners = loadServiceWorker({ caches, fetch: fetchMock });
    const onFetch = listeners.get('fetch');

    let responded: Promise<Response> | Response | undefined;
    onFetch!({
      request: { method: 'GET', url: '/offline-page' },
      respondWith: (v: Promise<Response> | Response) => (responded = v),
    } as FetchEvent);

    const result = await Promise.resolve(responded);
    expect(await (result as Response).text()).toBe('cached page');
  });

  it('falls back to the app shell ("/") when the network fails and the request is uncached', async () => {
    caches = createCacheStorage();
    caches.stores.set('shell', new Map([['/', new Response('app shell')]]));
    const fetchMock = vi.fn(async () => {
      throw new Error('offline');
    }) as unknown as typeof fetch;

    const listeners = loadServiceWorker({ caches, fetch: fetchMock });
    const onFetch = listeners.get('fetch');

    let responded: Promise<Response> | Response | undefined;
    onFetch!({
      request: { method: 'GET', url: '/some/deep/route' },
      respondWith: (v: Promise<Response> | Response) => (responded = v),
    } as FetchEvent);

    const result = await Promise.resolve(responded);
    expect(await (result as Response).text()).toBe('app shell');
  });

  it('ignores non-GET requests (no respondWith)', () => {
    const fetchMock = vi.fn() as unknown as typeof fetch;
    const listeners = loadServiceWorker({ caches, fetch: fetchMock });
    const onFetch = listeners.get('fetch');

    const respondWith = vi.fn();
    onFetch!({ request: { method: 'POST', url: '/api/x' }, respondWith } as unknown as FetchEvent);

    expect(respondWith).not.toHaveBeenCalled();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
