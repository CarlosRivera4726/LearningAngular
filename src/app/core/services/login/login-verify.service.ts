import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginVerifyService {
  constructor() {}

  verifyLogin() {
    return sessionStorage.getItem('token') ? true : false;
  }
}
