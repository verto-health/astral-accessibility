import { Component } from "@angular/core";

@Component({
  standalone: true,
  template: ``,
  imports: [],
})
export abstract class AccessibilityComponent {
  constructor() {}

  changeState(currentState: number, state: string, numOfStates: number) {
    currentState += 1;
    currentState = currentState % numOfStates;
    this.saveState(state, JSON.stringify(currentState));
    return currentState;
  }

  saveState(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getState(key: string) {
    const textSizeState = localStorage.getItem(key);
    return Number(textSizeState);
  }

  setLogic(state: string) {
    const currentState = this.getState(state);
    if (currentState == null) {
      return 0;
    } else {
      this._runStateLogic();
      return currentState;
    }
  }

  protected _runStateLogic() {
    //to be overridden
  }
}
