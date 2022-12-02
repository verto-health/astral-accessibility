import { TestBed } from '@angular/core/testing';

import { AstralAccessibilityService } from './astral-accessibility.service';

describe('AstralAccessibilityService', () => {
  let service: AstralAccessibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstralAccessibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
