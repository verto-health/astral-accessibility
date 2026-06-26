# Angular v14 → v20 Progressive Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Angular from v14 to v20 via six stacked PRs (one major version each), adopting new Angular APIs at each step, with green tests at every stage.

**Architecture:** Six sequential PRs stacked on each other (`upgrade/angular-v15` → v16 → v17 → v18 → v19 → v20). Each PR runs `ng update` schematics, fixes breaking changes, adopts new Angular features for that version, and must pass all Karma unit tests and Cypress e2e tests before the next PR stacks. The biggest structural change is PR3, which swaps `ngx-build-plus:browser` for `@angular/build:application` (esbuild).

**Tech Stack:** Angular, TypeScript, Zone.js, Karma/Jasmine, Cypress, `ngx-build-plus` (v15–16 only), `@angular/build:application` (v17+), `yarn`

## Global Constraints

- One PR per major Angular version; each PR branches from the previous upgrade branch
- Both `ng test --watch=false` and Cypress suite must pass before moving to next PR
- Package manager: yarn — always commit updated `yarn.lock`
- PR title format: `feat: upgrade Angular to v{N}`
- Stacked base branches: each PR targets the previous upgrade branch, not `dev`
- Target end state: Angular 20, TypeScript ~5.8, zone.js ~0.15

---

### Task 1: PR1 — Angular v15

**Files:**
- Modify: `package.json`
- Modify: `projects/astral-accessibility/src/lib/astral-accessibility.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/contrast.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/saturate.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/text-size.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/text-spacing.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/line-height.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/screen-reader.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/screen-mask.component.ts`
- Modify: `projects/astral-accessibility/src/lib/util/astral-checksvg.component.ts`
- Delete: `projects/astral-accessibility/src/lib/astral-accessibility.module.ts`

**Interfaces:**
- Produces: all constructor injection replaced with `inject()` field declarations; `AstralAccessibilityModule` deleted; `AstralCheckmarkSvgComponent.isActive` marked `@Input({ required: true })`

- [ ] **Step 1: Create branch**

```bash
git checkout dev
git checkout -b upgrade/angular-v15
```

- [ ] **Step 2: Run ng update for Angular v15**

```bash
npx @angular/cli@15 update @angular/core@15 @angular/cli@15 --allow-dirty --force
```

Expected: schematics run, `package.json` and `yarn.lock` updated. All `@angular/*` packages move to v15.

- [ ] **Step 3: Update remaining packages**

```bash
yarn add ngx-build-plus@15 --dev
yarn add ng-packagr@15 --dev
yarn add typescript@~4.8.4 --dev
yarn add zone.js@~0.12.0
```

- [ ] **Step 4: Convert constructor injection in `AstralAccessibilityComponent`**

File: `projects/astral-accessibility/src/lib/astral-accessibility.component.ts`

Remove the constructor and add `inject()` fields. Add `inject, ElementRef` to the `@angular/core` import (keep existing imports):

```typescript
// Remove this constructor:
constructor(
  private translationService: AstralTranslationService,
  private elementRef: ElementRef,
) {}

// Add these fields (place after the class opening brace, before ngOnInit):
private translationService = inject(AstralTranslationService);
private elementRef = inject(ElementRef);
```

- [ ] **Step 5: Convert constructor injection in `ContrastComponent`**

File: `projects/astral-accessibility/src/lib/controls/contrast.component.ts`

```typescript
// Remove:
constructor(private translation: AstralTranslationService) {}

// Add field (alongside the existing inject() fields):
private translation = inject(AstralTranslationService);
```

Add `AstralTranslationService` to the import from `../astral-translation.service`. `inject` is already imported.

- [ ] **Step 6: Convert constructor injection in `SaturateComponent`**

File: `projects/astral-accessibility/src/lib/controls/saturate.component.ts`

```typescript
// Remove:
constructor(private translation: AstralTranslationService) {}

// Add:
private translation = inject(AstralTranslationService);
```

- [ ] **Step 7: Convert constructor injection in `TextSizeComponent`**

File: `projects/astral-accessibility/src/lib/controls/text-size.component.ts`

The constructor creates a `MutationObserver`. Move it to a field initializer — `this` is available in field initializers:

