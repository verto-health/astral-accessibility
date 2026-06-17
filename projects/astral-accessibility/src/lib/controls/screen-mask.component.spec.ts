import { TestBed } from "@angular/core/testing";
import { ScreenMaskComponent } from "./screen-mask.component";
import { AstralTranslationService } from "../astral-translation.service";

describe("ScreenMaskComponent labels", () => {
  let component: ScreenMaskComponent;
  let translationService: AstralTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenMaskComponent],
    }).compileComponents();

    translationService = TestBed.inject(AstralTranslationService);
    const fixture = TestBed.createComponent(ScreenMaskComponent);
    component = fixture.componentInstance;
  });

  it("returns English labels by default", () => {
    expect(component.labels[0]).toBe("Screen Mask");
    expect(component.labels[1]).toBe("Large Cursor");
    expect(component.labels[2]).toBe("Reading Mask");
  });

  it("returns French labels after setLanguage('fr')", () => {
    translationService.setLanguage("fr");
    expect(component.labels[0]).toBe("Masque d'écran");
    expect(component.labels[1]).toBe("Grand curseur");
    expect(component.labels[2]).toBe("Masque de lecture");
  });

  it("returns Traditional Chinese labels after setLanguage('zh-Hant')", () => {
    translationService.setLanguage("zh-Hant");
    expect(component.labels[0]).toBe("螢幕遮罩");
    expect(component.labels[1]).toBe("大型游標");
    expect(component.labels[2]).toBe("閱讀遮罩");
  });
});
