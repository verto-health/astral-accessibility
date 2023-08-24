import { DOCUMENT, NgIf, NgClass } from "@angular/common";
import { Component, Renderer2, inject } from "@angular/core";
import { AstralCheckmarkSvgComponent } from "../util/astral-checksvg.component";

@Component({
  selector: "astral-line-height",
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
              width="25px"
              height="25px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 6L21 6.00048M13 12L21 12.0005M13 18L21 18.0005M6 4V20M6 4L3 7M6 4L9 7M6 20L3 17M6 20L9 17"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
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
                [ngClass]="{ active: states[currentState] === 'Light Height' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{
                  active: states[currentState] === 'Moderate Height'
                }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Heavy Height' }"
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
export class LineHeightComponent {
  constructor(private renderer: Renderer2) {}
  document = inject(DOCUMENT);

  currentState = 0;
  base = "Line Height";
  states = [this.base, "Light Height", "Moderate Height", "Heavy Height"];

  lowHeight = `
  *{
    line-height: 1.5 !important;
  }`;

  moderateHeight = `
  *{
    line-height: 3 !important;
  }`;

  heavyHeight = `
  *{
    line-height: 4 !important;
  }`;

  private lowHeightStyleTag: HTMLStyleElement | null = null;
  private moderateHeightStyleTag: HTMLStyleElement | null = null;
  private heavyHeightStyleTag: HTMLStyleElement | null = null;

  _style: HTMLStyleElement;

  nextState() {
    this.currentState += 1;
    this.currentState = this.currentState % 4;

    this._runStateLogic();
  }

  private _runStateLogic() {
    this._style?.remove?.();
    this._style = this.document.createElement("style");

    if (this.states[this.currentState] === "Light Height") {
      if (!this.lowHeightStyleTag) {
        this.lowHeightStyleTag = this.renderer.createElement("style");
        this.renderer.appendChild(
          this.lowHeightStyleTag,
          this.renderer.createText(this.lowHeight),
        );
        this.renderer.appendChild(this.document.head, this.lowHeightStyleTag);
      }
    } else {
      if (this.lowHeightStyleTag) {
        this.renderer.removeChild(this.document.head, this.lowHeightStyleTag);
        this.lowHeightStyleTag = null;
      }
    }

    if (this.states[this.currentState] === "Moderate Height") {
      if (!this.moderateHeightStyleTag) {
        this.moderateHeightStyleTag = this.renderer.createElement("style");
        this.renderer.appendChild(
          this.moderateHeightStyleTag,
          this.renderer.createText(this.moderateHeight),
        );
        this.renderer.appendChild(
          this.document.head,
          this.moderateHeightStyleTag,
        );
      }
    } else {
      if (this.moderateHeightStyleTag) {
        this.renderer.removeChild(
          this.document.head,
          this.moderateHeightStyleTag,
        );
        this.moderateHeightStyleTag = null;
      }
    }

    if (this.states[this.currentState] === "Heavy Height") {
      if (!this.heavyHeightStyleTag) {
        this.heavyHeightStyleTag = this.renderer.createElement("style");
        this.renderer.appendChild(
          this.heavyHeightStyleTag,
          this.renderer.createText(this.heavyHeight),
        );
        this.renderer.appendChild(this.document.head, this.heavyHeightStyleTag);
      }
    } else {
      if (this.heavyHeightStyleTag) {
        this.renderer.removeChild(this.document.head, this.heavyHeightStyleTag);
        this.heavyHeightStyleTag = null;
      }
    }

    this.document.body.appendChild(this._style);
  }
}
