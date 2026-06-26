import { TestBed } from "@angular/core/testing";
import { AstralStateService } from "../astral-state.service";
import { ContrastComponent } from "./contrast.component";
import { SaturateComponent } from "./saturate.component";
import { TextSpacingComponent } from "./text-spacing.component";
import { LineHeightComponent } from "./line-height.component";
import { InvertComponent } from "./invert.component";
import { TextSizeComponent } from "./text-size.component";
import { ScreenReaderComponent } from "./screen-reader.component";

describe("CSS-class component persistence", () => {
  let stateService: AstralStateService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    stateService = TestBed.inject(AstralStateService);
  });

  it("ContrastComponent restores saved currentState on init", () => {
    stateService.saveState("contrast", 2);
    const fixture = TestBed.createComponent(ContrastComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentState()).toBe(2);
  });

  it("ContrastComponent saves state on nextState()", () => {
    const fixture = TestBed.createComponent(ContrastComponent);
    fixture.detectChanges();
    fixture.componentInstance.nextState();
    expect(stateService.loadState("contrast")).toBe(1);
  });

  it("SaturateComponent restores saved currentState on init", () => {
    stateService.saveState("saturate", 3);
    const fixture = TestBed.createComponent(SaturateComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentState()).toBe(3);
  });

  it("SaturateComponent saves state on nextState()", () => {
    const fixture = TestBed.createComponent(SaturateComponent);
    fixture.detectChanges();
    fixture.componentInstance.nextState();
    expect(stateService.loadState("saturate")).toBe(1);
  });

  it("TextSpacingComponent restores saved currentState on init", () => {
    stateService.saveState("text_spacing", 1);
    const fixture = TestBed.createComponent(TextSpacingComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentState()).toBe(1);
  });

  it("TextSpacingComponent saves state on nextState()", () => {
    const fixture = TestBed.createComponent(TextSpacingComponent);
    fixture.detectChanges();
    fixture.componentInstance.nextState();
    expect(stateService.loadState("text_spacing")).toBe(1);
  });

  it("LineHeightComponent restores saved currentState on init", () => {
    stateService.saveState("line_height", 2);
    const fixture = TestBed.createComponent(LineHeightComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentState()).toBe(2);
  });

  it("LineHeightComponent saves state on nextState()", () => {
    const fixture = TestBed.createComponent(LineHeightComponent);
    fixture.detectChanges();
    fixture.componentInstance.nextState();
    expect(stateService.loadState("line_height")).toBe(1);
  });
});

describe("InvertComponent persistence", () => {
  let stateService: AstralStateService;

  beforeEach(() => {
    sessionStorage.clear();
    document.documentElement.classList.remove("astral_inverted");
    TestBed.configureTestingModule({});
    stateService = TestBed.inject(AstralStateService);
  });

  it("should apply invert class on init when state is saved as 1", () => {
    stateService.saveState("invert", 1);
    const fixture = TestBed.createComponent(InvertComponent);
    fixture.detectChanges();
    expect(
      document.documentElement.classList.contains("astral_inverted"),
    ).toBeTrue();
  });

  it("should not apply invert class on init when state is 0", () => {
    const fixture = TestBed.createComponent(InvertComponent);
    fixture.detectChanges();
    expect(
      document.documentElement.classList.contains("astral_inverted"),
    ).toBeFalse();
  });

  it("should save state 1 when invertPage() is called", () => {
    const fixture = TestBed.createComponent(InvertComponent);
    fixture.detectChanges();
    fixture.componentInstance.invertPage();
    expect(stateService.loadState("invert")).toBe(1);
  });

  it("should save state 0 when removeInvertCss() is called", () => {
    stateService.saveState("invert", 1);
    const fixture = TestBed.createComponent(InvertComponent);
    fixture.detectChanges();
    fixture.componentInstance.removeInvertCss();
    expect(stateService.loadState("invert")).toBe(0);
  });
});

describe("TextSizeComponent persistence", () => {
  let stateService: AstralStateService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    stateService = TestBed.inject(AstralStateService);
  });

  it("should restore saved currentState on init", () => {
    stateService.saveState("text_size", 2);
    const fixture = TestBed.createComponent(TextSizeComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentState()).toBe(2);
  });

  it("should save state on nextState()", () => {
    const fixture = TestBed.createComponent(TextSizeComponent);
    fixture.detectChanges();
    fixture.componentInstance.nextState();
    expect(stateService.loadState("text_size")).toBe(1);
  });
});

describe("ScreenReaderComponent persistence", () => {
  let stateService: AstralStateService;

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    stateService = TestBed.inject(AstralStateService);
  });

  it("should restore saved currentState on init", () => {
    stateService.saveState("screen_reader", 2);
    const fixture = TestBed.createComponent(ScreenReaderComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.currentState()).toBe(2);
  });

  it("should save state on nextState()", () => {
    const fixture = TestBed.createComponent(ScreenReaderComponent);
    fixture.detectChanges();
    fixture.componentInstance.nextState();
    expect(stateService.loadState("screen_reader")).toBe(1);
  });
});
