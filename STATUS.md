# STATUS — Senior AI English Coach (Pamout)

> 자동 포트폴리오 스윕(2026-06-14)으로 작성. 본 문서는 검증된 사실만 기록한다. 추정·미확인은 명시한다.

## English Summary

Senior-friendly AI English conversation **PWA MVP** built with React 19 + Vite + TypeScript. Learners pick a real-life scenario, practice one English turn, and receive a coach reply, a native-style rewrite, a Korean explanation, and review-card candidates. The AI layer runs on a mock provider by default, with an HTTP provider stub (`/api/coach/practice-turn`) ready for a real backend (no keys in the browser — by design).

**Verified state (this sweep):**
- `npx vitest run` → **10 tests / 4 files PASS** (verified).
- `npm run build` (`tsc -b && vite build`) → **succeeds**; emits `dist/` (verified). One non-blocking warning: main JS chunk ~1.42 MB (gzip ~435 KB) exceeds Vite's 500 KB advisory.
- Scenario dataset: **496 unique scenario IDs**, no duplicates (verified by grep). Categories: daily 98 / business 71 / travel 71 / it 256.

**What this sweep changed:** added this `STATUS.md` only. No code was modified — the suite was already green and the build clean. Pre-existing uncommitted WIP (scenario expansion to ~496 entries, 19 split data files, mockups, dev-log) is being checkpointed in the sweep commit.

## 프로젝트 목적

시니어(중장년) 학습자를 위한 AI 영어 회화 연습 PWA의 MVP다. 학습자가 실생활 시나리오를 고르면 한 문장씩 연습하고, AI 코치가 답변·원어민식 리라이트·한국어 설명·복습 카드 후보를 돌려준다. 큰 글씨, 한·영 병기 UI 등 시니어 친화 설계가 반영되어 있다.

## 기술 스택 (검증됨)

- React 19 + React DOM 19, Vite 7, TypeScript 5.8.
- 테스트: Vitest 4 + Testing Library + jsdom.
- 아이콘: lucide-react. PWA 셸: `index.html` + `public/manifest.webmanifest` + `public/service-worker.js`.
- `package.json` 스크립트: `dev`(vite), `build`(tsc -b && vite build), `test`(vitest run), `test:watch`.

## 현재 상태 — 동작하는 것 (테스트 증거)

- **테스트 전부 통과**. `npx vitest run` 결과 4파일 10테스트 PASS (이번 스윕에서 직접 실행해 확인했다).
  - `src/App.test.tsx`: 카테고리 표시 → 학습 연습 → 복습 카드 저장까지의 핵심 플로우 통합 테스트 통과.
  - `src/data/scenarios.test.ts`: 4개 카테고리 존재, IT 200개 초과, 모든 IT 시나리오 keyWords≥5·idioms≥3, 전 시나리오 필수 필드·`openingPrompt`에 `?` 포함, ID 조회 통과.
  - `src/hooks/useReviewDeck.test.tsx`, `src/services/aiCoachService.test.ts` 통과.
- **프로덕션 빌드 성공**. `npm run build`로 타입체크 + Vite 번들이 정상 생성된다.
- **시나리오 데이터 정합성**. ID 496개 전부 고유(중복 0), 카테고리 4종(daily/business/travel/it) 모두 채워져 있다.
- **AI 경계 설계**. `aiCoachService.ts`에 mock provider와 HTTP provider(`/api/coach/practice-turn`)가 분리되어 있어, 브라우저에 API 키를 두지 않고 서버 엔드포인트로 교체 가능한 구조다.

## 현재 상태 — 아직 안 되는 것 / 미확인

- **실제 AI 연동 미구현**. 기본은 mock provider다. `createHttpAiCoachProvider`는 호출 코드만 있고 대응하는 백엔드 엔드포인트는 이 저장소에 없다(미확인 아님 — 코드상 부재 확인).
- **번들 크기 경고**. 메인 JS 청크 약 1.42 MB(gzip 435 KB). 시나리오 496개가 전부 한 번들에 인라인되기 때문으로 추정된다(코드 스플리팅/지연 로드 미적용). 동작에는 지장 없으나 시니어 대상 저사양 기기 첫 로딩에는 부담될 수 있다.
- **시나리오 필터/검색 UI 미구현**. 현재 전체 목록만 표시된다(dev-log #001의 Next Steps 기준). 카테고리 배지·검색은 미적용.
- **외부 프로필 이미지 의존**. `App.tsx`가 `lh3.googleusercontent.com`의 고정 아바타 URL을 직접 참조한다(오프라인 PWA 맥락에서 깨질 수 있음 — 동작 영향은 미검증).
- **service-worker 캐싱 전략 미검증**. 파일은 존재하나 실제 오프라인 동작은 이번 스윕에서 실행 확인하지 않았다(미확인).
- **stale 아티팩트**. `test-result.txt`는 과거 실패 시점(App.test.tsx 1건 실패)의 스냅샷이며 현재 상태와 불일치한다. 삭제하지 않고 남겨 둔다(스윕 안전 규칙).

## 마무리까지 남은 구체 단계

1. **백엔드 코치 엔드포인트 구현**: `/api/coach/practice-turn` POST가 `PracticeTurnInput`을 받아 `PracticeTurnFeedback`를 반환하도록 서버 작성. 키는 서버에만 둔다(README 명시).
2. **번들 분할**: 시나리오 데이터를 카테고리별 동적 `import()`로 지연 로드하거나 `manualChunks` 적용해 첫 로딩 경량화.
3. **필터·검색 UI**: 카테고리 필터, 카테고리별 개수 배지, 제목/키워드 검색(dev-log #001 Next Steps).
4. **아바타 로컬화**: 외부 URL 아바타를 로컬/플레이스홀더로 교체해 오프라인 PWA에서도 안전하게.
5. **service-worker 오프라인 동작 검증**: 실제 빌드 산출물로 오프라인 캐싱·재방문 동작 확인.
6. **데이터 검증 자동화**: `openingPrompt`의 `?` 포함 등 데이터 규칙을 Zod 스키마 또는 lint 스크립트로 빌드 시 강제(현재는 테스트로만 검증).
7. (선택) `test-result.txt` 정리 여부를 소유자가 결정.

## 빌드/테스트 재현 명령

```bash
npm install          # 의존성 (node_modules는 이미 존재)
npm test             # vitest run — 4 files / 10 tests PASS (검증됨)
npm run build        # tsc -b && vite build — 성공 (검증됨)
npm run dev          # 로컬 개발 서버
```

## 데이터 구조 참고

- 진입점: `src/data/scenarios.ts` — 코어 인라인 9개 + `src/data/scenarios/` 19개 파일(487개)을 spread로 합쳐 `scenarios` 배열(496개) 노출. `getScenarioById(id)` 헬퍼 제공.
- 타입: `src/domain/types.ts` — `Scenario`, `ScenarioCategory`('daily'|'business'|'travel'|'it'), `PracticeTurnInput`, `PracticeTurnFeedback` 등.
- 시나리오 1건당 `keyWords`(영/한/예문), `idioms`, `nativeExamples`, `koreanExplanation` 보유.

---

본 STATUS는 코드를 변경하지 않고 작성되었으며, 모든 수치(테스트 10/10, 시나리오 496, 카테고리 분포)는 이번 스윕에서 직접 명령을 실행해 확인했다.
