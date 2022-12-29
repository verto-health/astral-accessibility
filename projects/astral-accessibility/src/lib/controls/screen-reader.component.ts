import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject, Renderer2 } from '@angular/core';

@Component({
  selector: 'astral-screen-reader',
  standalone: true,
  template: `
    <button (click)="nextState()" [ngClass]="{ 'in-use': states[currentState] != base }">
      <div class="title">
        <div class="icon-state-wrap">
          <!-- <i
            class="pi pi-volume-up icon action-icon "
            [ngClass]="{
              inactive: states[currentState] == base,
              active: states[currentState] != base
            }"
          ></i> -->
          <div
            class="icon action-icon d-flex align-items-center"
            [ngClass]="{
              inactive: states[currentState] == base,
              active: states[currentState] != base
            }"
          >
            <svg width="25" height="25" viewBox="0 0 40 27" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <clipPath id="vlgiro5t1a">
                  <path d="M1440 0v900H0V0h1440z"/>
                </clipPath>
                <clipPath id="avls4jsytb">
                  <path d="M13.956 0a1.266 1.266 0 0 1 1.26 1.058L19 23.735l3.277-19.642a1.266 1.266 0 0 1 2.486-.07l3.184 14.086 1.909-6.482a1.266 1.266 0 0 1 2.417-.043l1.294 3.877.52-1.563a1.267 1.267 0 0 1 1.203-.864h2.077a.633.633 0 1 1 0 1.265H35.29l-.52 1.562a1.267 1.267 0 0 1-2.403 0l-1.296-3.877-1.909 6.482c-.162.553-.679.926-1.255.907a1.25 1.25 0 0 1-1.196-.985L23.527 4.304 20.25 23.943A1.247 1.247 0 0 1 19 25a1.247 1.247 0 0 1-1.25-1.057L13.966 1.268l-2.748 18.294a1.266 1.266 0 0 1-2.478.131L6.177 9.882l-1.63 3.668a1.267 1.267 0 0 1-1.159.749H.633a.633.633 0 1 1 0-1.265h2.755l1.632-3.67a1.267 1.267 0 0 1 2.383.195l2.563 9.812 2.748-18.293A1.266 1.266 0 0 1 13.956 0z"/>
                </clipPath>
              </defs>
              <g clip-path="url(#vlgiro5t1a)" transform="translate(-1084 -271)">
                <g clip-path="url(#avls4jsytb)" transform="translate(1085 272)">
                  <path fill="#FFF" d="M0 0h38v25H0V0z"/>
                </g>
                <path d="M1104 297a1.247 1.247 0 0 1-1.25-1.057l-3.784-22.675-2.748 18.294a1.266 1.266 0 0 1-2.478.131l-2.563-9.811-1.63 3.668a1.267 1.267 0 0 1-1.159.749h-2.755a.633.633 0 1 1 0-1.265h2.755l1.632-3.67a1.267 1.267 0 0 1 2.383.195l2.563 9.812 2.748-18.293a1.266 1.266 0 0 1 2.502-.02l3.784 22.677 3.277-19.642a1.266 1.266 0 0 1 2.486-.07l3.184 14.086 1.909-6.482a1.266 1.266 0 0 1 2.417-.043l1.294 3.877.52-1.563a1.267 1.267 0 0 1 1.203-.864h2.077a.633.633 0 1 1 0 1.265h-2.077l-.52 1.562a1.267 1.267 0 0 1-2.403 0l-1.296-3.877-1.909 6.482c-.162.553-.679.926-1.255.907a1.25 1.25 0 0 1-1.196-.985l-3.184-14.084-3.277 19.639A1.247 1.247 0 0 1 1104 297z" stroke="#FFF" fill="none" stroke-linejoin="round"/>
              </g>
            </svg> 
          </div>

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
