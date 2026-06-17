import { AstralTranslationService } from "./astral-translation.service";

describe("AstralTranslationService", () => {
  let service: AstralTranslationService;

  beforeEach(() => {
    service = new AstralTranslationService();
  });

  it("returns English strings by default", () => {
    expect(service.t("contrast.base")).toBe("Contrast");
    expect(service.t("screenReader.base")).toBe("Screen Reader");
    expect(service.t("lineHeight.heavy")).toBe("Heavy Height");
  });

  it("returns French strings after setLanguage('fr')", () => {
    service.setLanguage("fr");
    expect(service.t("contrast.base")).toBe("Contraste");
    expect(service.t("screenReader.base")).toBe("Lecteur d'écran");
    expect(service.t("lineHeight.heavy")).toBe("Hauteur importante");
  });

  it("returns Traditional Chinese strings after setLanguage('zh-Hant')", () => {
    service.setLanguage("zh-Hant");
    expect(service.t("contrast.base")).toBe("對比度");
    expect(service.t("screenReader.base")).toBe("螢幕閱讀器");
    expect(service.t("lineHeight.heavy")).toBe("重度行高");
  });

  it("falls back to English for an unknown language code", () => {
    service.setLanguage("de");
    expect(service.t("contrast.base")).toBe("Contrast");
  });

  it("returns the key itself when a translation key is missing", () => {
    expect(service.t("nonexistent.key")).toBe("nonexistent.key");
  });

  it("can switch language more than once", () => {
    service.setLanguage("fr");
    expect(service.t("contrast.base")).toBe("Contraste");
    service.setLanguage("zh-Hant");
    expect(service.t("contrast.base")).toBe("對比度");
    service.setLanguage("en");
    expect(service.t("contrast.base")).toBe("Contrast");
  });
});