```typescript
// Remove the entire constructor block:
constructor(private translation: AstralTranslationService) {
  this.observer = new MutationObserver(() => { ... });
}

// Remove the field declaration: private observer: MutationObserver;

// Add these two fields:
private translation = inject(AstralTranslationService);
private observer = new MutationObserver(() => {
  if (this._rescaleFrame !== null) cancelAnimationFrame(this._rescaleFrame);
  this._rescaleFrame = requestAnimationFrame(() => {
    this._rescaleFrame = null;
    this.observer.disconnect();
    this.restoreTextSize(document.body);
    this.updateTextSize(document.body, this.currentScale, 1);
    this.observer.observe(this.targetNode, this.config);
  });
});
```

- [ ] **Step 8: Convert constructor injection in `TextSpacingComponent`**

File: `projects/astral-accessibility/src/lib/controls/text-spacing.component.ts`

```typescript
// Remove:
constructor(private translation: AstralTranslationService) {}

// Add:
private translation = inject(AstralTranslationService);
```

- [ ] **Step 9: Convert constructor injection in `LineHeightComponent`**

File: `projects/astral-accessibility/src/lib/controls/line-height.component.ts`

```typescript
// Remove:
constructor(
  private renderer: Renderer2,
  private translation: AstralTranslationService,
) {}

// Add:
private renderer = inject(Renderer2);
private translation = inject(AstralTranslationService);
```

Add `Renderer2` to the `@angular/core` import.

- [ ] **Step 10: Convert constructor injection in `ScreenReaderComponent`**

File: `projects/astral-accessibility/src/lib/controls/screen-reader.component.ts`

```typescript
// Remove:
constructor(
  private renderer: Renderer2,
  private translation: AstralTranslationService,
  private ngZone: NgZone,
) {}

// Add:
private renderer = inject(Renderer2);
private translation = inject(AstralTranslationService);
private ngZone = inject(NgZone);
```

- [ ] **Step 11: Convert constructor injection in `ScreenMaskComponent`**

File: `projects/astral-accessibility/src/lib/controls/screen-mask.component.ts`

```typescript
// Remove:
constructor(
  private renderer: Renderer2,
  private translation: AstralTranslationService,
) {}

// Add:
private renderer = inject(Renderer2);
private translation = inject(AstralTranslationService);
```

- [ ] **Step 12: Add `required: true` to `AstralCheckmarkSvgComponent.isActive`**

File: `projects/astral-accessibility/src/lib/util/astral-checksvg.component.ts`

```typescript
// Before:
@Input() isActive: boolean;

// After:
@Input({ required: true }) isActive!: boolean;
```

The `!` satisfies TypeScript strict property initialisation — the `required` constraint ensures it is always bound by a parent.

- [ ] **Step 13: Delete `AstralAccessibilityModule`**

`AstralCheckmarkSvgComponent` has `standalone: true` — it was only in the module's `declarations` array, which is incorrect for standalone components and causes a v15 compile error. The module is unused; nothing imports it.

```bash
grep -r "AstralAccessibilityModule" projects/
```

Expected: only the module file itself appears. Then delete:

```bash
rm projects/astral-accessibility/src/lib/astral-accessibility.module.ts
```

- [ ] **Step 14: Run unit tests**

```bash
npx ng test --watch=false
```

Expected: all tests pass. Fix any remaining schematic-missed breaking changes before proceeding.

- [ ] **Step 15: Run Cypress**

```bash
npm run start:test-server &
SERVER_PID=$!
sleep 6
npx cypress run
kill $SERVER_PID
```

Expected: all Cypress tests pass.

- [ ] **Step 16: Commit and create PR**

```bash
git add -A
git commit -m "feat: upgrade Angular to v15"
gh pr create --base dev --head upgrade/angular-v15 \
  --title "feat: upgrade Angular to v15" \
  --body "$(cat <<'EOF'
## Summary
- Upgrades all @angular/* packages v14 → v15
- TypeScript 4.7 → 4.8, zone.js 0.11 → 0.12, ngx-build-plus v14 → v15
- Replaces constructor injection with \`inject()\` in all components
- Adds \`required: true\` to \`AstralCheckmarkSvgComponent.isActive\`
- Deletes \`AstralAccessibilityModule\` (standalone components cannot be declared in NgModules)

## Test plan
- [ ] \`ng test --watch=false\` passes
- [ ] Cypress suite passes
EOF
)"
```

---

### Task 2: PR2 — Angular v16

