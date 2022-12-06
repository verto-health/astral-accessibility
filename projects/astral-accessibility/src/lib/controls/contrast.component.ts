import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'astral-contrast',
  standalone: true,
  template: `
    <button (click)="nextState()" [ngClass]="{ 'in-use': states[currentState] != base }">
      <div class="title">
        <div class="icon-state-wrap">
          <i
            class="pi pi-minus-circle icon action-icon "
            [ngClass]="{
              inactive: states[currentState] == base,
              active: states[currentState] != base
            }"
          ></i>
          <div class="state-dots-wrap">
            <span>{{ states[currentState] }}</span>
            <div class="dots" [ngClass]="{ inactive: states[currentState] === base }">
              <div class="dot" [ngClass]="{ active: states[currentState] === 'Invert' }"></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'High Contrast' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Dark High Contrast' }"
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
export class ContrastComponent {
  document = inject(DOCUMENT);

  currentState = 0;
  base = 'Contrast';
  states = [this.base, 'Invert', 'High Contrast', 'Dark High Contrast'];

  _style: HTMLStyleElement;

  nextState() {
    this.currentState += 1;
    this.currentState = this.currentState % 4;

    this._runStateLogic();
  }

  private _runStateLogic() {
    this._style?.remove?.();
    this._style = this.document.createElement('style');

    if (this.states[this.currentState] === 'Invert') {
      this.document.documentElement.classList.add('ally_by_verto_inverted');
    } else {
      this.document.documentElement.classList.remove('ally_by_verto_inverted');
    }

    if (this.states[this.currentState] === 'High Contrast') {
      this._style.textContent = `
            body > :not(astral-accessibility) * {
                background: transparent !important;
                color: #000 !important;
            }

            html body > :not(astral-accessibility) button {
              background-color: #e8e8e8 !important;
            }
        `;
    }

    if (this.states[this.currentState] === 'Dark High Contrast') {
      this._style.textContent = `
            body > :not(astral-accessibility) * {
                background: transparent !important;
                color: #fff !important;
            }

            html, body {
              background: #000;
            }

            html body > :not(astral-accessibility) img {
              filter: contrast(2);
            }

            html body > :not(astral-accessibility) button {
              background-color: #2c2c2c !important;
            }
        `;
    }

    this.document.body.appendChild(this._style);
  }
}
