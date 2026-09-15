import { TestBed } from "@angular/core/testing";
import { TextSizeComponent } from "./text-size.component";
import { AstralTranslationService } from "../astral-translation.service";

describe("TextSizeComponent labels", () => {
  let component: TextSizeComponent;
  let translationService: AstralTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextSizeComponent],
    }).compileComponents();

    translationService = TestBed.inject(AstralTranslationService);
    const fixture = TestBed.createComponent(TextSizeComponent);
    component = fixture.componentInstance;
  });

  it("returns English labels by default", () => {
    expect(component.labels[0]).toBe("Bigger Text");
    expect(component.labels[1]).toBe("Medium Text");
    expect(component.labels[2]).toBe("Large Text");
    expect(component.labels[3]).toBe("Extra Large Text");
  });

  it("returns French labels after setLanguage('fr')", () => {
    translationService.setLanguage("fr");
    expect(component.labels[0]).toBe("Texte plus grand");
    expect(component.labels[1]).toBe("Texte moyen");
    expect(component.labels[2]).toBe("Grand texte");
    expect(component.labels[3]).toBe("Très grand texte");
  });

  it("returns Traditional Chinese labels after setLanguage('zh-Hant')", () => {
    translationService.setLanguage("zh-Hant");
    expect(component.labels[0]).toBe("放大文字");
    expect(component.labels[1]).toBe("中等文字");
    expect(component.labels[2]).toBe("大型文字");
    expect(component.labels[3]).toBe("超大文字");
  });
});

describe("TextSizeComponent form field scaling", () => {
  let component: TextSizeComponent;
  let container: HTMLElement;

  const FIELD_IDS = ["ff-label", "ff-input", "ff-textarea", "ff-select"];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextSizeComponent],
    }).compileComponents();

    const fixture = TestBed.createComponent(TextSizeComponent);
    component = fixture.componentInstance;

    container = document.createElement("div");
    container.innerHTML = `
      <label id="ff-label" for="ff-input">Full name</label>
      <input id="ff-input" type="text" value="Jane Doe" />
      <textarea id="ff-textarea">Notes</textarea>
      <select id="ff-select">
        <option>Option one</option>
        <option>Option two</option>
      </select>
    `;
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  function fontSizeOf(id: string): number {
    return parseFloat(
      window.getComputedStyle(document.getElementById(id)!).fontSize,
    );
  }

  it("scales form fields and their labels by the selected factor", () => {
    const scale = 1.5;
    const initial: Record<string, number> = {};
    FIELD_IDS.forEach((id) => (initial[id] = fontSizeOf(id)));

    component.updateTextSize(container, scale);

    FIELD_IDS.forEach((id) => {
      expect(fontSizeOf(id)).toBeCloseTo(initial[id] * scale, 1);
    });
  });

  it("restores the original size of form fields and labels", () => {
    const scale = 1.8;
    const initial: Record<string, number> = {};
    FIELD_IDS.forEach((id) => (initial[id] = fontSizeOf(id)));

    component.updateTextSize(container, scale);
    component.restoreTextSize(container);

    FIELD_IDS.forEach((id) => {
      expect(fontSizeOf(id)).toBeCloseTo(initial[id], 1);
    });
  });

  // TICKET-12742: the scale used to be derived from each element's *current*
  // computed size, so every re-application multiplied on top of the last one.
  // In the DFD each SPA route change re-rendered the DOM, re-fired the
  // MutationObserver and grew the navbar text by another `scale` factor, with
  // no bound — 20px reached 1615px after six navigations.
  it("does not compound when the same scale is applied repeatedly", () => {
    const scale = 1.5;
    const initial: Record<string, number> = {};
    FIELD_IDS.forEach((id) => (initial[id] = fontSizeOf(id)));

    for (let i = 0; i < 5; i++) {
      component.restoreTextSize(container);
      component.updateTextSize(container, scale);
    }

    FIELD_IDS.forEach((id) => {
      expect(fontSizeOf(id)).toBeCloseTo(initial[id] * scale, 1);
    });
  });

  it("does not compound when re-applied without an intervening restore", () => {
    const scale = 1.5;
    const initial: Record<string, number> = {};
    FIELD_IDS.forEach((id) => (initial[id] = fontSizeOf(id)));

    component.updateTextSize(container, scale);
    component.updateTextSize(container, scale);
    component.updateTextSize(container, scale);

    FIELD_IDS.forEach((id) => {
      expect(fontSizeOf(id)).toBeCloseTo(initial[id] * scale, 1);
    });
  });

  it("scales from the base size when moving between scales", () => {
    const initial: Record<string, number> = {};
    FIELD_IDS.forEach((id) => (initial[id] = fontSizeOf(id)));

    // Medium -> Large -> Extra Large, as clicking through the control does.
    for (const scale of [1.2, 1.5, 1.8]) {
      component.restoreTextSize(container);
      component.updateTextSize(container, scale);
    }

    FIELD_IDS.forEach((id) => {
      expect(fontSizeOf(id)).toBeCloseTo(initial[id] * 1.8, 1);
    });
  });

  it("measures elements added after scaling at their own base size", () => {
    const scale = 1.5;
    component.updateTextSize(container, scale);

    // Simulate a route change swapping in fresh DOM after a scale is active.
    const added = document.createElement("p");
    added.textContent = "Added after the first scale";
    container.appendChild(added);
    const base = parseFloat(window.getComputedStyle(added).fontSize);

    component.restoreTextSize(container);
    component.updateTextSize(container, scale);

    expect(parseFloat(window.getComputedStyle(added).fontSize)).toBeCloseTo(
      base * scale,
      1,
    );
  });
});
