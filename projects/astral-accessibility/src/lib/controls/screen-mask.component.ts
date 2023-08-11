import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, Renderer2, inject } from '@angular/core';
import { AstralCheckmarkSvgComponent } from '../util/astral-checksvg.component';

@Component({
  selector: 'astral-screen-mask',
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
            version="1.1" 
            id="Layer_1" 
            xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            x="0px" y="0px" width="122.879px" height="119.799px" 
            viewBox="0 0 122.879 119.799" 
            enable-background="new 0 0 122.879 119.799" 
            xml:space="preserve">
                <g>
                    <path fill="#fff" d="M49.988,0h0.016v0.007C63.803,0.011,76.298,5.608,85.34,14.652c9.027,9.031,14.619,21.515,14.628,35.303h0.007v0.033v0.04 h-0.007c-0.005,5.557-0.917,10.905-2.594,15.892c-0.281,0.837-0.575,1.641-0.877,2.409v0.007c-1.446,3.66-3.315,7.12-5.547,10.307 l29.082,26.139l0.018,0.016l0.157,0.146l0.011,0.011c1.642,1.563,2.536,3.656,2.649,5.78c0.11,2.1-0.543,4.248-1.979,5.971 l-0.011,0.016l-0.175,0.203l-0.035,0.035l-0.146,0.16l-0.016,0.021c-1.565,1.642-3.654,2.534-5.78,2.646 c-2.097,0.111-4.247-0.54-5.971-1.978l-0.015-0.011l-0.204-0.175l-0.029-0.024L78.761,90.865c-0.88,0.62-1.778,1.209-2.687,1.765 c-1.233,0.755-2.51,1.466-3.813,2.115c-6.699,3.342-14.269,5.222-22.272,5.222v0.007h-0.016v-0.007 c-13.799-0.004-26.296-5.601-35.338-14.645C5.605,76.291,0.016,63.805,0.007,50.021H0v-0.033v-0.016h0.007 c0.004-13.799,5.601-26.296,14.645-35.338C23.683,5.608,36.167,0.016,49.955,0.007V0H49.988L49.988,0z M50.004,11.21v0.007h-0.016 h-0.033V11.21c-10.686,0.007-20.372,4.35-27.384,11.359C15.56,29.578,11.213,39.274,11.21,49.973h0.007v0.016v0.033H11.21 c0.007,10.686,4.347,20.367,11.359,27.381c7.009,7.012,16.705,11.359,27.403,11.361v-0.007h0.016h0.033v0.007 c10.686-0.007,20.368-4.348,27.382-11.359c7.011-7.009,11.358-16.702,11.36-27.4h-0.006v-0.016v-0.033h0.006 c-0.006-10.686-4.35-20.372-11.358-27.384C70.396,15.56,60.703,11.213,50.004,11.21L50.004,11.21z"/>
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
                [ngClass]="{ active: states[currentState] === 'Large Cursor' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{
                  active: states[currentState] === 'Reading Mask'
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
export class ScreenMaskComponent {
  constructor(private renderer: Renderer2) {}

  cursorY = 0;
  screenHeight: number = window.innerHeight;
  height = this.screenHeight - this.cursorY;
  listenersActive: boolean = false;

  screenMaskContainerStyle = `
  .screen-mask-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999; 
  }
  `;

  maskTopStyle = `
  .mask-top {
    position: absolute;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.55);
    pointer-events: none;
    border-bottom: 8px solid #0F2BA9;
    height: ${this.height - 114}px;
  }
  `;

  maskBottomStyle = `
  .mask-bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.55);
    pointer-events: none;
    border-top: 7px solid #5DCA8E;
    height: ${this.cursorY}px;
  }
  `;

  toggleListeners(active: boolean) {
    this.listenersActive = active;
    
    if (this.listenersActive) {
      this.addEventListeners();
      this.updateMaskStyles();
    } else {
      this.removeEventListeners();
    }
  }

  // Method to add the event listeners
  private addEventListeners() {
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('resize', this.onResize);
  }

  // Method to remove the event listeners
  private removeEventListeners() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.listenersActive) return; // Don't proceed if listeners are paused

    this.cursorY = event.clientY;
    this.height = this.screenHeight - this.cursorY;
    this.updateMaskStyles();
  }

  // Event listener method for resize
  private onResize = (event: any) => {
    if (!this.listenersActive) return; // Don't proceed if listeners are paused

    this.screenHeight = event.target.innerHeight;
    this.height = this.screenHeight - this.cursorY;
    this.updateMaskStyles();
  }

  updateMaskStyles() {
    const maskTop = document.querySelector('.mask-top');
    const maskBottom = document.querySelector('.mask-bottom');
  
    if (maskTop) {
      this.renderer.setStyle(maskTop, 'height', `${this.cursorY}px`);
    }
    if (maskBottom) {
      this.renderer.setStyle(maskBottom, 'height', `${this.height - 114}px`);
    }
  }

  document = inject(DOCUMENT);

  currentState = 0;
  base = 'Screen Mask';
  states = [this.base, 'Large Cursor', 'Reading Mask'];

  _style: HTMLStyleElement;

  nextState() {
    this.currentState += 1;
    this.currentState = this.currentState % 3;

    this._runStateLogic();
  }

  private _runStateLogic() {
    this._style?.remove?.();
    this._style = this.document.createElement('style');

    if (this.states[this.currentState] === 'Large Cursor') {
        this._style.textContent = `
        body, *{
          cursor: url('data:image/png;base64,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'), auto;
        }
        `;
    }

    if (this.states[this.currentState] === 'Reading Mask') {

      const screenMaskContainer = this.renderer.createElement('div');
      const maskTop = this.renderer.createElement('div');
      const maskBottom = this.renderer.createElement('div');
      
      this.renderer.addClass(screenMaskContainer, 'screen-mask-container');
      this.renderer.addClass(maskTop, 'mask-top');
      this.renderer.addClass(maskBottom, 'mask-bottom');

      const maskBottomCss = this.renderer.createElement('style');
      this.renderer.appendChild(maskBottomCss, this.renderer.createText(this.maskBottomStyle));
      this.renderer.appendChild(this.document.head, maskBottomCss);

      const maskTopCss = this.renderer.createElement('style');
      this.renderer.appendChild(maskTopCss, this.renderer.createText(this.maskTopStyle));
      this.renderer.appendChild(this.document.head, maskTopCss);

      const screenMaskContainerCss = this.renderer.createElement('style');
      this.renderer.appendChild(screenMaskContainerCss, this.renderer.createText(this.screenMaskContainerStyle));
      this.renderer.appendChild(this.document.head, screenMaskContainerCss);

      screenMaskContainer.appendChild(maskTop);
      screenMaskContainer.appendChild(maskBottom);
      this.document.body.appendChild(screenMaskContainer);

      this.toggleListeners(true);

    } else {
      const removeMaskContainer = document.querySelector('.screen-mask-container');
      if (removeMaskContainer) {
        this.renderer.removeChild(document.body, removeMaskContainer);
      }
      this.toggleListeners(false);
    }
    
    this.document.body.appendChild(this._style);
  }
}