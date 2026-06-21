# FIX-REPORT — eng-coach (senior-ai-english-coach)

감사 보고서 `_AUDIT_FINDINGS.json`(총 18건)에 대한 스테이징 수정 결과입니다.
브랜치: `claude/edu-staging-fix-2026-06-20` (푸시 안 함).

---

## 수정 완료 (12건)

### HIGH

1. **NativeRewritePanel 하드코딩 문장 렌더링 (BUGS / INCOMPLETE, 2건 동일 코드)**
   `src/components/NativeRewritePanel.tsx`
   `renderOriginal()`/`renderNative()`의 substring 스니핑 분기(`change`/`disagree`/`reschedule`/`see your point`/`aisle seat`)를 전부 제거하고, 학습자 실제 입력 `originalSentence`와 AI 실제 교정 `feedback.nativeRewrite`를 그대로 렌더링하도록 변경.
   - 토큰 단위 diff 하이라이트는 요구되지 않은 추가 기능이라 도입하지 않음(불필요한 복잡도 회피). 두 문자열을 그대로 표시하는 것이 정직한 최소 수정.

### MEDIUM

2. **CourseTimer 가짜 진척/스트릭 데이터 (INCOMPLETE)**
   `src/components/CourseTimer.tsx`
   "7일 연속 학습 중 / 7 Days Streak • 45m left" 등 실제 활동에서 파생되지 않은 조작된 수치를 제거하고, 위젯을 "학습 단계 안내 / Lesson Flow (Sample)"라는 정적 안내 라벨로 교체. 4단계 아젠다는 일반적인 수업 흐름 라벨이라 유지(개인별 조작 지표가 아님).

3. **PWA 오프라인 캐싱 비작동 (INCOMPLETE)**
   `public/service-worker.js`
   fetch 핸들러를 network-first 유지하되, 성공한 GET 응답을 런타임에 `CACHE_NAME`에 적재(cache-on-fetch)하도록 변경. 첫 로드 이후 해시된 JS/CSS 번들·폰트가 캐시되어 오프라인 부팅 신뢰성 향상. (Workbox/vite-plugin-pwa 신규 의존성 도입은 과도하다고 판단해 기존 SW 내 최소 변경으로 처리.)

4. **Web Speech getVoices() 레이스 (BUGS)**
   `src/components/LessonBrief.tsx`
   모듈 레벨 `cachedVoices` 도입 + `speechSynthesis` `voiceschanged` 이벤트 구독으로 보이스 목록 캐시/갱신. `handlePlayAudio`는 캐시가 있으면 사용, 없으면 즉석 `getVoices()` 폴백. 첫 클릭 시 빈 배열로 인해 영어 보이스 선택이 누락되던 문제 완화.

### LOW

5. **음성 입력 버튼 aria-label 누락 (INCOMPLETE의 일부)**
   `src/components/PracticeRoom.tsx` — voice-input 버튼에 `aria-label="음성으로 입력하기"` 추가(권고 항목 중 명확·저위험 부분만 반영).

6. **외부 Google 아바타 URL / 가짜 프로필 (RUNTIME / INCOMPLETE, 2건)**
   `src/App.tsx`
   만료·오프라인에서 깨지는 `lh3.googleusercontent.com` 이미지를 인라인 SVG 이니셜 아바타로 교체(추가 에셋 파일 없이 오프라인 안전). 프로필 레벨 라벨을 "데모 프로필 • Demo Profile"로 변경해 로그인 사용자처럼 보이던 표기 정정.

7. **죽은 브랜드 로고 링크 `href="#"` (INCOMPLETE)**
   `src/App.tsx` — `<a href="#">`를 비대화형 `<span>`으로 변경. (lang/i18n 부분은 권고 자체가 "낮은 우선순위·lang=ko 유지 허용"이라 미변경.)

8. **채팅 메시지 ID 충돌 (BUGS)**
   `src/components/PracticeRoom.tsx` — `Date.now()` 기반 키를 `crypto.randomUUID()`로 교체(이미 useReviewDeck에서 사용 중인 방식).