**Files:**
- Modify: `package.json`
- Modify: `projects/astral-accessibility/src/lib/astral-accessibility.component.ts`
- Modify: `projects/astral-accessibility/src/lib/astral-accessibility.component.spec.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/contrast.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/saturate.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/text-size.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/text-spacing.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/line-height.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/screen-reader.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/screen-mask.component.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/contrast.component.spec.ts`
- Modify: `projects/astral-accessibility/src/lib/controls/controls-persistence.spec.ts`

**Interfaces:**
- Consumes: `inject()` fields from Task 1
- Produces: `currentState` as `WritableSignal<number>` on all control components; `modalVisible` and `position` as `WritableSignal`; `isTopPosition` as `Signal<boolean>` (computed); `ScreenReaderComponent` uses `takeUntilDestroyed()` with no `ngOnDestroy`

- [ ] **Step 1: Create branch**

```bash
git checkout upgrade/angular-v15
git checkout -b upgrade/angular-v16
```

- [ ] **Step 2: Run ng update for Angular v16**

```bash
npx @angular/cli@16 update @angular/core@16 @angular/cli@16 --allow-dirty --force
```

- [ ] **Step 3: Update remaining packages**

```bash
yarn add ngx-build-plus@16 --dev
yarn add ng-packagr@16 --dev
yarn add typescript@~5.0.4 --dev
yarn add zone.js@~0.13.0
```

- [ ] **Step 4: Run baseline tests**

```bash
npx ng test --watch=false
```

Expected: tests still pass. Angular v16 has no breaking changes for this project beyond what schematics handle.

- [ ] **Step 5: Convert `currentState` to `signal(0)` in `ContrastComponent`**

File: `projects/astral-accessibility/src/lib/controls/contrast.component.ts`

Add `signal` to the `@angular/core` import.

```typescript
// Replace:
currentState = 0;
// With:
currentState = signal(0);
```

Update `ngOnInit`:
```typescript
// Before:
this.currentState = this.stateService.loadState(this.STORAGE_KEY);
if (this.currentState !== 0) {
// After:
this.currentState.set(this.stateService.loadState(this.STORAGE_KEY));
if (this.currentState() !== 0) {
```

Update `nextState`:
```typescript
// Before:
this.currentState += 1;
this.currentState = this.currentState % 4;
this.stateService.saveState(this.STORAGE_KEY, this.currentState);
// After:
this.currentState.update(v => (v + 1) % 4);
this.stateService.saveState(this.STORAGE_KEY, this.currentState());
```

Update the inline template — replace every bare `currentState` reference with `currentState()`:
```html
<!-- Before: -->
{{ labels[currentState] }}
[ngClass]="{ active: states[currentState] === 'Dark High Contrast' }"
<!-- After: -->
{{ labels[currentState()] }}
[ngClass]="{ active: states[currentState()] === 'Dark High Contrast' }"
```
Apply this substitution to every `currentState` occurrence in the template (there are multiple `[ngClass]` bindings).

- [ ] **Step 6: Apply same `currentState` → `signal()` pattern to remaining control components**

Apply the identical pattern to each component: field declaration, `ngOnInit`, `nextState()`, `_runStateLogic()` (reads `this.states[this.currentState]` — change to `this.currentState()`), and inline template. The `% N` modulus matches their state count:

- `saturate.component.ts` — 4 states, `STORAGE_KEY = "saturate"`
- `text-size.component.ts` — 4 states, `STORAGE_KEY = "text_size"`. Also update the `if (this.currentState !== 0)` in `nextState()` to `if (this.currentState() !== 0)`.
- `text-spacing.component.ts` — 4 states, `STORAGE_KEY = "text_spacing"`
- `line-height.component.ts` — 4 states, `STORAGE_KEY = "line_height"`
- `screen-reader.component.ts` — 4 states, `STORAGE_KEY = "screen_reader"`
- `screen-mask.component.ts` — 3 states (`% 3`), `STORAGE_KEY = "screen_mask"`

`InvertComponent` does **not** have a `currentState` field — it uses an `inverted` getter. Skip it.

- [ ] **Step 7: Convert `modalVisible` and `position` to signals in `AstralAccessibilityComponent`**

File: `projects/astral-accessibility/src/lib/astral-accessibility.component.ts`

Add `signal, computed` to the `@angular/core` import.

```typescript
// Replace:
modalVisible = false;
position: AstralPosition = "bottom-right";

// Add after AstralPosition type declaration:
modalVisible = signal(false);
position = signal<AstralPosition>("bottom-right");
isTopPosition = computed(() => this.position().startsWith("top"));
```

