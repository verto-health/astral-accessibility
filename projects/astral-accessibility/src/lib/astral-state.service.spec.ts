import { TestBed } from "@angular/core/testing";
import { AstralStateService } from "./astral-state.service";

describe("AstralStateService", () => {
  let service: AstralStateService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstralStateService);
  });

  it("should return 0 when nothing is saved", () => {
    expect(service.loadState("contrast")).toBe(0);
  });

  it("should return the saved index after saveState", () => {
    service.saveState("contrast", 2);
    expect(service.loadState("contrast")).toBe(2);
  });

  it("should namespace keys with astral_ prefix", () => {
    service.saveState("contrast", 1);
    expect(sessionStorage.getItem("astral_contrast")).toBe("1");
  });

  it("should overwrite a previously saved value", () => {
    service.saveState("saturate", 1);
    service.saveState("saturate", 3);
    expect(service.loadState("saturate")).toBe(3);
  });

  it("should return 0 when storage contains a non-numeric string", () => {
    sessionStorage.setItem("astral_contrast", "corrupted");
    expect(service.loadState("contrast")).toBe(0);
  });
});
