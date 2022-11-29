import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'ally-saturate',
  standalone: true,
  template: `
    <button (click)="nextState()" [ngClass]="{ 'in-use': states[currentState] != base }">
      <div class="title">
        <div class="icon-state-wrap">
          <i
            class="pi pi-palette icon action-icon "
            [ngClass]="{
              inactive: states[currentState] == base,
              active: states[currentState] != base
            }"
          ></i>
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
      this.document.documentElement.classList.add('ally_by_verto_low_saturation');
    }

    if (this.states[this.currentState] === 'High Saturation') {
      this.document.documentElement.classList.add('ally_by_verto_high_saturation');
    }

    if (this.states[this.currentState] === 'Desaturated') {
      this.document.documentElement.classList.add('ally_by_verto_desaturated');
    }
  }

  private _resetSaturation() {
    this.document.documentElement.classList.remove('ally_by_verto_low_saturation');
    this.document.documentElement.classList.remove('ally_by_verto_high_saturation');
    this.document.documentElement.classList.remove('ally_by_verto_desaturated');
  }
}
