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

(async () => {
  const app = await createApplication({ providers: [] });

  const widget = createCustomElement(AstralAccessibilityComponent, { injector: app.injector });

  customElements.define('astral-accessibility', widget);

  document.body.appendChild(document.createElement('astral-accessibility'));
})();
