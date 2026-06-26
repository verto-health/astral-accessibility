import { DOCUMENT, NgIf, NgClass } from "@angular/common";
import { Component, inject, NgZone, Renderer2 } from "@angular/core";
import { Subscription } from "rxjs";
import { AstralCheckmarkSvgComponent } from "../util/astral-checksvg.component";
import { AstralTranslationService } from "../astral-translation.service";
import { AstralStateService } from "../astral-state.service";

@Component({
  selector: "astral-screen-reader",
  standalone: true,
  template: `
    <button
      [disabled]="!synthesisAvailable"
      (click)="nextState()"
      [ngClass]="{
        'in-use': states[currentState] != base,
        'disabled-button': !synthesisAvailable
      }"
    >
      <div class="title">
        <div class="icon-state-wrap">
          <div
            class="icon action-icon d-flex align-items-center"
            [ngClass]="{
              inactive: states[currentState] == base,
              active: states[currentState] != base,
              disabled: !synthesisAvailable
            }"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 40 27"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="vlgiro5t1a">
                  <path d="M1440 0v900H0V0h1440z" />
                </clipPath>
                <clipPath id="avls4jsytb">
                  <path
                    d="M13.956 0a1.266 1.266 0 0 1 1.26 1.058L19 23.735l3.277-19.642a1.266 1.266 0 0 1 2.486-.07l3.184 14.086 1.909-6.482a1.266 1.266 0 0 1 2.417-.043l1.294 3.877.52-1.563a1.267 1.267 0 0 1 1.203-.864h2.077a.633.633 0 1 1 0 1.265H35.29l-.52 1.562a1.267 1.267 0 0 1-2.403 0l-1.296-3.877-1.909 6.482c-.162.553-.679.926-1.255.907a1.25 1.25 0 0 1-1.196-.985L23.527 4.304 20.25 23.943A1.247 1.247 0 0 1 19 25a1.247 1.247 0 0 1-1.25-1.057L13.966 1.268l-2.748 18.294a1.266 1.266 0 0 1-2.478.131L6.177 9.882l-1.63 3.668a1.267 1.267 0 0 1-1.159.749H.633a.633.633 0 1 1 0-1.265h2.755l1.632-3.67a1.267 1.267 0 0 1 2.383.195l2.563 9.812 2.748-18.293A1.266 1.266 0 0 1 13.956 0z"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#vlgiro5t1a)" transform="translate(-1084 -271)">
                <g clip-path="url(#avls4jsytb)" transform="translate(1085 272)">
                  <path fill="#FFF" d="M0 0h38v25H0V0z" />
                </g>
                <path
                  d="M1104 297a1.247 1.247 0 0 1-1.25-1.057l-3.784-22.675-2.748 18.294a1.266 1.266 0 0 1-2.478.131l-2.563-9.811-1.63 3.668a1.267 1.267 0 0 1-1.159.749h-2.755a.633.633 0 1 1 0-1.265h2.755l1.632-3.67a1.267 1.267 0 0 1 2.383.195l2.563 9.812 2.748-18.293a1.266 1.266 0 0 1 2.502-.02l3.784 22.677 3.277-19.642a1.266 1.266 0 0 1 2.486-.07l3.184 14.086 1.909-6.482a1.266 1.266 0 0 1 2.417-.043l1.294 3.877.52-1.563a1.267 1.267 0 0 1 1.203-.864h2.077a.633.633 0 1 1 0 1.265h-2.077l-.52 1.562a1.267 1.267 0 0 1-2.403 0l-1.296-3.877-1.909 6.482c-.162.553-.679.926-1.255.907a1.25 1.25 0 0 1-1.196-.985l-3.184-14.084-3.277 19.639A1.247 1.247 0 0 1 1104 297z"
                  stroke="#FFF"
                  fill="none"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
          </div>

          <div class="state-dots-wrap">
            <span>{{
              synthesisAvailable ? labels[currentState] : unavailableLabel
            }}</span>
            <div
              class="dots"
              [ngClass]="{ inactive: states[currentState] === base }"
            >
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Read Normal' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Read Fast' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState] === 'Read Slow' }"
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
export class ScreenReaderComponent {
  private renderer = inject(Renderer2);
  private translation = inject(AstralTranslationService);
  private ngZone = inject(NgZone);

  globalListenFunction: Function;
  private langSub: Subscription;
  speech = new SpeechSynthesisUtterance();
  userAgent = navigator.userAgent;
  isApple = false;
  isEdgeAndroid = false;
  synthesisAvailable = true;
  stateService = inject(AstralStateService);
  private readonly STORAGE_KEY = "screen_reader";

  get labels(): string[] {
    return [
      this.translation.t("screenReader.base"),
      this.translation.t("screenReader.readNormal"),
      this.translation.t("screenReader.readFast"),
      this.translation.t("screenReader.readSlow"),
    ];
  }

  get unavailableLabel(): string {
    return this.translation.t("screenReader.unavailable");
  }

  readText(x: number, y: number) {
    let element = document.elementFromPoint(x, y);

    if (element) {
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
  }

  getDefaultVoice(
    voices: Array<SpeechSynthesisVoice>,
    isApple = false,
    isEdgeAndroid = false,
  ) {
    // Note: Edge Android doesn't have any voices, but still works without setting the voice
    if (voices.length > 0 || isEdgeAndroid) {
      this.synthesisAvailable = true;
    } else {
      this.synthesisAvailable = false;
      return null;
    }

    const baseLang = this.translation.currentLang.split("-")[0];

    // use voice Daniel whenever available (English only)
    if (baseLang === "en") {
      const danielIndex = voices.findIndex((v) =>
        v.name.toUpperCase().includes("DANIEL"),
      );
      if (danielIndex) {
        this.synthesisAvailable = true;
        return voices[danielIndex];
      }
    }

    // pick a voice matching the current language, avoiding Flo
    let filtered = voices.filter((voice) =>
      new RegExp(`^${baseLang}`, "i").test(voice.lang),
    );
    if (!filtered.length) {
      return null;
    }
    let i = 0;
    while (
      i < filtered.length &&
      !filtered[i].default &&
      !filtered[i].voiceURI.toUpperCase().includes("FLO")
    ) {
      i++;
    }
    return filtered[i] ?? filtered[0] ?? null;
  }

  ngOnInit() {
    const apple = /iPhone|iPad|iPod|Safari/i;
    const edgeAndroid = /EdgA/i;

    if (apple.test(this.userAgent) && !/Chrome/.test(this.userAgent)) {
      this.isApple = true;
    } else if (edgeAndroid.test(this.userAgent)) {
      this.isEdgeAndroid = true;
    }

    // How to use Web Speech API
    // https://betterprogramming.pub/convert-text-to-speech-using-web-speech-api-in-javascript-c9710bbb2d41

    let voices = [];
    voices = speechSynthesis.getVoices();

    // default settings, currently user has no way of modifying these
    this.speech.voice = this.getDefaultVoice(
      voices,
      this.isApple,
      this.isEdgeAndroid,
    );
    this.speech.lang = this.translation.currentLang;
    this.speech.rate = 1;
    this.speech.pitch = 1;
    this.speech.volume = 1;

    // Voices doesn't get immediately returned sometimes
    // https://www.bennadel.com/blog/3955-having-fun-with-the-speechsynthesis-api-in-angular-11-0-5.htm
    if (!voices.length) {
      speechSynthesis.addEventListener("voiceschanged", () => {
        this.ngZone.run(() => {
          voices = speechSynthesis.getVoices();
          this.speech.voice = this.getDefaultVoice(
            voices,
            this.isApple,
            this.isEdgeAndroid,
          );
        });
      });
    }

    this.langSub = this.translation.langChange.subscribe((lang) => {
      this.ngZone.run(() => {
        this.speech.lang = lang;
        const currentVoices = speechSynthesis.getVoices();
        if (currentVoices.length) {
          this.speech.voice = this.getDefaultVoice(
            currentVoices,
            this.isApple,
            this.isEdgeAndroid,
          );
        } else {
          // voices not yet loaded — don't call getDefaultVoice (it would set
          // synthesisAvailable = false); voiceschanged will pick the right
          // voice once they arrive
          this.speech.voice = null;
        }
      });
    });

    // find the element that the user tapped/clicked on
    this.globalListenFunction = this.renderer.listen(
      "document",
      "click",
      (e) => {
        this.readText(e.x, e.y);
      },
    );
    this.globalListenFunction = this.renderer.listen(
      "document",
      "touchstart",
      (e) => {
        var touch = e.touches[0] || e.changedTouches[0];
        this.readText(touch.pageX, touch.pageY);
      },
    );

    // restore persisted state
    this.currentState = this.stateService.loadState(this.STORAGE_KEY);
    if (this.currentState !== 0) {
      this._runStateLogic();
    }
  }

  ngOnDestroy() {
    this.globalListenFunction?.();
    this.langSub?.unsubscribe();
  }

  document = inject(DOCUMENT);

  currentState = 0;
  base = "Screen Reader";
  states = [this.base, "Read Normal", "Read Fast", "Read Slow"];

  _style: HTMLStyleElement;

  nextState() {
    this.currentState += 1;
    this.currentState = this.currentState % 4;
    this._runStateLogic();
    this.stateService.saveState(this.STORAGE_KEY, this.currentState);
  }

  private _runStateLogic() {
    this._style?.remove?.();
    this._style = this.document.createElement("style");

    if (this.states[this.currentState] === "Read Normal") {
      this.speech.rate = 0.8;
    }

    if (this.states[this.currentState] === "Read Fast") {
      this.speech.rate = this.isApple ? 1.3 : 1.7;
    }

    if (this.states[this.currentState] === "Read Slow") {
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
