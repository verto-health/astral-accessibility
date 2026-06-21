import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import EN from "./i18n/en.json";
import FR from "./i18n/fr.json";
import ZH_HANT from "./i18n/zh-Hant.json";

@Injectable({ providedIn: "root" })
export class AstralTranslationService {
  private translations: Record<string, string> = EN as Record<string, string>;
  private lang: string = "en";

  readonly langChange = new Subject<string>();

  get currentLang(): string {
    return this.lang;
  }

  setLanguage(lang: string): void {
    this.lang = lang;
    switch (lang) {
      case "de":
        this.translations = DE as Record<string, string>;
        break;
      case "fr":
        this.translations = FR as Record<string, string>;
        break;
      case "zh-Hant":
        this.translations = ZH_HANT as Record<string, string>;
        break;
      default:
        this.translations = EN as Record<string, string>;
    }
    this.langChange.next(this.lang);
  }

  t(key: string): string {
    return this.translations[key] ?? key;
  }
}
