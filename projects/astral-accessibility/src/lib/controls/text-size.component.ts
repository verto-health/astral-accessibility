import { NgClass } from "@angular/common";
import { Component, inject, signal, DOCUMENT } from "@angular/core";
import { AstralCheckmarkSvgComponent } from "../util/astral-checksvg.component";
import { AstralTranslationService } from "../astral-translation.service";
import { AstralStateService } from "../astral-state.service";

@Component({
  selector: "astral-text-size",
  template: `
    <button
      (click)="nextState()"
      [ngClass]="{ 'in-use': states[currentState()] !== base }"
    >
      <div class="title">
        <div class="icon-state-wrap">
          <div
            class="icon action-icon "
            [ngClass]="{
              inactive: states[currentState()] == base,
              active: states[currentState()] != base
            }"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 26 21"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="26ttiz3qla">
                  <path d="M1440 0v900H0V0h1440z" />
                </clipPath>
                <clipPath id="gg0ujnavhb">
                  <path
                    d="M20.09 0c.654 0 1.183.522 1.183 1.167V3.24c0 .644-.53 1.167-1.182 1.167a1.174 1.174 0 0 1-1.182-1.167v-.907h-7.09v16.334h3.02c.653 0 1.182.522 1.182 1.166 0 .645-.53 1.167-1.182 1.167H6.434a1.174 1.174 0 0 1-1.182-1.167c0-.644.53-1.166 1.182-1.166h3.02V2.333h-7.09v.907c0 .644-.53 1.167-1.182 1.167A1.174 1.174 0 0 1 0 3.24V1.167C0 .522.53 0 1.182 0H20.09zm4.728 9.683c.653 0 1.182.523 1.182 1.167v1.633c0 .645-.53 1.167-1.182 1.167a1.174 1.174 0 0 1-1.182-1.167v-.466h-1.772v6.65h1.3c.652 0 1.181.522 1.181 1.166 0 .645-.529 1.167-1.181 1.167H18.2a1.174 1.174 0 0 1-1.182-1.167c0-.644.53-1.166 1.182-1.166h1.3v-6.65h-1.773v.466c0 .645-.529 1.167-1.182 1.167a1.174 1.174 0 0 1-1.181-1.167V10.85c0-.644.529-1.167 1.181-1.167h8.273z"
                  />
                </clipPath>
              </defs>
              <g clip-path="url(#26ttiz3qla)" transform="translate(-1091 -581)">
                <g clip-path="url(#gg0ujnavhb)" transform="translate(1091 581)">
                  <path fill="#FFF" d="M0 0h26v21H0V0z" />
                </g>
              </g>
            </svg>
          </div>

          <div class="state-dots-wrap">
            <span>{{ labels[currentState()] }}</span>
            <div
              class="dots"
              [ngClass]="{ inactive: states[currentState()] === base }"
            >
              <div
                class="dot"
                [ngClass]="{ active: states[currentState()] === 'Medium Text' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{ active: states[currentState()] === 'Large Text' }"
              ></div>
              <div
                class="dot"
                [ngClass]="{
                  active: states[currentState()] === 'Extra Large Text'
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <astral-widget-checkmark
        [isActive]="states[currentState()] !== base"
      ></astral-widget-checkmark>
    </button>
  `,
  imports: [NgClass, AstralCheckmarkSvgComponent],
})
export class TextSizeComponent {
  document = inject(DOCUMENT);
  stateService = inject(AstralStateService);
  private translation = inject(AstralTranslationService);
  private readonly STORAGE_KEY = "text_size";

  currentState = signal(0);
  currentScale = 1;
  base = "Bigger Text";
  states = [this.base, "Medium Text", "Large Text", "Extra Large Text"];
  // Per element: the inline styles it had before we touched it, plus its
  // *unscaled* font size in px. Scaling is always derived from `baseFontSize`,
  // never from the element's current computed size — see `updateTextSize`.
  //
  // Entries live as long as the element does. `inline` is how we undo our
  // changes, and an element parked off-screen can only be repaired when it
  // comes back if we still hold its entry, so this map is never cleared.
  private initialStyles = new WeakMap<
    HTMLElement,
    { inline: Record<string, string>; baseFontSize: number; generation: number }
  >();

