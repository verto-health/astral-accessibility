import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'astral-text-size',
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
              <div class="dot" [ngClass]="{ active: states[currentState] === 'Medium Text' }"></div>
              <div class="dot" [ngClass]="{ active: states[currentState] === 'Large Text' }"></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Extra Large Text' }"
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
  base = 'Bigger Text';
  states = [this.base, 'Medium Text', 'Large Text', 'Extra Large Text'];

  _style: HTMLStyleElement;

  nextState() {
    this.currentState += 1;
    this.currentState = this.currentState % 4;

    this._runStateLogic();
  }

  private _runStateLogic() {
    this._style?.remove?.();
    this._style = this.document.createElement('style');

    if (this.states[this.currentState] === 'Medium Text') {
      this.document.documentElement.classList.add('ally_by_verto_medium_text');
    } else {
      this.document.documentElement.classList.remove('ally_by_verto_medium_text');
    }

    if (this.states[this.currentState] === 'Large Text') {
      this.document.documentElement.classList.add('ally_by_verto_large_text');
    } else {
      this.document.documentElement.classList.remove('ally_by_verto_large_text');
    }

    if (this.states[this.currentState] === 'Extra Large Text') {
      this.document.documentElement.classList.add('ally_by_verto_extra_large_text');
    } else {
      this.document.documentElement.classList.remove('ally_by_verto_extra_large_text');
    }

    this.document.body.appendChild(this._style);
  }
}
