import { TestBed } from '@angular/core/testing';

import { CheckoutpageGuard } from './checkoutpage.guard';

describe('CheckoutpageGuard', () => {
  let guard: CheckoutpageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CheckoutpageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