Remove the existing `get isTopPosition()` getter (replaced by the computed signal above).

Update `@HostBinding` getter:
```typescript
@HostBinding("class")
get hostClass(): string {
  return `astral-position-${this.position()}`;
}
```

Update `ngOnInit` where `position` is assigned:
```typescript
// Before:
this.position = (this.options["position"] as AstralPosition) || "bottom-right";
// After:
this.position.set((this.options["position"] as AstralPosition) || "bottom-right");
```

Update the template: replace bare `modalVisible` with `modalVisible()` and `isTopPosition` with `isTopPosition()`.

- [ ] **Step 8: Update `AstralAccessibilityComponent` spec for signal API**

File: `projects/astral-accessibility/src/lib/astral-accessibility.component.spec.ts`

Every assignment to `component.position` becomes a `.set()` call:
```typescript
// Before:
component.position = pos;
component.position = "bottom-right";
component.position = "bottom-left";
component.position = "top-right";
component.position = "top-left";
// After (each occurrence):
component.position.set(pos);
component.position.set("bottom-right");
// ... etc
```

Every read of `component.isTopPosition` adds `()`:
```typescript
// Before:
expect(component.isTopPosition).toBeFalse();
expect(component.isTopPosition).toBeTrue();
// After:
expect(component.isTopPosition()).toBeFalse();
expect(component.isTopPosition()).toBeTrue();
```

- [ ] **Step 9: Update `controls-persistence.spec.ts` for signal reads**

File: `projects/astral-accessibility/src/lib/controls/controls-persistence.spec.ts`

Every assertion that reads `currentState` adds `()`:
```typescript
// Before:
expect(fixture.componentInstance.currentState).toBe(2);
expect(fixture.componentInstance.currentState).toBe(3);
// After:
expect(fixture.componentInstance.currentState()).toBe(2);
expect(fixture.componentInstance.currentState()).toBe(3);
```

Apply this to all occurrences in the file (ContrastComponent, SaturateComponent, TextSpacingComponent, LineHeightComponent, TextSizeComponent, ScreenReaderComponent persistence blocks).

- [ ] **Step 10: Update `contrast.component.spec.ts` for signal reads**

File: `projects/astral-accessibility/src/lib/controls/contrast.component.spec.ts`

Every use of `component.currentState` as an array index adds `()`:
```typescript
// Before:
expect(component.states[component.currentState]).toBe("Contrast");
// After:
expect(component.states[component.currentState()]).toBe("Contrast");
```

Apply to all occurrences in the cycle-order describe block.

- [ ] **Step 11: Replace `Subscription` + `ngOnDestroy` with `takeUntilDestroyed()` in `ScreenReaderComponent`**

File: `projects/astral-accessibility/src/lib/controls/screen-reader.component.ts`

Add to imports:
```typescript
import { DestroyRef, inject, NgZone, Renderer2, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
```

Remove `import { Subscription } from "rxjs"` (keep `rxjs` if other things import from it — in this file only `Subscription` was imported from rxjs).

Remove the `private langSub: Subscription;` field declaration.

Add `DestroyRef` field (alongside other inject fields):
```typescript
private destroyRef = inject(DestroyRef);
```

In `ngOnInit`, replace the subscription:
```typescript
// Before:
this.langSub = this.translation.langChange.subscribe((lang) => {
  this.ngZone.run(() => { ... });
});
// After:
this.translation.langChange.pipe(
  takeUntilDestroyed(this.destroyRef)
).subscribe((lang) => {
  this.ngZone.run(() => { ... });
});
```

Register the renderer listener cleanup via `destroyRef` instead of `ngOnDestroy`. Add after the `renderer.listen` calls in `ngOnInit`:
```typescript
this.destroyRef.onDestroy(() => this.globalListenFunction?.());
```

Delete the entire `ngOnDestroy` method.

- [ ] **Step 12: Run unit tests**

```bash
npx ng test --watch=false
```

Expected: all tests pass. If `currentState()` call failures remain, check each spec file systematically for missed occurrences.

- [ ] **Step 13: Run Cypress**

```bash
npm run start:test-server &
SERVER_PID=$!
sleep 6
npx cypress run
kill $SERVER_PID
```

- [ ] **Step 14: Commit and create PR**

