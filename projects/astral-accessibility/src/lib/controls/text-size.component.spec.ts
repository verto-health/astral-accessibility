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

    component.updateTextSize(container, scale, 1);

    FIELD_IDS.forEach((id) => {
      expect(fontSizeOf(id)).toBeCloseTo(initial[id] * scale, 1);
    });
  });

  it("restores the original size of form fields and labels", () => {
    const scale = 1.8;
    const initial: Record<string, number> = {};
    FIELD_IDS.forEach((id) => (initial[id] = fontSizeOf(id)));

    component.updateTextSize(container, scale, 1);
    component.restoreTextSize(container);

    FIELD_IDS.forEach((id) => {
      expect(fontSizeOf(id)).toBeCloseTo(initial[id], 1);
    });
  });
});
