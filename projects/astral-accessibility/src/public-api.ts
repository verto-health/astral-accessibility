import { DOCUMENT } from "@angular/common";
import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { AstralAccessibilityComponent } from "./lib/astral-accessibility.component";
import "zone.js";

export async function initializeAstral(
  features?: Record<string, any>,
) {
  try {
    //When no options are given by default all widgets are allowed
    if (!features) {
      features = {
        enabledFeatures: [
          "Screen Reader",
          "Contrast",
          "Saturation",
          "Bigger Text",
          "Text Spacing",
          "Screen Mask",
          "Line Height",
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
      "astral-features",
      JSON.stringify(features),
    );
    doc.body.appendChild(astralAccessibilityElement);
  } catch (err) {
    console.error(err);
  }
};
