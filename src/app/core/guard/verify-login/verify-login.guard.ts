import { CanActivateFn, CanDeactivateFn, Router } from '@angular/router';
import { LoginComponent } from '../../../components/login/login.component';
import { Injectable } from '@angular/core';

export const verifyLoginGuard: CanActivateFn = (route, state) => {
  return localStorage.getItem('token') ? true : false;
};

export const LoggedInAuthGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  if (localStorage.getItem('token') ? true : false) {
    router.navigate(['/unauthorized']);
    return false;
  } else {
    return true;
  }
};