```bash
git add -A
git commit -m "feat: upgrade Angular to v16"
gh pr create --base upgrade/angular-v15 --head upgrade/angular-v16 \
  --title "feat: upgrade Angular to v16" \
  --body "$(cat <<'EOF'
## Summary
- Upgrades all @angular/* packages v15 → v16
- TypeScript 4.8 → 5.0, zone.js 0.12 → 0.13, ngx-build-plus v15 → v16
- Converts \`currentState\` to \`signal(0)\` in all control components
- Converts \`modalVisible\` and \`position\` to signals; \`isTopPosition\` to \`computed()\` in root component
- Replaces \`Subscription\` + \`ngOnDestroy\` with \`takeUntilDestroyed()\` in ScreenReaderComponent
- Updates all specs for signal read (\`()\`) and write (\`.set()\`) API

## Test plan
- [ ] \`ng test --watch=false\` passes
- [ ] Cypress suite passes
EOF
)"
```

---

### Task 3: PR3 — Angular v17 + Build System Migration

This is the highest-risk PR. `ngx-build-plus` is removed and replaced with `@angular/build:application` (esbuild). The output path shifts from `dist/.../main.js` to `dist/.../browser/main.js`. All `*ngIf`/`*ngFor` template syntax migrates to built-in control flow.

**Files:**
- Modify: `package.json` (remove ngx-build-plus, update scripts)
- Modify: `angular.json` (build + serve builders)
- Modify: `projects/astral-accessibility/tsconfig.app.json`
- Delete: `projects/astral-accessibility/src/polyfills.ts`
- Modify: `projects/demo/lite-server-config.json`
- Modify: ALL component `.ts` files — remove `NgIf` from imports after migration
- Modify: ALL inline templates — `*ngIf` → `@if`, `[ngClass]` stays

**Interfaces:**
- Consumes: signal API from Task 2
- Produces: esbuild build outputting `dist/astral-accessibility-angular-output/browser/main.js`; all `*ngIf` replaced with `@if`; `NgIf` removed from all component imports

- [ ] **Step 1: Create branch**

```bash
git checkout upgrade/angular-v16
git checkout -b upgrade/angular-v17
```

- [ ] **Step 2: Run ng update for Angular v17**

```bash
npx @angular/cli@17 update @angular/core@17 @angular/cli@17 --allow-dirty --force
```

- [ ] **Step 3: Remove ngx-build-plus and update remaining packages**

```bash
yarn remove ngx-build-plus
yarn add ng-packagr@17 --dev
yarn add typescript@~5.2.2 --dev
yarn add zone.js@~0.14.0
```

- [ ] **Step 4: Update `angular.json` — replace the `build` architect entry**

File: `angular.json`

Replace the entire `build` section for the `astral-accessibility` project with:

```json
"build": {
  "builder": "@angular/build:application",
  "options": {
    "outputPath": "dist/astral-accessibility-angular-output",
    "index": "projects/astral-accessibility/src/index.html",
    "browser": "projects/astral-accessibility/src/main.ts",
    "tsConfig": "projects/astral-accessibility/tsconfig.app.json",
    "inlineStyleLanguage": "scss",
    "assets": [],
    "scripts": [],
    "polyfills": [],
    "outputHashing": "none"
  },
  "configurations": {
    "production": {
      "budgets": [
        { "type": "initial", "maximumWarning": "500kb", "maximumError": "1mb" },
        { "type": "anyComponentStyle", "maximumWarning": "2kb", "maximumError": "500kb" }
      ],
      "outputHashing": "all"
    },
    "development": {
      "optimization": false,
      "sourceMap": true,
      "namedChunks": true
    }
  },
  "defaultConfiguration": "production"
}
```

Key changes from the old config: `builder` changes, `main` → `browser`, `singleBundle` removed, `polyfills` is now an inline array.

- [ ] **Step 5: Update `angular.json` — replace the `serve` architect entry**

```json
"serve": {
  "builder": "@angular/build:dev-server",
  "options": {
    "buildTarget": "astral-accessibility:build"
  },
  "configurations": {
    "production": {
      "buildTarget": "astral-accessibility:build:production"
    },
    "development": {
      "buildTarget": "astral-accessibility:build:development"
    }
  },
  "defaultConfiguration": "development"
}
```

Note: `browserTarget` → `buildTarget`.

- [ ] **Step 6: Update `tsconfig.app.json`**

File: `projects/astral-accessibility/tsconfig.app.json`

