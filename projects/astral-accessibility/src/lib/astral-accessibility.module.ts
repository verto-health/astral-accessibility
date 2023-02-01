import { NgModule } from '@angular/core';
import { AstralAccessibilityComponent } from './astral-accessibility.component';
import { AstralCheckmarkSvgComponent } from './util/astral-checksvg.component';

@NgModule({
  declarations: [AstralCheckmarkSvgComponent],
  imports: [AstralAccessibilityComponent],
  exports: [AstralAccessibilityComponent],
})
export class AstralAccessibilityModule {}
