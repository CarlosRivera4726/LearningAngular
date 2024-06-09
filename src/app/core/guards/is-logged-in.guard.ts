import { CanMatchFn } from '@angular/router';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const isLoggedInGuard: CanMatchFn = (route, segments) => {
  const loginService: LoginService = inject(LoginService);
  return loginService.isAuthenticated();
};
