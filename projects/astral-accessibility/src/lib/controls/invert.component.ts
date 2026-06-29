import { DOCUMENT, NgClass } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AstralStateService } from "../astral-state.service";

@Component({
  selector: "astral-invert",
  standalone: true,
  template: `
    <button
      (click)="inverted ? removeInvertCss() : invertPage()"
      [ngClass]="{ 'in-use': inverted }"
    >
      <!-- <img engage-asset src="../../assets/images/accessibility.png"/> -->
      <div class="d-flex align-items-center">
        <i
          class="pi pi-minus-circle icon action-icon "
          [ngClass]="{ inactive: !inverted, active: inverted }"
        ></i>
        <span>Invert Colours</span>
      </div>
      @if (inverted) {
      <i
        class="pi pi-check icon active active-check"
        style="font-weight: 900"
      ></i>
      }
    </button>
  `,
  imports: [NgClass],
})
export class InvertComponent {
  document = inject(DOCUMENT);
  stateService = inject(AstralStateService);
  private readonly STORAGE_KEY = "invert";

  get inverted() {
    return this.document.documentElement.classList.contains("astral_inverted");
  }

  // Note: component is not rendered until <astral-invert> is uncommented in astral-accessibility.component.html
  ngOnInit() {
    if (this.stateService.loadState(this.STORAGE_KEY) === 1) {
      this.document.documentElement.classList.add("astral_inverted");
    }
  }

  invertPage() {
    this.document.documentElement.classList.add("astral_inverted");
    this.stateService.saveState(this.STORAGE_KEY, 1);
  }

  removeInvertCss() {
    this.document.documentElement.classList.remove("astral_inverted");
    this.stateService.saveState(this.STORAGE_KEY, 0);
  }
}
