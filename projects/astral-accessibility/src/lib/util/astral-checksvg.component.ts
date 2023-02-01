import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'astral-widget-checkmark',
  standalone: true,
  template: `
    <div *ngIf="isActive" class="icon active active-check">
      <svg
        width="17px"
        height="13px"
        viewBox="0 0 17 13"
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
            id="Different-States"
            transform="translate(-1004.000000, -279.000000)"
            fill="#000000"
          >
            <g
              id="Group-28-Copy-12"
              transform="translate(592.000000, 224.000000)"
            >
              <g id="Group-56" transform="translate(98.000000, 20.000000)">
                <g
                  id="Group-3-Copy-7"
                  transform="translate(296.000000, 16.000000)"
                >
                  <path
                    d="M34.5748969,22.1199038 L25.4067007,31.2161926 C24.8673951,31.7554982 24.004506,31.7914519 23.4292466,31.2521463 L18.5754957,26.8298399 C18.0002363,26.2905342 17.9642826,25.3916914 18.4676346,24.8164321 C19.0069402,24.2411727 19.905783,24.205219 20.4810424,24.7445246 L24.3280894,28.2679883 L32.5255354,20.0705423 C33.1007948,19.4952829 33.9996376,19.4952829 34.5748969,20.0705423 C35.1501563,20.6458016 35.1501563,21.5446444 34.5748969,22.1199038 Z"
                    id="Path"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  `,
  imports: [NgIf],
})
export class AstralCheckmarkSvgComponent {
  @Input() isActive: boolean;
}
