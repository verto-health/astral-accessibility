import { DOCUMENT, NgIf, NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AstralCheckmarkSvgComponent } from "../util/astral-checksvg.component";
import { AccessibilityComponent } from "./accessibility.component";

@Component({
  selector: "astral-text-spacing",
  standalone: true,
  template: `
    <button
      (click)="nextState()"
      [ngClass]="{ 'in-use': states[currentState] != base }"
    >
      <div class="title">
        <div class="icon-state-wrap">
          <div
            class="icon action-icon"
            [ngClass]="{
              inactive: states[currentState] == base,
              active: states[currentState] != base
            }"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 26 25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="ki3uuqgr6a">
                  <path d="M1440 0v900H0V0h1440z" />
                </clipPath>
                <clipPath id="5dhlpgaz6b">
                  <path
                    d="m22.108 15.357 3.546 3.747a1.3 1.3 0 0 1 0 1.767l-3.546 3.748a1.14 1.14 0 0 1-1.149.34 1.217 1.217 0 0 1-.844-.892 1.297 1.297 0 0 1 .322-1.215l1.528-1.615H4.035l1.528 1.615c.307.314.43.778.322 1.215-.108.437-.43.778-.844.892a1.14 1.14 0 0 1-1.15-.34L.347 20.87a1.3 1.3 0 0 1 0-1.767l3.546-3.747a1.137 1.137 0 0 1 1.656.015 1.3 1.3 0 0 1 .015 1.751l-1.528 1.615h17.93l-1.528-1.615a1.3 1.3 0 0 1 .015-1.751 1.137 1.137 0 0 1 1.656-.015zM18.91 0c.653 0 1.182.56 1.182 1.25v2.498c0 .69-.53 1.249-1.182 1.249-.653 0-1.182-.56-1.182-1.25V2.499h-3.545v11.244h1.182c.652 0 1.182.559 1.182 1.249 0 .69-.53 1.249-1.182 1.249h-4.728c-.652 0-1.182-.56-1.182-1.25s.53-1.248 1.182-1.248h1.182V2.498H8.273v1.25c0 .69-.53 1.249-1.182 1.249-.653 0-1.182-.56-1.182-1.25V1.25C5.909.56 6.439 0 7.091 0h11.818z"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#ki3uuqgr6a)" transform="translate(-1091 -680)">
                <g clip-path="url(#5dhlpgaz6b)" transform="translate(1091 680)">
                  <path fill="#FFF" d="M0 0h26v25H0V0z" />
                </g>
              </g>
            </svg>
          </div>

          <div class="state-dots-wrap">
            <span>{{ states[currentState] }}</span>
            <div
              class="dots"
              [ngClass]="{ inactive: states[currentState] === base }"
            >
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Light Spacing' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{
                  active: states[currentState] === 'Moderate Spacing'
                }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Heavy Spacing' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <astral-widget-checkmark
        [isActive]="states[currentState] !== base"
      ></astral-widget-checkmark>
    </button>
  `,
  imports: [NgIf, NgClass, AstralCheckmarkSvgComponent],
})
export class TextSpacingComponent extends AccessibilityComponent {
  constructor() {
    super();
    this.currentState = super.setLogic("astralAccessibility_textSpacingState");
  }
  document = inject(DOCUMENT);

  currentState = super.getState("astralAccessibility_textSpacingState");
  base = "Text Spacing";
  states = [this.base, "Light Spacing", "Moderate Spacing", "Heavy Spacing"];

  _style: HTMLStyleElement;

  nextState() {
    this.currentState = super.changeState(
      this.currentState,
      "astralAccessibility_textSpacingState",
      this.states.length,
    );

    this._runStateLogic();
  }

  protected override _runStateLogic() {
    this._style?.remove?.();
    this._style = this.document.createElement("style");

    if (this.states[this.currentState] === "Light Spacing") {
      this.document.documentElement.classList.add("astral_light_spacing");
    } else {
      this.document.documentElement.classList.remove("astral_light_spacing");
    }

    if (this.states[this.currentState] === "Moderate Spacing") {
      this.document.documentElement.classList.add("astral_moderate_spacing");
    } else {
      this.document.documentElement.classList.remove("astral_moderate_spacing");
    }

    if (this.states[this.currentState] === "Heavy Spacing") {
      this.document.documentElement.classList.add("astral_heavy_spacing");
    } else {
      this.document.documentElement.classList.remove("astral_heavy_spacing");
    }

    this.document.body.appendChild(this._style);
  }
}
