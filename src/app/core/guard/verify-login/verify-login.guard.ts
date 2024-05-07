import { CanActivateFn } from '@angular/router';

export const verifyLoginGuard: CanActivateFn = (route, state) => {
  return sessionStorage.getItem('token') ? true : false;
};
