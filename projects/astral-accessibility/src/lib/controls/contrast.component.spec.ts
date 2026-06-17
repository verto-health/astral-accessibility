import { TestBed } from "@angular/core/testing";
import { ContrastComponent } from "./contrast.component";
import { AstralTranslationService } from "../astral-translation.service";

describe("ContrastComponent labels", () => {
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

  it("returns English labels by default", () => {
    expect(component.labels[0]).toBe("Contrast");
    expect(component.labels[1]).toBe("Invert");
    expect(component.labels[2]).toBe("High Contrast");
    expect(component.labels[3]).toBe("Dark High Contrast");
  });

  it("returns French labels after setLanguage('fr')", () => {
    translationService.setLanguage("fr");
    expect(component.labels[0]).toBe("Contraste");
    expect(component.labels[1]).toBe("Inverser");
    expect(component.labels[2]).toBe("Contraste élevé");
    expect(component.labels[3]).toBe("Contraste élevé sombre");
  });

  it("returns Traditional Chinese labels after setLanguage('zh-Hant')", () => {
    translationService.setLanguage("zh-Hant");
    expect(component.labels[0]).toBe("對比度");
    expect(component.labels[1]).toBe("反轉");
    expect(component.labels[2]).toBe("高對比度");
    expect(component.labels[3]).toBe("深色高對比度");
  });
});
