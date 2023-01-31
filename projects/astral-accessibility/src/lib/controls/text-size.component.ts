import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'astral-text-size',
  standalone: true,
  template: `
    <button
      (click)="nextState()"
      [ngClass]="{ 'in-use': states[currentState] != base }"
    >
      <div class="title">
        <div class="icon-state-wrap">
          <!-- <i
            class="pi pi-sort-alpha-up icon action-icon "
            [ngClass]="{
              inactive: states[currentState] == base,
              active: states[currentState] != base
            }"
          ></i> -->
          <div
            class="icon action-icon "
            [ngClass]="{
              inactive: states[currentState] == base,
              active: states[currentState] != base
            }"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 26 21"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="26ttiz3qla">
                  <path d="M1440 0v900H0V0h1440z" />
                </clipPath>
                <clipPath id="gg0ujnavhb">
                  <path
                    d="M20.09 0c.654 0 1.183.522 1.183 1.167V3.24c0 .644-.53 1.167-1.182 1.167a1.174 1.174 0 0 1-1.182-1.167v-.907h-7.09v16.334h3.02c.653 0 1.182.522 1.182 1.166 0 .645-.53 1.167-1.182 1.167H6.434a1.174 1.174 0 0 1-1.182-1.167c0-.644.53-1.166 1.182-1.166h3.02V2.333h-7.09v.907c0 .644-.53 1.167-1.182 1.167A1.174 1.174 0 0 1 0 3.24V1.167C0 .522.53 0 1.182 0H20.09zm4.728 9.683c.653 0 1.182.523 1.182 1.167v1.633c0 .645-.53 1.167-1.182 1.167a1.174 1.174 0 0 1-1.182-1.167v-.466h-1.772v6.65h1.3c.652 0 1.181.522 1.181 1.166 0 .645-.529 1.167-1.181 1.167H18.2a1.174 1.174 0 0 1-1.182-1.167c0-.644.53-1.166 1.182-1.166h1.3v-6.65h-1.773v.466c0 .645-.529 1.167-1.182 1.167a1.174 1.174 0 0 1-1.181-1.167V10.85c0-.644.529-1.167 1.181-1.167h8.273z"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#26ttiz3qla)" transform="translate(-1091 -581)">
                <g clip-path="url(#gg0ujnavhb)" transform="translate(1091 581)">
                  <path fill="#FFF" d="M0 0h26v21H0V0z" />
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
                [ngClass]="{ active: states[currentState] === 'Medium Text' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Large Text' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{
                  active: states[currentState] === 'Extra Large Text'
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <i
        *ngIf="states[currentState] !== base"
        class="pi pi-check icon active active-check"
        style="font-weight: 900"
      ></i>
    </button>
  `,
  imports: [NgIf, NgClass],
})
export class TextSizeComponent {
  document = inject(DOCUMENT);

  currentState = 0;
  currentScale = 1;
  base = 'Bigger Text';
  states = [this.base, 'Medium Text', 'Large Text', 'Extra Large Text'];

  _style: HTMLStyleElement;

  private observer: MutationObserver;

  // Select the node that will be observed for mutations
  targetNode = document.body;

  // Options for the observer (which mutations to observe)
  config = { attributes: true, childList: true, subtree: true };

  // constructor() {
  //   this.observer = new MutationObserver((mutations: MutationRecord[]) => {
  //     this.updateTextSize(this.targetNode, this.currentScale, 1);
  //   });
  // }

  updateTextSize(node: HTMLElement, scale: number, previousScale: number = 1) {
    const children = node.children;
    if (children.length === 0) {
      // change font size
      const currentFontSize = window.getComputedStyle(node).fontSize;
      const currentFontSizeNum = parseFloat(currentFontSize);
      node.style.fontSize = `${(currentFontSizeNum / previousScale) * scale}px`;
    } else {
      // has children, don't change font size and move on
      for (const child of children) {
        this.updateTextSize(child as HTMLElement, scale, previousScale);
      }
    }
  }

  nextState() {
    this.currentState += 1;
    this.currentState = this.currentState % 4;

    this._runStateLogic();
  }

  private _runStateLogic() {
    let previousScale = this.currentScale;

    if (this.states[this.currentState] === 'Medium Text') {
      this.currentScale = 1.1;
    }

    if (this.states[this.currentState] === 'Large Text') {
      this.currentScale = 1.3;
    }

    if (this.states[this.currentState] === 'Extra Large Text') {
      this.currentScale = 1.5;
    }

    if (!(this.states[this.currentState] === this.base)) {
      this.updateTextSize(document.body, this.currentScale, previousScale);
    } else {
      this.updateTextSize(document.body, 1, this.currentScale);
      this.currentScale = 1;
    }
  }
}