  // Bumped whenever scaling is switched off, to retire every recorded
  // `baseFontSize` without discarding the `inline` records alongside them.
  private baseGeneration = 0;

  _style: HTMLStyleElement;

  private _rescaleFrame: ReturnType<typeof requestAnimationFrame> | null = null;

  targetNode = document.body;
  config = { attributes: true, childList: true, subtree: true };

  private observer = new MutationObserver(() => {
    if (this._rescaleFrame !== null) cancelAnimationFrame(this._rescaleFrame);
    this._rescaleFrame = requestAnimationFrame(() => {
      this._rescaleFrame = null;
      this.observer.disconnect();
      this._restoreThenApply(this.currentScale);
      this.observer.observe(this.targetNode, this.config);
    });
  });

  ngOnInit() {
    this.currentState.set(this.stateService.loadState(this.STORAGE_KEY));
    if (this.currentState() !== 0) {
      this._runStateLogic();
      this.observer.observe(this.targetNode, this.config);
    }
  }

  // Restore, then re-apply, with CSS transitions switched off for the duration.
  //
  // Both halves measure elements, and a measurement is only trustworthy once
  // the browser has settled the value. Host apps transition font-size (the FHA
  // navbar uses `transition: all 0.2s ease`), so clearing an inline font-size
  // *starts* a transition rather than completing it, and a measurement taken
  // straight afterwards returns the old, still-scaled size. Caching that as a
  // base size is what made the text compound. Suppressing transitions makes
  // every read exact regardless of what is in flight.
  private _restoreThenApply(scale: number) {
    const style = this.document.createElement("style");
    style.textContent = `*, *::before, *::after { transition: none !important; }`;
    this.document.head.appendChild(style);
    // Force a style flush so the suppression is in effect for the reads below.
    void this.document.body.offsetHeight;

    try {
      this.restoreTextSize(this.document.body);
      this.updateTextSize(this.document.body, scale);
    } finally {
      style.remove();
    }
  }

  ngOnDestroy() {
    // Without this the observer keeps watching document.body after Angular has
    // destroyed the component, re-scaling the page on every mutation forever.
    if (this._rescaleFrame !== null) cancelAnimationFrame(this._rescaleFrame);
    this.observer.disconnect();

    // Put the page back. Our inline sizes outlive the component, and the
    // records that could undo them are held here — so a host app that removes
    // the widget while scaling is on would leave the page permanently enlarged
    // with no control left to undo it. Worse, re-creating the widget would
    // measure that enlarged text as if it were the natural size and scale it
    // again.
    this.restoreTextSize(this.document.body);
  }

  get labels(): string[] {
    return [
      this.translation.t("textSize.base"),
      this.translation.t("textSize.medium"),
      this.translation.t("textSize.large"),
      this.translation.t("textSize.extraLarge"),
    ];
  }

