import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { verifyLoginGuard } from './verify-login.guard';

describe('verifyLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => verifyLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
