import { TestBed } from "@angular/core/testing";
import { LineHeightComponent } from "./line-height.component";
import { AstralTranslationService } from "../astral-translation.service";

describe("LineHeightComponent labels", () => {
  let component: LineHeightComponent;
  let translationService: AstralTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineHeightComponent],
    }).compileComponents();

    translationService = TestBed.inject(AstralTranslationService);
    const fixture = TestBed.createComponent(LineHeightComponent);
    component = fixture.componentInstance;
  });

  it("returns English labels by default", () => {
    expect(component.labels[0]).toBe("Line Height");
    expect(component.labels[1]).toBe("Light Height");
    expect(component.labels[2]).toBe("Moderate Height");
    expect(component.labels[3]).toBe("Heavy Height");
  });

  it("returns French labels after setLanguage('fr')", () => {
    translationService.setLanguage("fr");
    expect(component.labels[0]).toBe("Hauteur de ligne");
    expect(component.labels[1]).toBe("Hauteur légère");
    expect(component.labels[2]).toBe("Hauteur modérée");
    expect(component.labels[3]).toBe("Hauteur importante");
  });

  it("returns Traditional Chinese labels after setLanguage('zh-Hant')", () => {
    translationService.setLanguage("zh-Hant");
    expect(component.labels[0]).toBe("行高");
    expect(component.labels[1]).toBe("輕度行高");
    expect(component.labels[2]).toBe("中度行高");
    expect(component.labels[3]).toBe("重度行高");
  });
});
