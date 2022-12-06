import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'astral-text-spacing',
  standalone: true,
  template: `
    <button (click)="nextState()" [ngClass]="{ 'in-use': states[currentState] != base }">
      <div class="title">
        <div class="icon-state-wrap">
          <i
            class="pi pi-sort-alpha-up icon action-icon "
            [ngClass]="{
              inactive: states[currentState] == base,
              active: states[currentState] != base
            }"
          ></i>
          <div class="state-dots-wrap">
            <span>{{ states[currentState] }}</span>
            <div class="dots" [ngClass]="{ inactive: states[currentState] === base }">
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Light Spacing' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Moderate Spacing' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Heavy Spacing' }"
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
export class TextSpacingComponent {
  document = inject(DOCUMENT);

  currentState = 0;
  base = 'Text Spacing';
  states = [this.base, 'Light Spacing', 'Moderate Spacing', 'Heavy Spacing'];

  _style: HTMLStyleElement;

  nextState() {
    this.currentState += 1;
    this.currentState = this.currentState % 4;

    this._runStateLogic();
  }

  private _runStateLogic() {
    this._style?.remove?.();
    this._style = this.document.createElement('style');

    if (this.states[this.currentState] === 'Light Spacing') {
      this.document.documentElement.classList.add('ally_by_verto_light_spacing');
    } else {
      this.document.documentElement.classList.remove('ally_by_verto_light_spacing');
    }

    if (this.states[this.currentState] === 'Moderate Spacing') {
      this.document.documentElement.classList.add('ally_by_verto_moderate_spacing');
    } else {
      this.document.documentElement.classList.remove('ally_by_verto_moderate_spacing');
    }

    if (this.states[this.currentState] === 'Heavy Spacing') {
      this.document.documentElement.classList.add('ally_by_verto_heavy_spacing');
    } else {
      this.document.documentElement.classList.remove('ally_by_verto_heavy_spacing');
    }

    this.document.body.appendChild(this._style);
  }
}
