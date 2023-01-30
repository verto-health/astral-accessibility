import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'astral-saturate',
  standalone: true,
  template: `
    <button (click)="nextState()" [ngClass]="{ 'in-use': states[currentState] != base }">
      <div class="title">
        <div class="icon-state-wrap">
          <div
            class="pi pi-palette icon action-icon "
            [ngClass]="{
              inactive: states[currentState] == base,
              active: states[currentState] != base
            }"
          >
          <svg width="41" height="41" viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="j7jc4ss84a">
                  <path d="M1440 0v900H0V0h1440z"/>
                </clipPath>
                <clipPath id="t65z0zbfzb">
                  <path d="M20.5 0C31.804 0 41 9.196 41 20.5S31.804 41 20.5 41 0 31.804 0 20.5 9.196 0 20.5 0zm0 2.32c-10.024 0-18.18 8.156-18.18 18.18s8.156 18.18 18.18 18.18z"/>
                </clipPath>
              </defs>
              <g clip-path="url(#j7jc4ss84a)" transform="translate(-1084 -366)">
                <g clip-path="url(#t65z0zbfzb)" transform="translate(1084 366)">
                  <path fill="#FFF" d="M0 0h41v41H0V0z"/>
                </g>
              </g>
            </svg>
        </div>
          <div class="state-dots-wrap">
            <span>{{ states[currentState] }}</span>
            <div *ngIf="states[currentState] != base" class="dots">
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Low Saturation' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'High Saturation' }"
              ></div>
              <div class="dot" [ngClass]="{ active: states[currentState] === 'Desaturated' }"></div>
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
export class SaturateComponent {
  document = inject(DOCUMENT);

  currentState = 0;
  base = 'Saturation';
  states = [this.base, 'Low Saturation', 'High Saturation', 'Desaturated'];

  nextState() {
    this.currentState += 1;
    this.currentState = this.currentState % 4;

    this._runStateLogic();
  }

  private _runStateLogic() {
    this._resetSaturation();

    if (this.states[this.currentState] === 'Low Saturation') {
      this.document.documentElement.classList.add('astral_low_saturation');
    }

    if (this.states[this.currentState] === 'High Saturation') {
      this.document.documentElement.classList.add('astral_high_saturation');
    }

    if (this.states[this.currentState] === 'Desaturated') {
      this.document.documentElement.classList.add('astral_desaturated');
    }
  }

  private _resetSaturation() {
    this.document.documentElement.classList.remove('astral_low_saturation');
    this.document.documentElement.classList.remove('astral_high_saturation');
    this.document.documentElement.classList.remove('astral_desaturated');
  }
}
