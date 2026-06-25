import { TestBed } from "@angular/core/testing";
import { SaturateComponent } from "./saturate.component";
import { AstralTranslationService } from "../astral-translation.service";

describe("SaturateComponent labels", () => {
  let component: SaturateComponent;
  let translationService: AstralTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaturateComponent],
    }).compileComponents();

    translationService = TestBed.inject(AstralTranslationService);
    const fixture = TestBed.createComponent(SaturateComponent);
    component = fixture.componentInstance;
  });

  it("returns English labels by default", () => {
    expect(component.labels[0]).toBe("Saturation");
    expect(component.labels[1]).toBe("Low Saturation");
    expect(component.labels[2]).toBe("High Saturation");
    expect(component.labels[3]).toBe("Desaturated");
  });

  it("returns French labels after setLanguage('fr')", () => {
    translationService.setLanguage("fr");
    expect(component.labels[0]).toBe("Saturation");
    expect(component.labels[1]).toBe("Faible saturation");
    expect(component.labels[2]).toBe("Haute saturation");
    expect(component.labels[3]).toBe("Désaturé");
  });

  it("returns Traditional Chinese labels after setLanguage('zh-Hant')", () => {
    translationService.setLanguage("zh-Hant");
    expect(component.labels[0]).toBe("飽和度");
    expect(component.labels[1]).toBe("低飽和度");
    expect(component.labels[2]).toBe("高飽和度");
    expect(component.labels[3]).toBe("去飽和");
  });
});
