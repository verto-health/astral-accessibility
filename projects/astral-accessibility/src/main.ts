import { DOCUMENT } from "@angular/common";
import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { AstralAccessibilityComponent } from "./lib/astral-accessibility.component";
import "zone.js";

(window as any).initializeAstral = async function initializeAstral() {
  try {
    const app = await createApplication();
    const widget = createCustomElement(AstralAccessibilityComponent, {
      injector: app.injector,
    });
    customElements.define("astral-accessibility", widget);
    const doc = app.injector.get(DOCUMENT);
    doc.body.appendChild(doc.createElement("astral-accessibility"));
  } catch (err) {
    console.error(err);
  }
};
