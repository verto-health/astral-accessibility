import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'ally-screen-reader',
  standalone: true,
  template: `
    <button (click)="nextState()" [ngClass]="{ 'in-use': states[currentState] != base }">
      <div class="title">
        <div class="icon-state-wrap">
          <i
            class="pi pi-volume-up icon action-icon "
            [ngClass]="{
              inactive: states[currentState] == base,
              active: states[currentState] != base
            }"
          ></i>
          <div class="state-dots-wrap">
            <span>{{ states[currentState] }}</span>
            <div class="dots" [ngClass]="{ inactive: states[currentState] === base }">
              <div class="dot" [ngClass]="{ active: states[currentState] === 'Read Normal' }"></div>
              <div class="dot" [ngClass]="{ active: states[currentState] === 'Read Fast' }"></div>
              <div class="dot" [ngClass]="{ active: states[currentState] === 'Read Slow' }"></div>
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
export class ScreenReaderComponent {
  globalListenFunction: Function;
  speech = new SpeechSynthesisUtterance();

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // How to use Web Speech API
    // https://betterprogramming.pub/convert-text-to-speech-using-web-speech-api-in-javascript-c9710bbb2d41

    let voices = [];
    voices = speechSynthesis.getVoices();

    // default settings, currently user has no way of modifying these
    this.speech.voice = voices[0] || null;
    this.speech.lang = 'en';
    this.speech.voice = voices[0];
    this.speech.rate = 1;
    this.speech.pitch = 1;
    this.speech.volume = 1;

    // Voices doesn't get immediately returned sometimes
    // https://www.bennadel.com/blog/3955-having-fun-with-the-speechsynthesis-api-in-angular-11-0-5.htm
    if (!voices.length) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        voices = speechSynthesis.getVoices();
        this.speech.voice = voices[0] || null;
      });
    }

    // find the element that the user tapped/clicked on
    this.globalListenFunction = this.renderer.listen('document', 'click', (e) => {
      let element = document.elementFromPoint(e.x, e.y);

      if(element) {
        if (this.states[this.currentState] != this.base) {
          if (element.ariaLabel) {
            // it has aria-label, use aria-label
            this.speech.text = element.ariaLabel;
          } else {
            // otherwise get text content
            this.speech.text = element.textContent || "";
          }
          // cancel before speech, otherwise doesn't work
          speechSynthesis.cancel();
          speechSynthesis.speak(this.speech);
        }
      }
    });
  }

  ngOnDestroy() {
    // remove listener
    this.globalListenFunction();
  }

  document = inject(DOCUMENT);

  currentState = 0;
  base = 'Screen Reader';
  states = [this.base, 'Read Normal', 'Read Fast', 'Read Slow'];

  _style: HTMLStyleElement;

  nextState() {
    this.currentState += 1;
    this.currentState = this.currentState % 4;

    this._runStateLogic();
  }

  private _runStateLogic() {
    this._style?.remove?.();
    this._style = this.document.createElement('style');

    if (this.states[this.currentState] === 'Read Normal') {
      this.speech.rate = 1;
    }

    if (this.states[this.currentState] === 'Read Fast') {
      this.speech.rate = 2;
    }

    if (this.states[this.currentState] === 'Read Slow') {
      this.speech.rate = 0.4;
    }

    if (this.states[this.currentState] === this.base) {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    }

    this.document.body.appendChild(this._style);
  }
}
