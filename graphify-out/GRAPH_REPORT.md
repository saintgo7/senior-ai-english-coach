# Graph Report - senior-ai-english-coach  (2026-07-03)

## Corpus Check
- 48 files · ~267,275 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 205 nodes · 298 edges · 20 communities (12 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `901f66fd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Practice and Review UI|Practice and Review UI]]
- [[_COMMUNITY_Test Dependencies|Test Dependencies]]
- [[_COMMUNITY_App TypeScript Config|App TypeScript Config]]
- [[_COMMUNITY_Business and Finance Scenarios|Business and Finance Scenarios]]
- [[_COMMUNITY_Node TypeScript Config|Node TypeScript Config]]
- [[_COMMUNITY_AI Coach Service|AI Coach Service]]
- [[_COMMUNITY_Social and IT Scenarios|Social and IT Scenarios]]
- [[_COMMUNITY_General Scenario Types|General Scenario Types]]
- [[_COMMUNITY_Core Project Dependencies|Core Project Dependencies]]
- [[_COMMUNITY_Storage Setup|Storage Setup]]
- [[_COMMUNITY_TSConfig Root|TSConfig Root]]
- [[_COMMUNITY_Service Worker|Service Worker]]
- [[_COMMUNITY_HR Scenarios|HR Scenarios]]
- [[_COMMUNITY_Community Scenarios|Community Scenarios]]
- [[_COMMUNITY_Slate UI Mockup|Slate UI Mockup]]
- [[_COMMUNITY_HTML Entry Point|HTML Entry Point]]
- [[_COMMUNITY_Vite Configuration|Vite Configuration]]
- [[_COMMUNITY_Community 24|Community 24]]

## God Nodes (most connected - your core abstractions)
1. `Scenario` - 26 edges
2. `compilerOptions` - 18 edges
3. `compilerOptions` - 11 edges
4. `STATUS — Senior AI English Coach (Pamout)` - 9 edges
5. `Dev Log #001: 시나리오 500개 확장 및 IT 카테고리 추가` - 9 edges
6. `Project Status - Pamout` - 7 edges
7. `scripts` - 6 edges
8. `PracticeTurnFeedback` - 5 edges
9. `createAiCoachProviderFromConfig()` - 5 edges
10. `useReviewDeck()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Project Status - Pamout` --references--> `App Integration Tests`  [EXTRACTED]
  STATUS.md → src/App.test.tsx
- `Project Status - Pamout` --references--> `Review Deck Hook Tests`  [EXTRACTED]
  STATUS.md → src/hooks/useReviewDeck.test.tsx
- `Project Status - Pamout` --references--> `AI Coach Service`  [EXTRACTED]
  STATUS.md → src/services/aiCoachService.ts
- `Project Status - Pamout` --references--> `AI Coach Service Tests`  [EXTRACTED]
  STATUS.md → src/services/aiCoachService.test.ts
- `Dev Log #001: Scenario Expansion` --references--> `App Integration Tests`  [EXTRACTED]
  docs/dev-log/001_scenario_expansion_500_it_category_20260524_2331.md → src/App.test.tsx

## Import Cycles
- None detected.

## Communities (20 total, 8 thin omitted)

### Community 0 - "Practice and Review UI"
Cohesion: 0.16
Nodes (9): CourseTimer(), NativeRewritePanel(), ReviewDeck(), ReviewCard, NewReviewCard, useReviewDeck(), App(), App Component (+1 more)

### Community 1 - "Test Dependencies"
Cohesion: 0.07
Nodes (26): dependencies, lucide-react, react, react-dom, typescript, vite, @vitejs/plugin-react, devDependencies (+18 more)

### Community 2 - "App TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+11 more)

### Community 3 - "Business and Finance Scenarios"
Cohesion: 0.10
Nodes (24): LessonBrief(), coreScenarios, LessonTerm, PracticeTurnFeedback, Scenario, businessClientScenarios, businessHrScenarios, businessMeetingsScenarios (+16 more)

### Community 4 - "Node TypeScript Config"
Cohesion: 0.15
Nodes (12): compilerOptions, allowSyntheticDefaultImports, lib, module, moduleResolution, noEmit, skipLibCheck, strict (+4 more)

### Community 5 - "AI Coach Service"
Cohesion: 0.14
Nodes (13): Changes Made, Deployment, Dev Log #001: 시나리오 500개 확장 및 IT 카테고리 추가, Files Created, Files Modified, Implementation Approach, Key Issues Fixed, Next Steps (+5 more)

### Community 6 - "Social and IT Scenarios"
Cohesion: 0.15
Nodes (12): /api/coach/practice-turn, App Integration Tests, getScenarioById(), scenarios, Dev Log #001: Scenario Expansion, Review Deck Hook Tests, AI Mode, Commands (+4 more)

### Community 7 - "General Scenario Types"
Cohesion: 0.22
Nodes (6): CategoryFilter, categoryFilters, categoryLabels, ScenarioPicker(), sampleScenarios, ScenarioCategory

### Community 8 - "Core Project Dependencies"
Cohesion: 0.26
Nodes (10): PracticeRoom(), PracticeTurnInput, AiCoachProvider, AiCoachProviderConfig, AiCoachProviderKind, createAiCoachProviderFromConfig(), createAiCoachService(), createHttpAiCoachProvider() (+2 more)

### Community 9 - "Storage Setup"
Cohesion: 0.20
Nodes (9): English Summary, STATUS — Senior AI English Coach (Pamout), 기술 스택 (검증됨), 데이터 구조 참고, 마무리까지 남은 구체 단계, 빌드/테스트 재현 명령, 프로젝트 목적, 현재 상태 — 동작하는 것 (테스트 증거) (+1 more)

## Knowledge Gaps
- **94 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+89 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Project Status - Pamout` connect `Social and IT Scenarios` to `Business and Finance Scenarios`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _94 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Test Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `App TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Business and Finance Scenarios` be split into smaller, more focused modules?**
  _Cohesion score 0.09805735430157261 - nodes in this community are weakly interconnected._
- **Should `AI Coach Service` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._