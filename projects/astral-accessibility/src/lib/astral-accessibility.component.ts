import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ContrastComponent } from './controls/contrast.component';
import { InvertComponent } from './controls/invert.component';
import { SaturateComponent } from './controls/saturate.component';
import { TextSizeComponent } from './controls/text-size.component';
import { TextSpacingComponent } from './controls/text-spacing.component';
import { ScreenReaderComponent } from './controls/screen-reader.component';

@Component({
  selector: 'ally-by-verto',
  templateUrl: './astral-accessibility.component.html',
  styleUrls: ['./astral-accessibility.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    InvertComponent,
    ContrastComponent,
    SaturateComponent,
    TextSizeComponent,
    TextSpacingComponent,
    ScreenReaderComponent,
  ],
})
export class AstralAccessibilityComponent {
  modalVisible = false;
}
