import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AccessibiltyWidgetComponent } from './accessibility-widget/accessibility-widget.component';

(async () => {
  const app = await createApplication({ providers: [] });

  const widget = createCustomElement(AccessibiltyWidgetComponent, { injector: app.injector });

  customElements.define('ally-by-verto', widget);

  document.body.appendChild(document.createElement('ally-by-verto'));
})();
