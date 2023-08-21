import { NgIf } from "@angular/common";
import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ContrastComponent } from "./controls/contrast.component";
import { InvertComponent } from "./controls/invert.component";
import { SaturateComponent } from "./controls/saturate.component";
import { TextSizeComponent } from "./controls/text-size.component";
import { TextSpacingComponent } from "./controls/text-spacing.component";
import { ScreenReaderComponent } from "./controls/screen-reader.component";
import { ScreenMaskComponent } from "./controls/screen-mask.component";
import { LineHeightComponent } from "./controls/line-height.component";

@Component({
  selector: "astral-accessibility",
  templateUrl: "./astral-accessibility.component.html",
  styleUrls: ["./astral-accessibility.component.scss"],
  standalone: true,
  imports: [
    NgIf,
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
  modalVisible = false;
  userAgent = navigator.userAgent;
  astralAccessibilityPanel = "astral-modal";
  astralAccessibilityIcon = "astral-icon";
  options: Record<string, any> = {};
  enabledFeatures: String[] = [];

  ngOnInit() {
    const astralElement = document.querySelector('astral-accessibility');
    const astralOptions = astralElement?.getAttribute('astral-features');

    if (astralOptions) {
      this.options = JSON.parse(astralOptions);
      this.enabledFeatures = this.options['enabledFeatures'];
    }

    const phones =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
    if (phones.test(this.userAgent)) {
      this.astralAccessibilityPanel = "astral-page astral-modal";
      this.astralAccessibilityIcon = "astral-icon astral-icon-mobile";
    }
  }
}
