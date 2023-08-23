import { DOCUMENT, NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AstralCheckmarkSvgComponent } from '../util/astral-checksvg.component';

@Component({
  standalone: true,
  template: ``,
  imports: [NgIf, NgClass, AstralCheckmarkSvgComponent],
})
export class AccessabilityComponent {
  constructor(){
  }

  changeState(currentState: number, state: string){
    currentState += 1;
    currentState = currentState % 4;
    this.saveState(state, JSON.stringify(currentState));
    return currentState
  }

  saveState(key: string, value: string){
    localStorage.setItem(key, value);
  }
  getState(key: string){
    const textSizeState = localStorage.getItem(key);
    return Number(textSizeState);
  }
}