  updateTextSize(node: HTMLElement, scale: number) {
    const children = node.children;
    const excludeNodes = ["SCRIPT", "ASTRAL-ACCESSIBILITY"];
    if (children.length > 0) {
      for (const child of children) {
        if (!excludeNodes.includes(child.nodeName))
          this.updateTextSize(child as HTMLElement, scale);
      }
    }

    // Form controls (e.g. <select>) render their own text independently of
    // their children, so scale them directly even though they have child nodes.
    const formControls = ["INPUT", "SELECT", "TEXTAREA", "BUTTON"];

    if (
      Array.from(node.childNodes).some(
        (child) =>
          child.nodeType === child.TEXT_NODE &&
          child.nodeValue?.replace(/\s*/i, "")?.length,
      ) ||
      children.length === 0 ||
      formControls.includes(node.nodeName)
    ) {
      // Record the element's unscaled size the first time we see it, and keep
      // it for as long as scaling stays on. Callers restore the document before
      // re-applying, so the size read here is the element's own base size,
      // never a size we produced.
      let saved = this.initialStyles.get(node);
      if (!saved) {
        const measured = parseFloat(window.getComputedStyle(node).fontSize);
        saved = {
          inline: {
            "font-size": node.style.fontSize,
            "line-height": node.style.lineHeight,
            "word-spacing": node.style.wordSpacing,
          },
          baseFontSize: Number.isFinite(measured) ? measured : 0,
          generation: Number.isFinite(measured) ? this.baseGeneration : -1,
        };
        this.initialStyles.set(node, saved);
        if (!Number.isFinite(measured)) return;
      } else if (saved.generation !== this.baseGeneration) {
        // Scaling has been off since we last measured this element, so nothing
        // of ours is mid-transition and it is safe to read its size again.
        // This is what picks up anything the app restyled while we were off.
        const measured = parseFloat(window.getComputedStyle(node).fontSize);
        if (Number.isFinite(measured)) saved.baseFontSize = measured;
        saved.generation = this.baseGeneration;
      }

      // Always derive from the base size, so re-applying the same scale is
      // idempotent. Deriving from the *current* computed size instead made every
      // re-application multiply on top of the last one: each SPA route change
      // re-rendered the DOM, re-fired the observer and grew the text by another
      // `scale` factor, without bound.
      //
      // Apply with `important` priority so the accessibility override wins over
      // app stylesheet rules that use `!important` (e.g. `font-size: 18px !important`).
      // A normal inline style loses to an author `!important` rule in the cascade,
      // which otherwise leaves such elements (e.g. labels/captions) unscaled.
      node.style.setProperty(
        "font-size",
        `${saved.baseFontSize * scale}px`,
        "important",
      );
      node.style.lineHeight = `initial`;
      node.style.wordSpacing = `initial`;
    }
  }

  restoreTextSize(node: HTMLElement) {
    const children = node.children;
    const saved = this.initialStyles.get(node);
    if (saved) {
      for (const [key, value] of Object.entries(saved.inline)) {
        // removeProperty rather than setProperty(key, value): both drop the
        // `important` flag we applied, but clearing first states the intent
        // and handles the common case where the original inline value was "".
        node.style.removeProperty(key);
        if (value) node.style.setProperty(key, value);
      }
    }

    for (const child of children) {
      this.restoreTextSize(child as HTMLElement);
    }
  }

  nextState() {
    this.observer.disconnect();
    this.currentState.update((v) => (v + 1) % 4);

    this._runStateLogic();
    this.stateService.saveState(this.STORAGE_KEY, this.currentState());
    if (this.currentState() !== 0) {
      this.observer.observe(this.targetNode, this.config);
    }
  }

  private _runStateLogic() {
    if (this.states[this.currentState()] === "Medium Text") {
      this.currentScale = 1.2;
    }

    if (this.states[this.currentState()] === "Large Text") {
      this.currentScale = 1.5;
    }

    if (this.states[this.currentState()] === "Extra Large Text") {
      this.currentScale = 1.8;
    }

    if (!(this.states[this.currentState()] === this.base)) {
      // Restore before applying: elements added since the last pass must be
      // measured at their base size, which means no ancestor may still be
      // carrying a scaled font-size when we read them.
      this._restoreThenApply(this.currentScale);
    } else {
      this.restoreTextSize(document.body);
      this.currentScale = 1;
      // Retire the recorded sizes so the next switch-on measures the page
      // afresh and picks up anything the app has restyled since. The `inline`
      // records stay: they are how we undo our changes, and an element parked
      // off-screen while scaling was switched off can only be repaired when it
      // comes back if we still know we touched it.
      //
      // Deliberately not re-measuring on every restore instead. Host apps
      // transition font-size (the FHA navbar uses `transition: all 0.2s`), and
      // clearing an inline font-size starts that transition rather than
      // completing it — so a measurement taken immediately afterwards returns
      // the *old, scaled* size. Caching that as the new base is what made the
      // text compound in the first place. Re-measuring on switch-on is safe
      // because scaling has been off in between.
      this.baseGeneration++;
    }
  }
}