Remove `src/polyfills.ts` from `files` and remove the manual `target`/`lib` overrides (inherit from root tsconfig which already targets ES2020):

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/app",
    "types": []
  },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts"]
}
```

- [ ] **Step 7: Delete `polyfills.ts`**

```bash
rm projects/astral-accessibility/src/polyfills.ts
```

`polyfills.ts` contained only a comment (`// import 'zone.js'`). Zone.js is already imported directly in `main.ts`.

- [ ] **Step 8: Update `package.json` build scripts**

File: `package.json`

Remove the `--single-bundle` flag (not supported by the new builder):

```json
"build:lib": "ng build astral-accessibility --output-hashing=none",
"build:lib:dev": "ng build astral-accessibility --watch --configuration=development",
```

- [ ] **Step 9: Verify the build produces a single JS file**

```bash
npm run build:lib
ls dist/astral-accessibility-angular-output/browser/
```

Expected: `main.js` is the only `.js` file. If additional chunks appear, ensure there are no dynamic `import()` calls or lazy routes (there are none in this codebase).

- [ ] **Step 10: Update demo server config to serve from new output path**

File: `projects/demo/lite-server-config.json`

The demo `index.html` references `<script src="main.js">`. Add the esbuild output directory as a second base dir so `main.js` resolves from it:

```json
{
  "port": 8000,
  "files": [
    "projects/demo/**/*.{html,htm,css,js}",
    "dist/astral-accessibility-angular-output/browser/*.js"
  ],
  "server": {
    "baseDir": [
      "projects/demo",
      "dist/astral-accessibility-angular-output/browser"
    ]
  }
}
```

- [ ] **Step 11: Run control flow migration**

```bash
npx ng generate @angular/core:control-flow
```

Accept all prompts. This migrates every `*ngIf` → `@if`, `*ngFor` → `@for`, `*ngSwitch` → `@switch` in all component templates automatically.

- [ ] **Step 12: Remove `NgIf` from all component imports**

After the control flow migration `NgIf` is unused. `NgClass` still has no built-in replacement and must stay.

In each of these files, remove `NgIf` from the `imports` array and remove it from the `@angular/common` import line:

```
projects/astral-accessibility/src/lib/astral-accessibility.component.ts
projects/astral-accessibility/src/lib/util/astral-checksvg.component.ts
projects/astral-accessibility/src/lib/controls/contrast.component.ts
projects/astral-accessibility/src/lib/controls/invert.component.ts
projects/astral-accessibility/src/lib/controls/saturate.component.ts
projects/astral-accessibility/src/lib/controls/text-size.component.ts
projects/astral-accessibility/src/lib/controls/text-spacing.component.ts
projects/astral-accessibility/src/lib/controls/line-height.component.ts
projects/astral-accessibility/src/lib/controls/screen-reader.component.ts
projects/astral-accessibility/src/lib/controls/screen-mask.component.ts
```

For components that only imported `NgIf` from `@angular/common` (e.g. `AstralCheckmarkSvgComponent`), remove the entire `@angular/common` import line. For components that also import `NgClass` or `DOCUMENT`, remove only `NgIf` from that import.

- [ ] **Step 13: Run unit tests**

```bash
npx ng test --watch=false
```

Expected: all tests pass. The Karma test builder (`@angular-devkit/build-angular:karma`) is unchanged and continues to work in v17.

- [ ] **Step 14: Run Cypress**

```bash
npm run start:test-server &
SERVER_PID=$!
sleep 8
npx cypress run
kill $SERVER_PID
```

Expected: all tests pass. Cypress's `waitForResource("main.js")` finds the file served from the `browser/` base dir.

- [ ] **Step 15: Commit and create PR**

```bash
git add -A
git commit -m "feat: upgrade Angular to v17"
gh pr create --base upgrade/angular-v16 --head upgrade/angular-v17 \
  --title "feat: upgrade Angular to v17" \
  --body "$(cat <<'EOF'
## Summary
- Upgrades all @angular/* packages v16 → v17
- TypeScript 5.0 → 5.2, zone.js 0.13 → 0.14
- **Removes ngx-build-plus** — replaces with \`@angular/build:application\` (esbuild)
- Output path shifts to \`dist/astral-accessibility-angular-output/browser/main.js\`
- Removes \`--single-bundle\` flag from build scripts (esbuild produces single chunk natively)
- Deletes \`polyfills.ts\` (zone.js already imported in \`main.ts\`)
- Updates demo server config to serve from new output path
- Migrates all \`*ngIf\` → \`@if\` via \`ng generate @angular/core:control-flow\`
- Removes \`NgIf\` from all component imports arrays

## Test plan
- [ ] \`ng test --watch=false\` passes
- [ ] \`npm run build:lib\` produces a single \`browser/main.js\`
- [ ] Cypress suite passes
EOF
)"
```

