# Graph Report - .  (2026-06-14)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 159 nodes · 247 edges · 24 communities (10 shown, 14 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c9b8a571`
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
- [[_COMMUNITY_Health Scenarios|Health Scenarios]]
- [[_COMMUNITY_Interview Scenarios|Interview Scenarios]]
- [[_COMMUNITY_Leadership Scenarios|Leadership Scenarios]]
- [[_COMMUNITY_Product Scenarios|Product Scenarios]]
- [[_COMMUNITY_Emergency Travel Scenarios|Emergency Travel Scenarios]]
- [[_COMMUNITY_Editorial UI Mockup|Editorial UI Mockup]]
- [[_COMMUNITY_Neobrutalism UI Mockup|Neobrutalism UI Mockup]]
- [[_COMMUNITY_Slate UI Mockup|Slate UI Mockup]]
- [[_COMMUNITY_HTML Entry Point|HTML Entry Point]]

## God Nodes (most connected - your core abstractions)
1. `Scenario` - 25 edges
2. `compilerOptions` - 18 edges
3. `compilerOptions` - 11 edges
4. `Project Status - Pamout` - 7 edges
5. `scripts` - 6 edges
6. `PracticeTurnFeedback` - 5 edges
7. `useReviewDeck()` - 4 edges
8. `Dev Log #001: Scenario Expansion` - 4 edges
9. `scenarios` - 3 edges
10. `ReviewCard` - 3 edges

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

## Communities (24 total, 14 thin omitted)

### Community 0 - "Practice and Review UI"
Cohesion: 0.11
Nodes (15): CourseTimer(), NativeRewritePanel(), PracticeRoom(), ReviewDeck(), categoryLabels, ScenarioPicker(), PracticeTurnFeedback, PracticeTurnInput (+7 more)

### Community 1 - "Test Dependencies"
Cohesion: 0.10
Nodes (19): devDependencies, jsdom, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, @types/node, @types/react, @types/react-dom (+11 more)

### Community 2 - "App TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, allowSyntheticDefaultImports, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, jsx, lib (+11 more)

### Community 3 - "Business and Finance Scenarios"
Cohesion: 0.21
Nodes (7): coreScenarios, businessClientScenarios, businessMeetingsScenarios, dailyFinanceScenarios, itClientScenarios, itDevopsScenarios, travelTransitScenarios

### Community 4 - "Node TypeScript Config"
Cohesion: 0.15
Nodes (12): compilerOptions, allowSyntheticDefaultImports, lib, module, moduleResolution, noEmit, skipLibCheck, strict (+4 more)

### Community 5 - "AI Coach Service"
Cohesion: 0.20
Nodes (10): /api/coach/practice-turn, App Integration Tests, getScenarioById(), scenarios, Dev Log #001: Scenario Expansion, Review Deck Hook Tests, Senior AI English Coach, AI Coach Service (+2 more)

### Community 6 - "Social and IT Scenarios"
Cohesion: 0.22
Nodes (5): LessonBrief(), Scenario, dailySocialScenarios, itCodeScenarios, itRemoteScenarios

### Community 7 - "General Scenario Types"
Cohesion: 0.22
Nodes (5): LessonTerm, ScenarioCategory, itAgileScenarios, itIncidentScenarios, travelCultureScenarios

### Community 8 - "Core Project Dependencies"
Cohesion: 0.29
Nodes (7): dependencies, lucide-react, react, react-dom, typescript, vite, @vitejs/plugin-react

## Knowledge Gaps
- **68 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+63 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Project Status - Pamout` connect `AI Coach Service` to `Business and Finance Scenarios`, `General Scenario Types`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `Scenario` connect `Social and IT Scenarios` to `Practice and Review UI`, `Business and Finance Scenarios`, `General Scenario Types`, `HR Scenarios`, `Community Scenarios`, `Health Scenarios`, `Interview Scenarios`, `Leadership Scenarios`, `Product Scenarios`, `Emergency Travel Scenarios`?**
  _High betweenness centrality (0.018) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _68 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Practice and Review UI` be split into smaller, more focused modules?**
  _Cohesion score 0.11330049261083744 - nodes in this community are weakly interconnected._
- **Should `Test Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `App TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._