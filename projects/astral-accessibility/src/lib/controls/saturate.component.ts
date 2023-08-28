import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AstralCheckmarkSvgComponent } from '../util/astral-checksvg.component';
import { AccessibilityComponent } from './accessibility.component';

@Component({
  selector: 'astral-saturate',
  standalone: true,
  template: `
    <button
      (click)="nextState()"
      [ngClass]="{ 'in-use': states[currentState] !== base }"
    >
      <div class="title">
        <div class="icon-state-wrap">
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
              viewBox="0 0 41 40"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="Group-28-Copy-9"
                  transform="translate(-21.000000, -20.000000)"
                  fill="#FFFFFF"
                  fill-rule="nonzero"
                >
                  <g id="Group-2" transform="translate(12.000000, 11.985411)">
                    <g
                      id="color-palette"
                      transform="translate(9.000000, 8.014589)"
                    >
                      <path
                        d="M18.8758691,0.0633386395 C25.2496586,-0.433798207 31.4937333,2.01624107 35.7477601,6.68350213 C40.5523688,11.9234794 42.2049886,19.2382835 40.1050075,25.9694939 C38.0050265,32.7007042 32.4581674,37.8683668 25.4803265,39.5943969 C23.6652484,40.2171564 21.672852,40.1197552 19.9303623,39.3230787 C18.3313413,38.4288703 17.6180613,36.5424742 18.2376233,34.8463288 C18.8203695,33.2455516 19.9581121,32.1060152 20.4853587,30.5323698 C21.6206061,27.509562 20.8264645,24.1165571 18.4596218,21.87732 C15.726307,19.4972869 11.8292183,18.8834054 8.46968638,20.3036746 C7.49844266,20.7106518 6.72144768,21.5246064 5.69470431,22.0129791 C4.36187359,22.7209309 2.72174247,22.5594942 1.55998103,21.6060018 C0.224692583,20.3227035 -0.304824298,18.4381871 0.17249,16.668011 C1.82970021,7.62409708 9.50943245,0.806107838 18.8758691,0.0633386395 Z M20.443734,2.8465408 C15.4030467,2.8465408 10.5945347,4.91831066 7.19319463,8.55559755 C4.98690602,10.9837693 3.48297284,13.9433806 2.83647278,17.1292519 C2.66997386,17.9432064 2.53122476,19.1098746 3.41921902,19.5711155 C4.15886975,19.8349555 4.98816163,19.6429185 5.52820539,19.0827428 C7.53053556,17.6011692 9.98266403,16.8179162 12.4934104,16.8579337 C15.4581518,16.8272129 18.3207852,17.9156667 20.4853587,19.8966973 C23.6409956,22.8542984 24.7273799,27.3473617 23.2603408,31.3734561 C22.9007905,32.4586484 22.3566667,33.4767976 21.6508512,34.3850879 C21.0403551,35.1447788 20.596358,36.447106 21.373353,37.0982697 C22.150348,37.7494333 23.843087,37.3695878 24.92533,37.0982697 C31.5300527,35.3504137 36.5512503,30.0941258 37.8844963,23.5323609 L37.9122461,23.5323609 C38.9692653,18.1702488 37.4097333,12.6328158 33.6942734,8.55559755 C30.2929333,4.91831066 25.4844213,2.8465408 20.443734,2.8465408 Z M29.310305,26.1098835 C30.9652139,26.1098835 32.3067825,27.4215748 32.3067825,29.0396279 C32.3067825,30.657681 30.9652139,31.9693723 29.310305,31.9693723 C27.6553962,31.9693723 26.3138275,30.657681 26.3138275,29.0396279 C26.3138275,27.4215748 27.6553962,26.1098835 29.310305,26.1098835 Z M32.5292842,17.5090974 C34.1841931,17.5090974 35.5257617,18.8207886 35.5257617,20.4388417 C35.5257617,22.0568949 34.1841931,23.3685861 32.5292842,23.3685861 C30.8743754,23.3685861 29.5328067,22.0568949 29.5328067,20.4388417 C29.5328067,18.8207886 30.8743754,17.5090974 32.5292842,17.5090974 Z M11.4077109,8.90829579 C13.0441011,8.92094419 14.3674776,10.2148484 14.3804141,11.8147954 C14.3900291,13.0039487 13.663507,14.080818 12.5416616,14.5402406 C11.4198161,14.9996632 10.1252263,14.7504877 9.26518811,13.909603 C8.40514995,13.0687184 8.15029876,11.8029598 8.62018601,10.7060984 C9.09007325,9.609237 10.1914713,8.89889493 11.4077109,8.90829579 Z M29.2586963,8.71858866 C30.9135285,8.70576455 32.2656776,10.006981 32.2788285,11.624959 C32.2919795,13.2429371 30.9611525,14.5650003 29.3063208,14.5778924 C28.5115981,14.5840837 27.7469123,14.2813373 27.1804984,13.736259 C26.6140845,13.1911806 26.2923441,12.4484242 26.2860618,11.6713999 C26.2729803,10.0534214 27.603864,8.73141277 29.2586963,8.71858866 Z M20.4581122,4.83853854 C22.1130211,4.83853854 23.4545897,6.15022977 23.4545897,7.76828291 C23.4545897,9.38633605 22.1130211,10.6980273 20.4581122,10.6980273 C18.8032034,10.6980273 17.4616347,9.38633605 17.4616347,7.76828291 C17.4616347,6.15022977 18.8032034,4.83853854 20.4581122,4.83853854 Z"
                        id="Combined-Shape"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div class="state-dots-wrap">
            <span>{{ states[currentState] }}</span>
            <div *ngIf="states[currentState] != base" class="dots">
              <div
                class="dot"
                [ngClass]="{
                  active: states[currentState] === 'Low Saturation'
                }"
              ></div>
              <div
                class="dot"
                [ngClass]="{
                  active: states[currentState] === 'High Saturation'
                }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Desaturated' }"
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
export class SaturateComponent extends AccessibilityComponent {
  constructor(){
    super()
    this.currentState = super.setLogic('astralAccessibility_saturateState')
  }
  document = inject(DOCUMENT);

  currentState = super.getState('astralAccessibility_saturateState');
  base = 'Saturation';
  states = [this.base, 'Low Saturation', 'High Saturation', 'Desaturated'];

  nextState() {
    this.currentState = super.changeState(this.currentState, 'astralAccessibility_saturateState', this.states.length)

    this._runStateLogic();
  }

  protected override _runStateLogic() {
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
