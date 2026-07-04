# Graph Report - .  (2026-07-03)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 213 nodes · 307 edges · 16 communities (12 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `52afaaf9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Scenario Data Models|Scenario Data Models]]
- [[_COMMUNITY_Project Dependencies and Build|Project Dependencies and Build]]
- [[_COMMUNITY_Course UI Components|Course UI Components]]
- [[_COMMUNITY_Practice Session Logic|Practice Session Logic]]
- [[_COMMUNITY_Regression Test Reports|Regression Test Reports]]
- [[_COMMUNITY_TypeScript App Configuration|TypeScript App Configuration]]
- [[_COMMUNITY_Development Logs|Development Logs]]
- [[_COMMUNITY_TypeScript Node Configuration|TypeScript Node Configuration]]
- [[_COMMUNITY_Project Status Report|Project Status Report]]
- [[_COMMUNITY_Project Documentation|Project Documentation]]
- [[_COMMUNITY_Service Worker Testing|Service Worker Testing]]
- [[_COMMUNITY_Storage and Setup|Storage and Setup]]
- [[_COMMUNITY_TypeScript Project References|TypeScript Project References]]
- [[_COMMUNITY_Service Worker Implementation|Service Worker Implementation]]

## God Nodes (most connected - your core abstractions)
1. `Scenario` - 26 edges
2. `compilerOptions` - 18 edges
3. `compilerOptions` - 11 edges
4. `STATUS — Senior AI English Coach (Pamout)` - 9 edges
5. `Dev Log #001: 시나리오 500개 확장 및 IT 카테고리 추가` - 9 edges
6. `PracticeTurnFeedback` - 7 edges
7. `scripts` - 6 edges
8. `FIX-REPORT — eng-coach (senior-ai-english-coach)` - 6 edges
9. `Round 2` - 5 edges
10. `Round 3` - 5 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `useReviewDeck()`  [EXTRACTED]
  src/App.tsx → src/hooks/useReviewDeck.ts

## Import Cycles
- None detected.

## Communities (16 total, 4 thin omitted)

### Community 0 - "Scenario Data Models"
Cohesion: 0.10
Nodes (25): coreScenarios, getScenarioById(), scenarios, LessonTerm, Scenario, ScenarioCategory, businessClientScenarios, businessHrScenarios (+17 more)

### Community 1 - "Project Dependencies and Build"
Cohesion: 0.07
Nodes (26): dependencies, lucide-react, react, react-dom, typescript, vite, @vitejs/plugin-react, devDependencies (+18 more)

### Community 2 - "Course UI Components"
Cohesion: 0.13
Nodes (11): CourseTimer(), cachedVoices, LessonBrief(), ReviewDeck(), categoryLabels, ScenarioPicker, unitLabelStyle, ReviewCard (+3 more)

### Community 3 - "Practice Session Logic"
Cohesion: 0.15
Nodes (10): NativeRewritePanel(), PracticeRoom(), feedback, scenario, PracticeTurnFeedback, PracticeTurnInput, AiCoachProvider, createAiCoachService() (+2 more)

### Community 4 - "Regression Test Reports"
Cohesion: 0.10
Nodes (20): 1. 추가한 회귀 테스트 (신규 7개), 2. 적용한 보류 항목 (안전·기계적), 3. 계속 보류 (stillDeferred), 4. 검증 결과 (Round 2), FIX-REPORT — eng-coach (senior-ai-english-coach), HIGH, HIGH, IME 조합 중 Enter 조기 전송 (EDGECASE MEDIUM) (+12 more)

### Community 5 - "TypeScript App Configuration"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+11 more)

### Community 6 - "Development Logs"
Cohesion: 0.14
Nodes (13): Changes Made, Deployment, Dev Log #001: 시나리오 500개 확장 및 IT 카테고리 추가, Files Created, Files Modified, Implementation Approach, Key Issues Fixed, Next Steps (+5 more)

### Community 7 - "TypeScript Node Configuration"
Cohesion: 0.15
Nodes (12): compilerOptions, allowSyntheticDefaultImports, lib, module, moduleResolution, noEmit, skipLibCheck, strict (+4 more)

### Community 8 - "Project Status Report"
Cohesion: 0.20
Nodes (9): English Summary, STATUS — Senior AI English Coach (Pamout), 기술 스택 (검증됨), 데이터 구조 참고, 마무리까지 남은 구체 단계, 빌드/테스트 재현 명령, 프로젝트 목적, 현재 상태 — 동작하는 것 (테스트 증거) (+1 more)

### Community 9 - "Project Documentation"
Cohesion: 0.50
Nodes (3): AI Mode, Commands, Senior AI English Coach

## Knowledge Gaps
- **100 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Scenario` connect `Scenario Data Models` to `Course UI Components`, `Practice Session Logic`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _100 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Scenario Data Models` be split into smaller, more focused modules?**
  _Cohesion score 0.09805735430157261 - nodes in this community are weakly interconnected._
- **Should `Project Dependencies and Build` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Course UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.12554112554112554 - nodes in this community are weakly interconnected._
- **Should `Regression Test Reports` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `TypeScript App Configuration` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._