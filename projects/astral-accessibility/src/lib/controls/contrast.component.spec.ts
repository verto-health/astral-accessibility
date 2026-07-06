import { TestBed } from "@angular/core/testing";
import { ContrastComponent } from "./contrast.component";
import { AstralTranslationService } from "../astral-translation.service";

describe("ContrastComponent", () => {
  let component: ContrastComponent;
  let translationService: AstralTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContrastComponent],
    }).compileComponents();

    translationService = TestBed.inject(AstralTranslationService);
    const fixture = TestBed.createComponent(ContrastComponent);
    component = fixture.componentInstance;
  });

  describe("labels", () => {
    it("returns English labels in cycle order by default", () => {
      expect(component.labels[0]).toBe("Contrast");
      expect(component.labels[1]).toBe("Dark High Contrast");
      expect(component.labels[2]).toBe("High Contrast");
      expect(component.labels[3]).toBe("Invert");
    });

    it("returns French labels after setLanguage('fr')", () => {
      translationService.setLanguage("fr");
      expect(component.labels[0]).toBe("Contraste");
      expect(component.labels[1]).toBe("Contraste élevé sombre");
      expect(component.labels[2]).toBe("Contraste élevé");
      expect(component.labels[3]).toBe("Inverser");
    });

    it("returns Traditional Chinese labels after setLanguage('zh-Hant')", () => {
      translationService.setLanguage("zh-Hant");
      expect(component.labels[0]).toBe("對比度");
      expect(component.labels[1]).toBe("深色高對比度");
      expect(component.labels[2]).toBe("高對比度");
      expect(component.labels[3]).toBe("反轉");
    });
  });

  describe("cycle order", () => {
    it("starts at base state", () => {
      expect(component.states[component.currentState()]).toBe("Contrast");
    });

    it("cycles Dark High Contrast first", () => {
      component.nextState();
      expect(component.states[component.currentState()]).toBe(
        "Dark High Contrast",
      );
    });

    it("cycles High Contrast second", () => {
      component.nextState();
      component.nextState();
      expect(component.states[component.currentState()]).toBe("High Contrast");
    });

    it("cycles Invert third", () => {
      component.nextState();
      component.nextState();
      component.nextState();
      expect(component.states[component.currentState()]).toBe("Invert");
    });

    it("wraps back to base after Invert", () => {
      component.nextState();
      component.nextState();
      component.nextState();
      component.nextState();
      expect(component.states[component.currentState()]).toBe("Contrast");
    });
  });
});