---

### Task 4: PR4 — Angular v18

In this project there are no `@Output()` or `@ViewChild()`/`@ContentChild()` decorators. The only signal input migration is `AstralCheckmarkSvgComponent.isActive`.

**Files:**
- Modify: `package.json`
- Modify: `projects/astral-accessibility/src/lib/util/astral-checksvg.component.ts`

**Interfaces:**
- Consumes: `@if` control flow from Task 3
- Produces: `AstralCheckmarkSvgComponent.isActive` as `InputSignal<boolean>` (accessed as `isActive()` in its own template)

- [ ] **Step 1: Create branch**

```bash
git checkout upgrade/angular-v17
git checkout -b upgrade/angular-v18
```

- [ ] **Step 2: Run ng update**

```bash
npx @angular/cli@18 update @angular/core@18 @angular/cli@18 --allow-dirty --force
```

- [ ] **Step 3: Update remaining packages**

```bash
yarn add ng-packagr@18 --dev
yarn add typescript@~5.4.5 --dev
```

- [ ] **Step 4: Run baseline tests**

```bash
npx ng test --watch=false
```

Expected: tests pass (schematics handle v18 breaking changes automatically).

- [ ] **Step 5: Convert `isActive` to `input.required()` in `AstralCheckmarkSvgComponent`**

File: `projects/astral-accessibility/src/lib/util/astral-checksvg.component.ts`

```typescript
// Change import — replace Input with input:
import { Component, input } from "@angular/core";

// Change field:
// Before:
@Input({ required: true }) isActive!: boolean;
// After:
isActive = input.required<boolean>();
```

Update the template inside `AstralCheckmarkSvgComponent` — `isActive` is now a signal and must be called:

```html
<!-- Before (after PR3 control flow migration): -->
@if (isActive) {
<!-- After: -->
@if (isActive()) {
```

Parent component templates that bind `[isActive]="..."` do **not** change — Angular handles signal input binding transparently from the outside.

- [ ] **Step 6: Run unit tests**

```bash
npx ng test --watch=false
```

Expected: all tests pass. No test files directly instantiate `AstralCheckmarkSvgComponent`, so no spec changes needed.

- [ ] **Step 7: Run Cypress**

```bash
npm run start:test-server &
SERVER_PID=$!
sleep 8
npx cypress run
kill $SERVER_PID
```

- [ ] **Step 8: Commit and create PR**

```bash
git add -A
git commit -m "feat: upgrade Angular to v18"
gh pr create --base upgrade/angular-v17 --head upgrade/angular-v18 \
  --title "feat: upgrade Angular to v18" \
  --body "$(cat <<'EOF'
## Summary
- Upgrades all @angular/* packages v17 → v18
- TypeScript 5.2 → 5.4
- Converts \`AstralCheckmarkSvgComponent.isActive\` from \`@Input({ required: true })\` to \`input.required<boolean>()\`
- No \`@Output()\` or \`@ViewChild()\` exist in this project — nothing else to migrate

## Test plan
- [ ] \`ng test --watch=false\` passes
- [ ] Cypress suite passes
EOF
)"
```

---

### Task 5: PR5 — Angular v19

**Files:**
- Modify: `package.json`
- Modify: ALL component `.ts` files — remove `standalone: true`

**Interfaces:**
- Consumes: signal inputs from Task 4
- Produces: all components without explicit `standalone: true` (implicit default in v19+)

- [ ] **Step 1: Create branch**

```bash
git checkout upgrade/angular-v18
git checkout -b upgrade/angular-v19
```

- [ ] **Step 2: Run ng update**

```bash
npx @angular/cli@19 update @angular/core@19 @angular/cli@19 --allow-dirty --force
```

The v19 schematics may automatically remove `standalone: true`. Check afterwards.

- [ ] **Step 3: Update remaining packages**

```bash
yarn add ng-packagr@19 --dev
yarn add typescript@~5.6.3 --dev
```

