import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AstralAccessibilityComponent } from 'dist/astral-accessibility';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AstralAccessibilityComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
