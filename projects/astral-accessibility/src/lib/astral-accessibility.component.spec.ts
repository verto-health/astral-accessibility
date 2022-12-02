import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstralAccessibilityComponent } from './astral-accessibility.component';

describe('AstralAccessibilityComponent', () => {
  let component: AstralAccessibilityComponent;
  let fixture: ComponentFixture<AstralAccessibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstralAccessibilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AstralAccessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
