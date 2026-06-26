import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostBinding,
  inject,
  signal,
} from "@angular/core";
import { ContrastComponent } from "./controls/contrast.component";
import { InvertComponent } from "./controls/invert.component";
import { SaturateComponent } from "./controls/saturate.component";
import { TextSizeComponent } from "./controls/text-size.component";
import { TextSpacingComponent } from "./controls/text-spacing.component";
import { ScreenReaderComponent } from "./controls/screen-reader.component";
import { ScreenMaskComponent } from "./controls/screen-mask.component";
import { LineHeightComponent } from "./controls/line-height.component";
import { AstralTranslationService } from "./astral-translation.service";

export type AstralPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

@Component({
  selector: "astral-accessibility",
  templateUrl: "./astral-accessibility.component.html",
  styleUrls: ["./astral-accessibility.component.scss"],
  imports: [
    InvertComponent,
    ContrastComponent,
    SaturateComponent,
    TextSizeComponent,
    TextSpacingComponent,
    ScreenReaderComponent,
    ScreenMaskComponent,
    LineHeightComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AstralAccessibilityComponent {
  private translationService = inject(AstralTranslationService);
  private elementRef = inject(ElementRef);

  modalVisible = signal(false);
  userAgent = navigator.userAgent;
  astralAccessibilityPanel = "astral-modal";
  astralAccessibilityIcon = "astral-icon";
  options: Record<string, any> = {};
  enabledFeatures: String[] = [];
  position = signal<AstralPosition>("bottom-right");
  isTopPosition = computed(() => this.position().startsWith("top"));

  @HostBinding("class")
  get hostClass(): string {
    return `astral-position-${this.position()}`;
  }

  ngOnInit() {
    const astralElement = document.querySelector("astral-accessibility");
    const astralOptions = astralElement?.getAttribute("astral-features");

    if (astralOptions) {
      this.options = JSON.parse(astralOptions);
      this.enabledFeatures = this.options["enabledFeatures"];
      this.position.set(
        (this.options["position"] as AstralPosition) || "bottom-right",
      );
      if (this.options["language"]) {
        this.translationService.setLanguage(this.options["language"]);
      }

      if (this.options["toggleColor"]) {
        this.elementRef.nativeElement.style.setProperty(
          "--toggleButtonColor",
          this.options["toggleColor"],
        );
      }

      if (this.options["toggleIconColor"]) {
        this.elementRef.nativeElement.style.setProperty(
          "--toggleIconColor",
          this.options["toggleIconColor"],
        );
      }
    }

    const phones =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    if (phones.test(this.userAgent)) {
      this.astralAccessibilityPanel = "astral-page astral-modal";
      this.astralAccessibilityIcon = "astral-icon astral-icon-mobile";
    }
  }
}
