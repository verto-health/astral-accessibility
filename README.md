# Accessibility Widget for Angular Applications

## astral-accessibility
A component for accessibility widget

## Installation
Add library using `yarn add` or `npm install`
```
yarn add astral-accessibility
npm install astral-accessibility --save
```

## Quickstart
Import `AstralAccessibilityComponent` in `main.ts` or your entry point script:
```typescript
// main.ts
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AstralAccessibilityComponent } from 'astral-accessibility';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// Astral Accessibility
(async () => {
  const app = await createApplication({ providers: [] });

  const widget = createCustomElement(AstralAccessibilityComponent, { injector: app.injector });

  customElements.define('astral-accessibility', widget);

  document.body.appendChild(document.createElement('astral-accessibility'));
})();
```