9. **제출 중복/Enter 우회 가드 없음 (BUGS)**
   `src/components/PracticeRoom.tsx` — `isSubmitting` 상태 추가, `submitTurn` 진입 시 진행 중이면 early-return, `finally`에서 해제. 제출 중 입력창·전송 버튼 disable.

10. **ReviewDeck 표현 문자열을 React key로 사용 (BUGS)**
    `src/components/ReviewDeck.tsx` — `key={expr}` → `key={`${expr}-${i}`}` 복합 키로 변경(중복 표현 시 키 충돌 방지).

11. **기본 시나리오 scenarios[1] 선택 (BUGS)**
    `src/App.tsx` — `scenarios[1]` → `scenarios[0]`. (App.test.tsx는 명시적으로 비즈니스 시나리오 버튼을 클릭하므로 기본 선택값과 무관, 테스트 영향 없음.)

12. **단일 ~1.42MB JS 청크 (RUNTIME)**
    `vite.config.ts` — `build.rollupOptions.output.manualChunks`로 `src/data/scenarios*`를 별도 `scenarios` 청크로 분리.
    - 결과: 엔트리 청크 1,419.78 kB → **210.36 kB** (gzip 435.21 → 66.62 kB). 시니어/저사양 기기의 첫 부팅 다운로드 대폭 축소. (전체 바이트는 유사하나 권고의 "엔트리 번들에서 시나리오 데이터 분리" 목표 달성. 동기 import를 유지해 App/테스트의 비동기 리팩터링 위험 회피.)

13. **npm audit 취약점 (RUNTIME)**
    `package-lock.json` — `npm audit fix` 실행. 5건(high 3, low 2) → **1건(low)**으로 감소. @babel/core·ws·form-data·launch-editor 등 패치 반영.
    - 남은 1건(esbuild 0.27.x dev-server 임의 파일 읽기, Windows 한정·LOW)은 비파괴 수정 경로가 없어(`--force`로도 해결 불가) 미처리. dev 툴링 한정·배포 산출물 무관.

---

## 보류 (defer) (5건)

| 항목 | 사유 |
|---|---|
| **실 AI 백엔드 부재 (MEDIUM, needs-review)** | `/api/coach/practice-turn` 실 백엔드 + 서버사이드 LLM 키 구현이 필요. 라이브 서버·시크릿·외부 권위 시스템 영역으로 스테이징 코드 수정 범위를 벗어남. mock→http 전환 env 플래그도 백엔드가 있어야 의미가 있어 보류. |
| **CSP 미설정 / Google Fonts CDN (LOW, needs-review)** | 권고가 "선택 사항·차단 요인 아님"이며 "구체적 취약점 없음"으로 명시. CSP meta 추가는 폰트/아이콘 로딩을 깨뜨릴 수 있어 런타임(브라우저) 검증이 필수인데, 본 작업은 build+test로만 검증 가능. 스테이징을 깨뜨릴 위험을 피해 보류. |
| **Material Symbols 폰트 오프라인 폴백 (LOW, needs-review, 2건)** | 폰트 자가 호스팅(외부 폰트 바이너리 다운로드 필요) 또는 전 컴포넌트 lucide-react SVG 교체는 surgical 범위를 넘는 광범위 변경·디자인 검토 필요. 권고 중 명확·저위험 항목(voice 버튼 aria-label)만 위 #5로 반영. |
| **esbuild dev-server 취약점 잔여 1건 (LOW)** | 위 #13 참조. 비파괴 수정 경로 없음(Vite 메이저 강제 업그레이드는 위험). |
| **lang=ko / 양국어 i18n lang 속성 (LOW, needs-review의 일부)** | 권고 자체가 "낮은 우선순위, lang=ko를 주 언어로 수용 가능"으로 명시. 제품 i18n 결정 사안이라 미변경. |

---

## 검증 결과

