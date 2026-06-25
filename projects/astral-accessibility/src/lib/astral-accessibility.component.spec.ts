import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AstralAccessibilityComponent } from "./astral-accessibility.component";
import { AstralTranslationService } from "./astral-translation.service";

const ALL_POSITIONS = [
  "bottom-right",
  "bottom-left",
  "top-right",
  "top-left",
] as const;

describe("AstralAccessibilityComponent", () => {
  async function configure() {
    await TestBed.configureTestingModule({
      imports: [AstralAccessibilityComponent],
      providers: [AstralTranslationService],
    }).compileComponents();
  }

  describe("default state", () => {
    let component: AstralAccessibilityComponent;
    let fixture: ComponentFixture<AstralAccessibilityComponent>;

    beforeEach(async () => {
      await configure();
      fixture = TestBed.createComponent(AstralAccessibilityComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should create", () => {
      expect(component).toBeTruthy();
    });

    it("defaults position to bottom-right", () => {
      expect(component.position).toBe("bottom-right");
    });

    it("hostClass is astral-position-bottom-right by default", () => {
      expect(component.hostClass).toBe("astral-position-bottom-right");
    });

    it("isTopPosition is false by default", () => {
      expect(component.isTopPosition).toBeFalse();
    });
  });

  describe("position getters", () => {
    let component: AstralAccessibilityComponent;
    let fixture: ComponentFixture<AstralAccessibilityComponent>;

    beforeEach(async () => {
      await configure();
      fixture = TestBed.createComponent(AstralAccessibilityComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    ALL_POSITIONS.forEach((pos) => {
      it(`hostClass returns astral-position-${pos}`, () => {
        component.position = pos;
        expect(component.hostClass).toBe(`astral-position-${pos}`);
      });
    });

    it("isTopPosition is false for bottom-right", () => {
      component.position = "bottom-right";
      expect(component.isTopPosition).toBeFalse();
    });

    it("isTopPosition is false for bottom-left", () => {
      component.position = "bottom-left";
      expect(component.isTopPosition).toBeFalse();
    });

    it("isTopPosition is true for top-right", () => {
      component.position = "top-right";
      expect(component.isTopPosition).toBeTrue();
    });

    it("isTopPosition is true for top-left", () => {
      component.position = "top-left";
      expect(component.isTopPosition).toBeTrue();
    });
  });

  describe("position from astral-features attribute", () => {
    function createWithOptions(options: Record<string, unknown>) {
      const merged = { enabledFeatures: [], ...options };
      const original = document.querySelector.bind(document);
      spyOn(document, "querySelector").and.callFake((selector: string) => {
        if (selector === "astral-accessibility") {
          return {
            getAttribute: (_attr: string) => JSON.stringify(merged),
          } as unknown as Element;
        }
        return original(selector);
      });

      const fixture = TestBed.createComponent(AstralAccessibilityComponent);
      fixture.detectChanges();
      return fixture.componentInstance;
    }

    beforeEach(async () => {
      await configure();
    });

    ALL_POSITIONS.forEach((pos) => {
      it(`reads position "${pos}" from attribute`, () => {
        const component = createWithOptions({ position: pos });
        expect(component.position).toBe(pos);
      });
    });

    it("falls back to bottom-right when position is omitted", () => {
      const component = createWithOptions({ enabledFeatures: [] });
      expect(component.position).toBe("bottom-right");
    });
  });

  describe("toggle button color from astral-features attribute", () => {
    function createWithOptions(options: Record<string, unknown>) {
      const merged = { enabledFeatures: [], ...options };
      const original = document.querySelector.bind(document);
      spyOn(document, "querySelector").and.callFake((selector: string) => {
        if (selector === "astral-accessibility") {
          return {
            getAttribute: (_attr: string) => JSON.stringify(merged),
          } as unknown as Element;
        }
        return original(selector);
      });

      const fixture = TestBed.createComponent(AstralAccessibilityComponent);
      fixture.detectChanges();
      return fixture;
    }

    beforeEach(async () => {
      await configure();
    });

    it("sets --toggleButtonColor when toggleColor is provided", () => {
      const fixture = createWithOptions({ toggleColor: "#0057b8" });
      expect(
        fixture.nativeElement.style.getPropertyValue("--toggleButtonColor"),
      ).toBe("#0057b8");
    });

    it("sets --toggleIconColor when toggleIconColor is provided", () => {
      const fixture = createWithOptions({ toggleIconColor: "#ffffff" });
      expect(
        fixture.nativeElement.style.getPropertyValue("--toggleIconColor"),
      ).toBe("#ffffff");
    });

    it("sets both CSS variables when both options are provided", () => {
      const fixture = createWithOptions({
        toggleColor: "#0057b8",
        toggleIconColor: "#ffffff",
      });
      expect(
        fixture.nativeElement.style.getPropertyValue("--toggleButtonColor"),
      ).toBe("#0057b8");
      expect(
        fixture.nativeElement.style.getPropertyValue("--toggleIconColor"),
      ).toBe("#ffffff");
    });

    it("does not set --toggleButtonColor when toggleColor is omitted", () => {
      const fixture = createWithOptions({});
      expect(
        fixture.nativeElement.style.getPropertyValue("--toggleButtonColor"),
      ).toBe("");
    });

    it("does not set --toggleIconColor when toggleIconColor is omitted", () => {
      const fixture = createWithOptions({});
      expect(
        fixture.nativeElement.style.getPropertyValue("--toggleIconColor"),
      ).toBe("");
    });
  });

  describe("template alignment class", () => {
    let component: AstralAccessibilityComponent;
    let fixture: ComponentFixture<AstralAccessibilityComponent>;

    beforeEach(async () => {
      await configure();
      fixture = TestBed.createComponent(AstralAccessibilityComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("uses align-items-end for bottom-right", () => {
      component.position = "bottom-right";
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector(".astral-accessibility");
      expect(el.classList).toContain("align-items-end");
      expect(el.classList).not.toContain("align-items-start");
    });

    it("uses align-items-end for bottom-left", () => {
      component.position = "bottom-left";
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector(".astral-accessibility");
      expect(el.classList).toContain("align-items-end");
      expect(el.classList).not.toContain("align-items-start");
    });

    it("uses align-items-start for top-right", () => {
      component.position = "top-right";
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector(".astral-accessibility");
      expect(el.classList).toContain("align-items-start");
      expect(el.classList).not.toContain("align-items-end");
    });

    it("uses align-items-start for top-left", () => {
      component.position = "top-left";
      fixture.detectChanges();
      const el = fixture.nativeElement.querySelector(".astral-accessibility");
      expect(el.classList).toContain("align-items-start");
      expect(el.classList).not.toContain("align-items-end");
    });
  });
});
