import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { LoginComponent } from '../../../components/login/login.component';
import { Injectable } from '@angular/core';

export const verifyLoginGuard: CanActivateFn = (route, state) => {
  return sessionStorage.getItem('token') ? true : false;
};

export const LoggedInAuthGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  if (sessionStorage.getItem('token') ? true : false) {
    router.navigate(['/dashboard']);
    return false;
  } else {
    return true;
  }
};
