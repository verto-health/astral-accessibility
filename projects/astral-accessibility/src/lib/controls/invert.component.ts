import { DOCUMENT, NgIf, NgClass } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";

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
      <i
        *ngIf="inverted"
        class="pi pi-check icon active active-check"
        style="font-weight: 900"
      ></i>
    </button>
  `,
  imports: [NgIf, NgClass],
})
export class InvertComponent implements OnInit {
  document = inject(DOCUMENT);
  private readonly STATE_KEY = "astral-invert-enabled";

  get inverted() {
    return this.document.documentElement.classList.contains("astral_inverted");
  }

  ngOnInit(): void {
    const storedState = sessionStorage.getItem(this.STATE_KEY);
    if (storedState === "true") {
      this.invertPage();
    } else if (storedState === "false") {
      // Ensure it's removed if explicitly set to false,
      // though default state might already be non-inverted.
      this.removeInvertCss();
    }
  }

  invertPage() {
    this.document.documentElement.classList.add("astral_inverted");
    sessionStorage.setItem(this.STATE_KEY, "true");
  }

  removeInvertCss() {
    this.document.documentElement.classList.remove("astral_inverted");
    sessionStorage.setItem(this.STATE_KEY, "false");
  }
}