```
npm install   → up to date, 178 packages
npm run build → ✓ built (tsc -b 통과 + vite build 통과)
                entry index-*.js 210.36 kB (gzip 66.62) / scenarios-*.js 1,208.78 kB
npm test      → Test Files 4 passed (4) / Tests 10 passed (10)  (3회 반복 모두 green, ~4.4s)
```

특이사항: 작업 전 `App.test.tsx`가 5s 타임아웃으로 실패하고 있었으나, NativeRewritePanel의 중첩 span 하드코딩 렌더를 제거(수정 #1)하면서 렌더가 단순화되어 타임아웃 내에 안정적으로 통과하게 됨. 전체 스위트 소요시간 9.68s(실패) → 4.4s(전 통과).

> 비고: 작업 시작 시점에 워킹트리에 사전 존재하던 `graphify-out/*` 삭제와 `package-lock.json` 변경이 있었음. `graphify-out/*` 삭제는 본 과제와 무관하여 커밋에 포함하지 않음. `package-lock.json`은 #13 audit fix와 관련되어 커밋에 포함.

---

## Round 2

라운드1 수정을 잠그는 회귀 테스트 추가와, 남은 보류 항목 중 "안전하고 기계적인" 것만 보수적으로 적용했습니다. 소스 코드는 변경하지 않았고(라운드1 수정과 1바이트도 다르지 않음), 추가/변경된 파일은 테스트와 타입 선언뿐입니다.

### 1. 추가한 회귀 테스트 (신규 7개)

각 회귀 테스트는 라운드1 수정 *이전* 코드에서 FAIL, *이후* 코드에서 PASS함을 실제로 검증했습니다(아래 "사전 검증" 참조).

| 테스트 파일 | 잠그는 라운드1 수정 | 사전(pre-fix) 동작 |
|---|---|---|
| `src/components/NativeRewritePanel.test.tsx` (2 회귀 + 1 스모크) | **HIGH**: 하드코딩 substring 분기 제거 → 학습자 실제 입력·AI 실제 교정만 렌더 | "change"가 든 입력을 무관한 "I want to change my appointment time."로 치환, "reschedule"이 든 교정을 하드코딩 문장으로 치환 |
| `src/components/PracticeRoom.test.tsx` (1 회귀) | **BUGS**: in-flight 제출 가드(`isSubmitting`) | 제출 중에도 입력창이 활성·Enter로 중복 턴 발사 가능 |
| `src/App.test.tsx` (기존 파일에 1 회귀 추가) | **BUGS**: 기본 선택 시나리오 `scenarios[1]` → `scenarios[0]` | 첫 유닛(Unit 01)이 아니라 두 번째 유닛이 기본 선택됨 |
| `src/test/service-worker.test.ts` (1 회귀 + 1 가드 스모크) | **MEDIUM(PWA)**: fetch 핸들러 cache-on-fetch | 성공한 GET을 런타임 캐시에 적재하지 않아 해시 번들이 오프라인에서 미캐시 |

- 채점/점수/인증/크레딧/공휴일 산술에 해당하는 코드는 이 앱에 존재하지 않습니다. 대신 "학습자에게 보여지는 내용의 정확성"(자신의 입력·AI 교정)과 "중복 제출(크레딧성) 가드"가 가장 가까운 정합성 위험이라 우선 커버했습니다.
- **`ReviewDeck` key 충돌 수정(`key={expr}` → 복합 key)은 회귀 테스트를 추가하지 않았습니다.** React는 중복 key에서도 초기 렌더 시 두 요소를 모두 그려 경고만 내므로, 정적 렌더 단언으로는 pre-fix에서 FAIL하지 않습니다(재조정 시점의 불안정성은 결정적으로 재현 곤란). "pre-fix에서 반드시 실패" 요건을 충족하지 못하는 테스트를 두는 것은 오해 소지가 있어(§11) 추가하지 않았습니다.
- `src/test/service-worker.test.ts`는 SW 소스를 Vite `?raw` 임포트로 문자열로 읽어 stub된 `self`/`caches`/`fetch` 스코프에서 실행해 검증합니다. 이를 위해 표준 Vite 타입 선언 `src/vite-env.d.ts`(`/// <reference types="vite/client" />`)를 추가했습니다(tsc 빌드가 `?raw` 모듈을 인식하도록).

### 2. 적용한 보류 항목 (안전·기계적)

없음. 검토 결과, 라운드1에서 미적용으로 남은 보류 항목 중 "안전하고 기계적이며 비투기적"인 항목이 추가로 없었습니다.

- **죽은 `#`/Privacy/Terms 링크**: 브랜드 로고 `href="#"`는 라운드1에서 이미 `<span>`으로 수정 완료. 앱 내 Privacy/Terms 링크는 존재하지 않음(스캔 결과 매치는 전부 시나리오 텍스트 본문).
- **서비스워커 해시 에셋 캐싱**: 라운드1에서 이미 cache-on-fetch로 구현 완료(본 라운드에서는 회귀 테스트만 추가).
- **입력 검증**: 빈 입력은 이미 `submitTurn`의 `trim()` early-return + 서비스 정규화로 처리됨. 길이 상한 등 추가 검증은 감사에서 요구하지 않았고 정상 장문을 막을 위험이 있어 투기적이라 미적용(§2).

### 3. 계속 보류 (stillDeferred)

| 항목 | 사유 |
|---|---|
| **PWA manifest icons (`"icons": []`)** | `public/`의 유일한 이미지는 1024×1024 **전체 UI 목업 스크린샷**(`pamout_*_mockup.png`)으로, 런처 아이콘용 브랜드 마크가 아님. 스크린샷을 앱 아이콘으로 등록하면 홈 화면에서 부정확하게 보임. 진짜 아이콘 에셋 생성은 디자인/제품 결정 사안이라 데이터 날조 없이 적용 불가. |
| **실 AI 백엔드 + demo 플래그 UI 노출** | `/api/coach/practice-turn` 실 백엔드·서버사이드 키 필요(라이브 서버/시크릿 영역). "demo임을 UI에 표기"를 위한 `isDemo` 반환 필드 추가는 소비처가 없어 투기적(§2)이고, CourseTimer·프로필 라벨이 이미 "Sample/Demo Profile"로 데모성을 표기함. |
| **CSP / Google Fonts·Material Symbols 오프라인 폴백 / lang=ko / esbuild dev 취약점 잔여 1건** | 라운드1 보류 사유 그대로 유효(브라우저 런타임 검증 필요·외부 폰트 바이너리 다운로드·제품 i18n 결정·비파괴 수정 경로 없음). |
| **ReviewDeck 중복 key 회귀 테스트** | 위 §1 참조 — pre-fix에서 결정적으로 FAIL하는 정적 테스트를 만들 수 없어 보류(수정 자체는 라운드1에 반영됨). |

### 4. 검증 결과 (Round 2)

```
npm install   → up to date
npm run build → ✓ tsc -b 통과 + vite build 통과 (entry index-*.js 210.36 kB / scenarios-*.js 1,208.78 kB 유지)
npm test      → Test Files 7 passed (7) / Tests 17 passed (17)  (라운드1: 4 files / 10 tests → +3 files / +7 tests)
```

**사전(pre-fix) 검증**: 라운드1 수정 직전 소스(`<fix>~1`)를 임시로 되돌려 신규 회귀 테스트를 실행한 결과, 5개 회귀 단언이 모두 FAIL(NativeRewritePanel 2 + PracticeRoom 1 + App 1 + service-worker 1), 비회귀 스모크 3개는 PASS. 검증 후 소스는 원복(라운드1과 1바이트 차이 없음 확인).

> 비고: 소스 파일(`*.tsx`, `*.js`, `*.ts` 구현)은 일절 변경하지 않았습니다. 본 라운드 커밋 대상은 테스트 파일 4개와 `src/vite-env.d.ts`(표준 Vite 타입 선언) 뿐입니다. `graphify-out/*` 삭제는 라운드1과 동일하게 본 과제 무관으로 커밋 미포함.
