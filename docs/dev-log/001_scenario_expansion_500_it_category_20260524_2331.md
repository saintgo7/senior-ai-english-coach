# Dev Log #001: 시나리오 500개 확장 및 IT 카테고리 추가

**Date**: 2026-05-24 23:31
**Author**: saintgo7
**Phase**: 콘텐츠 확장 / 데이터 레이어

## Summary

기존 3개였던 샘플 시나리오를 ~496개로 확장했다. `it` 카테고리를 신규 추가하고, 19개 분리 파일로 나눠 800줄 파일 제한을 준수하면서 모든 시나리오를 앱에 연결했다.

## Previous Session Review

첫 세션 — 없음.

## Changes Made

### Files Modified

- `src/domain/types.ts`: `ScenarioCategory`에 `'it'` 추가
- `src/components/ScenarioPicker.tsx`: IT 카테고리 라벨 `'IT 비즈니스 • Tech'` 추가
- `src/data/scenarios.ts`: 인라인 3+6개 시나리오 → 19개 파일 import + spread로 전면 재작성 (~496개 노출)
- `src/data/scenarios.test.ts`: IT 카운트 테스트 `exactly 6` → `> 200` 로 업데이트
- `src/App.test.tsx`: `getByText` → `getAllByText` (카테고리 배지가 여러 카드에 중복 출력되어 단일 매칭 불가)
- `src/data/scenarios/it-interview.ts`: 438번째 줄 `koreanExplanation` 단일 인용부호 이스케이프 미처리 → 템플릿 리터럴로 수정
- `src/data/scenarios/daily-community.ts`: `openingPrompt` 5개에 `?` 누락 → 자연스러운 질문 추가

### Files Created

`src/data/scenarios/` 디렉토리 신규 생성 (19개 파일):

| 파일 | export 이름 | 시나리오 수 |
|------|------------|------------|
| `daily-health.ts` | `dailyHealthScenarios` | 25 |
| `daily-finance.ts` | `dailyFinanceScenarios` | 23 |
| `daily-community.ts` | `dailyCommunityScenarios` | 24 |
| `daily-social.ts` | `dailySocialScenarios` | 25 |
| `business-meetings.ts` | `businessMeetingsScenarios` | 25 |
| `business-client.ts` | `businessClientScenarios` | 25 |
| `business-hr.ts` | `businessHrScenarios` | 20 |
| `travel-transit.ts` | `travelTransitScenarios` | 25 |
| `travel-culture.ts` | `travelCultureScenarios` | 25 |
| `travel-emergency.ts` | `travelEmergencyScenarios` | 20 |
| `it-agile.ts` | `itAgileScenarios` | 40 |
| `it-code.ts` | `itCodeScenarios` | 40 |
| `it-client.ts` | `itClientScenarios` | 30 |
| `it-incident.ts` | `itIncidentScenarios` | 20 |
| `it-remote.ts` | `itRemoteScenarios` | 25 |
| `it-interview.ts` | `itInterviewScenarios` | 20 |
| `it-leadership.ts` | `itLeadershipScenarios` | 25 |
| `it-product.ts` | `itProductScenarios` | 30 |
| `it-devops.ts` | `itDevopsScenarios` | 20 |

**파일당 소계**: daily 97 / business 70 / travel 70 / IT 신규 250
**전체**: 코어 인라인 9 + 신규 파일 487 = **~496개**

## Technical Details

### Key Issues Fixed

1. **`it-interview.ts` 438번째 줄 parse 오류**
   - 원인: `'...'누가 옳았는가'...'` — 단일 인용부호 중첩
   - `tsc --noEmit`은 통과, esbuild(Vitest)는 파싱 실패
   - 수정: 외부 delimiter를 백틱(template literal)으로 변경

2. **`openingPrompt` `?` 누락 (5개)**
   - 테스트 규칙: 모든 `openingPrompt`는 `?`를 포함해야 함
   - `daily-community.ts` 5개 프롬프트에 자연스러운 질문 문장 추가

3. **`App.test.tsx` 다중 매칭 오류**
   - 원인: 카드가 100개 이상 렌더되면 카테고리 배지가 수십 개 중복 출력
   - `getByText` → `getAllByText(...)[0]` 로 교체

### Implementation Approach

- **파일 분리 전략**: 시나리오 × 평균 30줄 = ~15,000줄. 800줄 상한 준수를 위해 19개 파일로 분산.
- **IT 하위 도메인**: Agile, Code Review, Client, Incident, Remote, Interview, Leadership, Product, DevOps — 실제 시니어 개발자 업무 맥락 기반 설계.
- **데이터 품질**: 각 시나리오마다 `keyWords` 5개, `idioms` 3개, `nativeExamples` 4개, 한국어 맥락 설명 필수.
- **LSP vs esbuild**: LSP가 `Korean:` capital-K 오류를 반복 표시했으나 `tsc --noEmit` 기준으로 false positive 판단. 실제 오류는 esbuild parse error로만 검출됨.

## Test Results

```
Test Files  4 passed (4)
     Tests  10 passed (10)
  Duration  3.74s
```

모든 기존 테스트 통과. 신규 테스트 추가:
- `'has more than 200 it-category scenarios'` — pass
- `'every it scenario has at least 5 keyWords and 3 idioms'` — pass

## Deployment

미배포. 로컬 개발 상태.

## Next Steps

- [ ] 시나리오 카테고리 필터 UI 추가 (현재 전체 목록만 표시)
- [ ] 각 카테고리별 시나리오 수 배지 표시
- [ ] 시나리오 검색 기능 (title/keyword 기준)
- [ ] IT 카테고리 아이콘 / 색상 차별화
- [ ] `daily-finance.ts` / `daily-community.ts` 시나리오 수 (23, 24개)를 25개로 보완
- [ ] 전체 `openingPrompt` `?` 포함 여부 자동 검증 스크립트 또는 Zod 스키마 적용 검토
- [ ] 프로덕션 빌드 확인 (`npm run build`)

## Related

- Branch: `codex/senior-ai-english-coach`
- Base commits: `03d181c` (handoff notes) — 이번 세션 커밋 미생성
