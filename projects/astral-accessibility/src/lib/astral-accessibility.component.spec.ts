import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AstralAccessibilityComponent } from "./astral-accessibility.component";
import { AstralTranslationService } from "./astral-translation.service";

describe("AstralAccessibilityComponent", () => {
  let component: AstralAccessibilityComponent;
  let fixture: ComponentFixture<AstralAccessibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AstralAccessibilityComponent],
      providers: [AstralTranslationService],
    }).compileComponents();

    fixture = TestBed.createComponent(AstralAccessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
