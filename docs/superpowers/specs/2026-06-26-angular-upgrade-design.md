# Angular v14 → v20 Progressive Upgrade

**Date:** 2026-06-26  
**Project:** astral-accessibility (Angular Elements accessibility widget)  
**Current version:** Angular 14.x  
**Target version:** Angular 20.x  

---

## Upgrade Path Overview

Six stacked PRs, each branching from the previous, one major version per PR. Each PR must have green Karma unit tests and Cypress e2e tests before the next PR stacks.

| PR | Version jump | TypeScript | Zone.js | Key theme |
|----|-------------|------------|---------|-----------|
| 1 | 14 → 15 | 4.7 → 4.8 | 0.11 → 0.12 | Standalone cleanup, `inject()`, required inputs |
| 2 | 15 → 16 | 4.8 → 5.0 | 0.12 → 0.13 | Signals (dev preview), `DestroyRef`, typed forms |
| 3 | 16 → 17 | 5.0 → 5.2 | 0.13 → 0.14 | Drop `ngx-build-plus`, esbuild builder, `@if`/`@for` control flow |
| 4 | 17 → 18 | 5.2 → 5.4 | 0.14 | Signal inputs/outputs/queries replace decorators |
| 5 | 18 → 19 | 5.4 → 5.6 | 0.14 | `standalone: true` becomes implicit, `linkedSignal` |
| 6 | 19 → 20 | 5.6 → 5.8 | 0.15 | Stable signals ecosystem, Angular 20 stable features |

---

## Build System Migration (PR 3)

This is the highest-risk change in the upgrade.

### What changes

`ngx-build-plus:browser` is replaced by `@angular/build:application` (native esbuild builder). The `ngx-build-plus` package is removed entirely.

Key `angular.json` changes:
- `builder`: `ngx-build-plus:browser` → `@angular/build:application`
- `main` option renamed to `browser`
- `singleBundle: true` removed (no longer needed — see below)
- `polyfills` becomes an inline array `[]`
- `serve` builder: `@angular-devkit/build-angular:dev-server` → `@angular/build:dev-server`

### Single-bundle guarantee

Zone.js is already a static import in `main.ts`, so esbuild bundles it inline. With no lazy routes and no `@defer` blocks at this version, esbuild produces a single `browser/main.js` chunk — same result as `--single-bundle` today, no concatenation script needed.

### Output path shift

The application builder writes to a `browser/` subdirectory:

- Before: `dist/astral-accessibility-angular-output/main.js`
- After: `dist/astral-accessibility-angular-output/browser/main.js`

The `build:lib` script, the demo server `lite-server-config.json`, and any demo HTML referencing the bundle path must be updated in PR 3.

### polyfills.ts deleted

`polyfills.ts` is deleted in PR 3 — it is redundant once zone.js lives in `main.ts` and the new builder does not reference it. The `tsconfig.app.json` `files` array is updated to remove the reference.

---

## Feature Adoption Per Version

Each PR runs `ng update @angular/core @angular/cli` for that version and applies all migration schematics before the manual feature adoption work below.

### PR 1 — v15
- Replace constructor injection with `inject()` in all components and services
- Add `required: true` to `@Input()` decorators where inputs are mandatory
- Delete `AstralAccessibilityModule` — it only wraps the already-standalone root component; nothing consumes it as a module

### PR 2 — v16
- Introduce `signal()` and `computed()` for local component state (toggle open/closed, active feature flags)
- Replace `Subject`-based unsubscription with `takeUntilDestroyed()` via `DestroyRef`

### PR 3 — v17
- Run the built-in migration `ng generate @angular/core:control-flow` to convert all `*ngIf` → `@if`, `*ngFor` → `@for`, `*ngSwitch` → `@switch` across every template

### PR 4 — v18
- Replace `@Input()` decorators with `input()` / `input.required()` signal inputs
- Replace `@Output()` + `EventEmitter` with `output()`
- Replace `@ViewChild()` / `@ContentChild()` with `viewChild()` / `contentChild()` signal queries

### PR 5 — v19
- Remove `standalone: true` from all `@Component` and `@Directive` decorators (now implicit default)
- Introduce `linkedSignal()` anywhere a signal is derived from another but also needs to be independently writable

### PR 6 — v20
- Apply `ng update` schematics
- Adopt stable APIs that landed in v20 and are applicable to this project, confirmed from the Angular v20 changelog at implementation time

---

## Testing Strategy

### Unit tests (Karma/Jasmine)
`ng update` schematics handle most test breakage automatically. Manual work per PR:
- PRs 1–3: Mostly automatic via schematics; verify `TestBed` API usage after each migration
- PRs 4–5: Signal inputs interact differently with `TestBed` — tests that construct components with `new` must be updated to use `TestBed` and `componentRef.setInput()`

### Cypress e2e
The widget's external API (`initializeAstral`, custom element registration, `astralSetLanguage`) does not change across any of these upgrades. Cypress tests should pass without modification at each step, except PR 3 where the demo server JS reference must be updated to the new output path before running the suite.

### CI gate
Each PR runs `ng test --watch=false` and the Cypress suite. No PR merges until both pass.

---

## PR Structure

```
dev
 └── upgrade/angular-v15
      └── upgrade/angular-v16
           └── upgrade/angular-v17
                └── upgrade/angular-v18
                     └── upgrade/angular-v19
                          └── upgrade/angular-v20
```

Each PR's base is the previous upgrade branch. Reviewers see only the delta for that one version jump.

PR title convention: `feat: upgrade Angular to v{N}`  
PR description lists: packages bumped, breaking changes fixed, new features adopted.

When PRs merge, they merge in order. Once v15 merges to `dev`, v16's base rebases to `dev`, and so on.
