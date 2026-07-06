import { DOCUMENT } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { AstralAccessibilityComponent } from "./lib/astral-accessibility.component";
import { AstralTranslationService } from "./lib/astral-translation.service";
import "zone.js";

const ASTRAL_TAG = "astral-accessibility";

let astralAppPromise: Promise<{ doc: Document }> | null = null;

(window as any).initializeAstral = async function initializeAstral(
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

    if (!astralAppPromise) {
      astralAppPromise = (async () => {
        const app = await createApplication();
        const widget = createCustomElement(AstralAccessibilityComponent, {
          injector: app.injector,
        });
        if (!customElements.get(ASTRAL_TAG)) {
          customElements.define(ASTRAL_TAG, widget);
        }
        const doc = app.injector.get(DOCUMENT);
        const translationService = app.injector.get(AstralTranslationService);
        (window as any).astralSetLanguage = (lang: string) => {
          translationService.setLanguage(lang);
        };
        return { doc };
      })();
    }

    const { doc } = await astralAppPromise;

    doc.querySelectorAll(ASTRAL_TAG).forEach((el) => el.remove());

    const astralAccessibilityElement = doc.createElement(ASTRAL_TAG);
    astralAccessibilityElement.setAttribute(
      "astral-features",
      JSON.stringify(features),
    );
    doc.body.appendChild(astralAccessibilityElement);
  } catch (err) {
    console.error(err);
  }
};
