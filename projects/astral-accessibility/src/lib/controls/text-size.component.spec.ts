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
