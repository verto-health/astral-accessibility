import { Injectable } from "@angular/core";

const PREFIX = "astral_";

@Injectable({ providedIn: "root" })
export class AstralStateService {
  saveState(key: string, stateIndex: number): void {
    sessionStorage.setItem(PREFIX + key, String(stateIndex));
  }

  loadState(key: string): number {
    const saved = sessionStorage.getItem(PREFIX + key);
    if (saved === null) return 0;
    const n = parseInt(saved, 10);
    return isNaN(n) || n < 0 ? 0 : n;
  }
}
