import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'astral-invert',
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
      <i *ngIf="inverted" class="pi pi-check icon active active-check" style="font-weight: 900"></i>
    </button>
  `,
  imports: [NgIf, NgClass],
})
export class InvertComponent {
  document = inject(DOCUMENT);

  get inverted() {
    return this.document.documentElement.classList.contains('astral_inverted');
  }

  invertPage() {
    this.document.documentElement.classList.add('astral_inverted');
  }

  removeInvertCss() {
    this.document.documentElement.classList.remove('astral_inverted');
  }
}
