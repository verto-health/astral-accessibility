import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AstralCheckmarkSvgComponent } from '../util/astral-checksvg.component';
import { AccessibilityComponent } from './accessibility.component';

@Component({
  selector: 'astral-contrast',
  standalone: true,
  template: `
    <button
      (click)="nextState()"
      [ngClass]="{ 'in-use': states[currentState] !== base }"
    >
      <div class="title">
        <div class="icon-state-wrap">
          <!-- <i
            class="pi pi-minus-circle icon action-icon "
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
              viewBox="0 0 41 41"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="j7jc4ss84a">
                  <path d="M1440 0v900H0V0h1440z" />
                </clipPath>
                <clipPath id="t65z0zbfzb">
                  <path
                    d="M20.5 0C31.804 0 41 9.196 41 20.5S31.804 41 20.5 41 0 31.804 0 20.5 9.196 0 20.5 0zm0 2.32c-10.024 0-18.18 8.156-18.18 18.18s8.156 18.18 18.18 18.18z"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#j7jc4ss84a)" transform="translate(-1084 -366)">
                <g clip-path="url(#t65z0zbfzb)" transform="translate(1084 366)">
                  <path fill="#FFF" d="M0 0h41v41H0V0z" />
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
                [ngClass]="{ active: states[currentState] === 'Invert' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'High Contrast' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{
                  active: states[currentState] === 'Dark High Contrast'
                }"
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
export class ContrastComponent extends AccessibilityComponent {
  constructor(){
    super()    
    this.currentState = super.setLogic('astralAccessibility_contrastState')
  }
  document = inject(DOCUMENT);

  currentState = super.getState('astralAccessibility_contrastState');
  base = 'Contrast';
  states = [this.base, 'Invert', 'High Contrast', 'Dark High Contrast'];

  _style: HTMLStyleElement;

  nextState() {
    this.currentState = super.changeState(this.currentState, 'astralAccessibility_contrastState', this.states.length)

    this._runStateLogic();
  }

  protected override _runStateLogic() {
    this._style?.remove?.();
    this._style = this.document.createElement('style');

    if (this.states[this.currentState] === 'Invert') {
      this.document.documentElement.classList.add('astral_inverted');
    } else {
      this.document.documentElement.classList.remove('astral_inverted');
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
            body > :not(astral-accessibility), body > :not(astral-accessibility) * {
              background: black !important;
              font-weight: 700;
              color: #fff !important;
            }

            body > :not(astral-accessibility), body > :not(astral-accessibility) a {
              color: #23ebf7 !important;
            }
        `;
    }

    this.document.body.appendChild(this._style);
  }
  
}
