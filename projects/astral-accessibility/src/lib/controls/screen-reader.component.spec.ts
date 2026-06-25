import { TestBed } from "@angular/core/testing";
import { ScreenReaderComponent } from "./screen-reader.component";
import { AstralTranslationService } from "../astral-translation.service";

describe("ScreenReaderComponent labels", () => {
  let component: ScreenReaderComponent;
  let translationService: AstralTranslationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenReaderComponent],
    }).compileComponents();

    translationService = TestBed.inject(AstralTranslationService);
    const fixture = TestBed.createComponent(ScreenReaderComponent);
    component = fixture.componentInstance;
  });

  it("returns English labels by default", () => {
    expect(component.labels[0]).toBe("Screen Reader");
    expect(component.labels[1]).toBe("Read Normal");
    expect(component.labels[2]).toBe("Read Fast");
    expect(component.labels[3]).toBe("Read Slow");
    expect(component.unavailableLabel).toBe(
      "Screen Reader unavailable on device",
    );
  });

  it("returns French labels after setLanguage('fr')", () => {
    translationService.setLanguage("fr");
    expect(component.labels[0]).toBe("Lecteur d'écran");
    expect(component.labels[1]).toBe("Lecture normale");
    expect(component.labels[2]).toBe("Lecture rapide");
    expect(component.labels[3]).toBe("Lecture lente");
    expect(component.unavailableLabel).toBe(
      "Lecteur d'écran indisponible sur cet appareil",
    );
  });

  it("returns Traditional Chinese labels after setLanguage('zh-Hant')", () => {
    translationService.setLanguage("zh-Hant");
    expect(component.labels[0]).toBe("螢幕閱讀器");
    expect(component.labels[1]).toBe("正常閱讀");
    expect(component.labels[2]).toBe("快速閱讀");
    expect(component.labels[3]).toBe("慢速閱讀");
    expect(component.unavailableLabel).toBe("此裝置不支援螢幕閱讀器");
  });
});
