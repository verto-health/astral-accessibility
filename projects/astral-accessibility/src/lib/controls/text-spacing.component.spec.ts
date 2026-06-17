import { TestBed } from "@angular/core/testing";
import { TextSpacingComponent } from "./text-spacing.component";
import { AstralTranslationService } from "../astral-translation.service";

describe("TextSpacingComponent labels", () => {
  let component: TextSpacingComponent;
  let translationService: AstralTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextSpacingComponent],
    }).compileComponents();

    translationService = TestBed.inject(AstralTranslationService);
    const fixture = TestBed.createComponent(TextSpacingComponent);
    component = fixture.componentInstance;
  });

  it("returns English labels by default", () => {
    expect(component.labels[0]).toBe("Text Spacing");
    expect(component.labels[1]).toBe("Light Spacing");
    expect(component.labels[2]).toBe("Moderate Spacing");
    expect(component.labels[3]).toBe("Heavy Spacing");
  });

  it("returns French labels after setLanguage('fr')", () => {
    translationService.setLanguage("fr");
    expect(component.labels[0]).toBe("Espacement du texte");
    expect(component.labels[1]).toBe("Espacement léger");
    expect(component.labels[2]).toBe("Espacement modéré");
    expect(component.labels[3]).toBe("Espacement important");
  });

  it("returns Traditional Chinese labels after setLanguage('zh-Hant')", () => {
    translationService.setLanguage("zh-Hant");
    expect(component.labels[0]).toBe("文字間距");
    expect(component.labels[1]).toBe("輕度間距");
    expect(component.labels[2]).toBe("中度間距");
    expect(component.labels[3]).toBe("重度間距");
  });
});