- [ ] **Step 4: Remove `standalone: true` from all components (if schematics didn't)**

```bash
grep -r "standalone: true" projects/astral-accessibility/src/
```

If any results appear, remove `standalone: true` from each component's `@Component({})` decorator. Components to check:

```
projects/astral-accessibility/src/lib/astral-accessibility.component.ts
projects/astral-accessibility/src/lib/util/astral-checksvg.component.ts
projects/astral-accessibility/src/lib/controls/contrast.component.ts
projects/astral-accessibility/src/lib/controls/invert.component.ts
projects/astral-accessibility/src/lib/controls/saturate.component.ts
projects/astral-accessibility/src/lib/controls/text-size.component.ts
projects/astral-accessibility/src/lib/controls/text-spacing.component.ts
projects/astral-accessibility/src/lib/controls/line-height.component.ts
projects/astral-accessibility/src/lib/controls/screen-reader.component.ts
projects/astral-accessibility/src/lib/controls/screen-mask.component.ts
```

- [ ] **Step 5: Check for `linkedSignal` opportunities**

Review signal usage. `linkedSignal()` applies when a signal derives its initial value from another signal but also needs independent mutations. In this project:
- `currentState` starts at 0 then is set from `stateService.loadState()` — independent, not derived from another signal
- `modalVisible`, `position` — independent

No `linkedSignal` use case exists here. Skip.

- [ ] **Step 6: Run unit tests**

```bash
npx ng test --watch=false
```

Expected: all tests pass.

- [ ] **Step 7: Run Cypress**

```bash
npm run start:test-server &
SERVER_PID=$!
sleep 8
npx cypress run
kill $SERVER_PID
```

- [ ] **Step 8: Commit and create PR**

```bash
git add -A
git commit -m "feat: upgrade Angular to v19"
gh pr create --base upgrade/angular-v18 --head upgrade/angular-v19 \
  --title "feat: upgrade Angular to v19" \
  --body "$(cat <<'EOF'
## Summary
- Upgrades all @angular/* packages v18 → v19
- TypeScript 5.4 → 5.6
- Removes \`standalone: true\` from all component decorators (now implicit default)
- No \`linkedSignal\` use cases found in this project

## Test plan
- [ ] \`ng test --watch=false\` passes
- [ ] Cypress suite passes
EOF
)"
```

---

### Task 6: PR6 — Angular v20

**Files:**
- Modify: `package.json`
- Modify: any files affected by v20 schematics (determined at implementation time)

**Interfaces:**
- Consumes: all prior changes
- Produces: project on Angular 20, TypeScript ~5.8, zone.js ~0.15

- [ ] **Step 1: Create branch**

```bash
git checkout upgrade/angular-v19
git checkout -b upgrade/angular-v20
```

- [ ] **Step 2: Run ng update**

```bash
npx @angular/cli@20 update @angular/core@20 @angular/cli@20 --allow-dirty --force
```

- [ ] **Step 3: Update remaining packages**

```bash
yarn add ng-packagr@20 --dev
yarn add typescript@~5.8.0 --dev
yarn add zone.js@~0.15.0
```

- [ ] **Step 4: Apply any v20 breaking change fixes**

Review the Angular v20 migration guide at https://update.angular.io/?v=19.0-20.0 for any manual fixes not handled by schematics. Pay attention to:
- Any changes to `@angular/build:application` output structure
- Any signal API that moved from developer preview to stable with a renamed import
- Any `@angular/elements` API changes

Apply fixes as needed.

- [ ] **Step 5: Run unit tests**

```bash
npx ng test --watch=false
```

Expected: all tests pass.

- [ ] **Step 6: Run Cypress**

```bash
npm run start:test-server &
SERVER_PID=$!
sleep 8
npx cypress run
kill $SERVER_PID
```

- [ ] **Step 7: Commit and create PR**

```bash
git add -A
git commit -m "feat: upgrade Angular to v20"
gh pr create --base upgrade/angular-v19 --head upgrade/angular-v20 \
  --title "feat: upgrade Angular to v20" \
  --body "$(cat <<'EOF'
## Summary
- Upgrades all @angular/* packages v19 → v20
- TypeScript 5.6 → 5.8, zone.js 0.14 → 0.15
- Applies v20 schematics and any manual breaking change fixes

## Test plan
- [ ] \`ng test --watch=false\` passes
- [ ] Cypress suite passes
EOF
)"
```
