import { ComponentFixture, TestBed } from "@angular/core/testing";
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
  const sheets: HTMLStyleElement[] = [];

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
    sheets.forEach((s) => s.remove());
    sheets.length = 0;
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

  // The scale used to be derived from each element's *current* computed size,
  // so every re-application multiplied on top of the last one. In an SPA each
  // route change re-rendered the DOM, re-fired the MutationObserver and grew
  // the text by another `scale` factor, with no bound — a 20px nav label
  // reached 1185px after six navigations.
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

  // The parent needs its own text *and* child elements: that is the shape that
  // gets a font-size of its own, so a child added later would inherit the
  // scaled size unless we restore before measuring. A wrapper holding only
  // elements and whitespace is skipped, and the situation never arises.
  function mixedParent(fontSize = 20): HTMLElement {
    const mixed = document.createElement("div");
    mixed.style.fontSize = `${fontSize}px`;
    mixed.innerHTML = `Text <span>inner</span>`;
    container.appendChild(mixed);
    return mixed;
  }

  it("measures elements added after scaling at their own base size", () => {
    const scale = 1.5;
    const mixed = mixedParent(20);

    component.updateTextSize(container, scale);

    // Simulate a route change swapping in fresh DOM while a scale is active.
    const added = document.createElement("p");
    added.textContent = "Added after the first scale";
    mixed.appendChild(added);

    component.restoreTextSize(container);
    component.updateTextSize(container, scale);

    // 20 * 1.5. Without the restore it measures the parent at 1.5x and yields 45.
    expect(parseFloat(window.getComputedStyle(added).fontSize)).toBeCloseTo(
      30,
      1,
    );
  });

  // The app restyles its own text through a stylesheet — a theme switch or a
  // layout breakpoint. It cannot do so through the inline style, because that
  // is the slot we save and restore.
  function restylable(): {
    el: HTMLElement;
    setNaturalSize: (px: number) => void;
  } {
    const sheet = document.createElement("style");
    sheet.textContent = `.restyle-me { font-size: 10px; }`;
    document.head.appendChild(sheet);
    sheets.push(sheet);

    const el = document.createElement("p");
    el.className = "restyle-me";
    el.textContent = "Restyled by the app";
    container.appendChild(el);

    return {
      el,
      setNaturalSize: (px) =>
        (sheet.textContent = `.restyle-me { font-size: ${px}px; }`),
    };
  }

  // While a scale is active the remembered size is deliberately *not*
  // refreshed, so an app restyle mid-scale is not picked up until scaling is
  // switched off and on again — see `_runStateLogic` for why re-measuring on
  // every restore is unsafe. This test pins that known limitation so the
  // trade-off is visible rather than surprising.
  it("keeps the remembered size while a scale stays active", () => {
    const scale = 1.5;
    const { el, setNaturalSize } = restylable();

    component.updateTextSize(container, scale);
    expect(parseFloat(window.getComputedStyle(el).fontSize)).toBeCloseTo(15, 1);

    setNaturalSize(40);

    component.restoreTextSize(container);
    component.updateTextSize(container, scale);

    expect(parseFloat(window.getComputedStyle(el).fontSize)).toBeCloseTo(15, 1);
  });
});

describe("TextSizeComponent state transitions", () => {
  let component: TextSizeComponent;
  let fixture: ComponentFixture<TextSizeComponent>;
  let mixed: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextSizeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextSizeComponent);
    component = fixture.componentInstance;

    mixed = document.createElement("div");
    mixed.style.fontSize = "20px";
    mixed.innerHTML = `Text <span>inner</span>`;
    document.body.appendChild(mixed);
  });

  afterEach(() => {
    // These specs drive `nextState`, which starts a MutationObserver on
    // document.body. Leaving it running would keep re-scaling the page for
    // every later spec — with two leaked observers that reproduces the
    // compounding bug inside the suite, and Jasmine randomises spec order, so
    // it would surface as an unrelated intermittent failure.
    while (component.currentState() !== 0) component.nextState();
    fixture.destroy();
    component.restoreTextSize(document.body);
    mixed.remove();
    localStorage.removeItem("text_size");
  });

  // SPAs park DOM off-screen and bring it back (tabs, collapsed panels, cached
  // screens). If scaling is switched off while an element is detached, the
  // restore pass cannot reach it — so we have to still know about it when it
  // comes back, or it stays stuck at the size we gave it.
  function detachable(): HTMLElement {
    const el = document.createElement("p");
    el.style.fontSize = "20px";
    el.textContent = "Parked off-screen";
    document.body.appendChild(el);
    return el;
  }

  it("does not strand a detached element at a scaled size", () => {
    const el = detachable();

    component.nextState(); // Medium
    component.nextState(); // -> Large, 1.5x
    expect(parseFloat(window.getComputedStyle(el).fontSize)).toBeCloseTo(30, 1);

    el.remove(); // the app parks it off-screen

    component.nextState(); // Extra Large
    component.nextState(); // -> off

    document.body.appendChild(el); // and brings it back
    component.restoreTextSize(document.body);

    expect(parseFloat(window.getComputedStyle(el).fontSize)).toBeCloseTo(20, 1);
    el.remove();
  });

  it("does not let a stranded element compound when scaling is turned back on", () => {
    const el = detachable();

    component.nextState(); // Medium
    component.nextState(); // -> Large, 1.5x

    el.remove();

    component.nextState(); // Extra Large
    component.nextState(); // -> off

    document.body.appendChild(el);

    component.nextState(); // Medium
    component.nextState(); // -> Large again

    // 20 * 1.5. Measured at its stuck 30px it would come back 45.
    expect(parseFloat(window.getComputedStyle(el).fontSize)).toBeCloseTo(30, 1);
    el.remove();
  });

  // Turning scaling off forgets the remembered sizes, so the next time it is
  // turned on the page is measured afresh and app restyles are picked up.
  it("picks up a new natural size after scaling is switched off and on", () => {
    const sheet = document.createElement("style");
    sheet.textContent = `.restyle-me { font-size: 10px; }`;
    document.head.appendChild(sheet);

    const el = document.createElement("p");
    el.className = "restyle-me";
    el.textContent = "Restyled while scaling is off";
    document.body.appendChild(el);

    try {
      component.nextState(); // -> Medium, 1.2x
      expect(parseFloat(window.getComputedStyle(el).fontSize)).toBeCloseTo(
        12,
        1,
      );

      component.nextState(); // Large
      component.nextState(); // Extra Large
      component.nextState(); // -> back to base, remembered sizes dropped

      sheet.textContent = `.restyle-me { font-size: 40px; }`;

      component.nextState(); // -> Medium again, measured afresh

      expect(parseFloat(window.getComputedStyle(el).fontSize)).toBeCloseTo(
        48,
        1,
      );
    } finally {
      el.remove();
      sheet.remove();
    }
  });

  // Guards the restore in `_runStateLogic`: without it, DOM added between two
  // state changes is measured while its parent is still carrying the previous
  // scale, and comes out too big.
  it("measures DOM added between state changes at its base size", () => {
    component.nextState(); // -> Medium Text, 1.2x

    const added = document.createElement("p");
    added.textContent = "Added between states";
    mixed.appendChild(added);

    component.nextState(); // -> Large Text, 1.5x

    // 20 * 1.5. Measured against a parent still at 1.2x it would be 36.
    expect(parseFloat(window.getComputedStyle(added).fontSize)).toBeCloseTo(
      30,
      1,
    );
  });
});
