import { DOCUMENT } from "@angular/common";
import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { AstralAccessibilityComponent } from "./lib/astral-accessibility.component";
import "zone.js";

(window as any).initializeAstral = async function initializeAstral(
  options?: Record<string, any>,
) {
  try {
    //When no options are given by default all widgets are allowed
    if (!options) {
      options = {
        filterWidget: [
          "Screen Reader",
          "Contrast",
          "Saturation",
          "Bigger Text",
          "Text Spacing",
          "Screen Mask",
        ],
      };
    }

    const app = await createApplication();
    const widget = createCustomElement(AstralAccessibilityComponent, {
      injector: app.injector,
    });
    customElements.define("astral-accessibility", widget);

    const doc = app.injector.get(DOCUMENT);
    const astralAccessibilityElement = doc.createElement(
      "astral-accessibility",
    );
    astralAccessibilityElement.setAttribute(
      "astral-options",
      JSON.stringify(options),
    );
    doc.body.appendChild(astralAccessibilityElement);
  } catch (err) {
    console.error(err);
  }
};
