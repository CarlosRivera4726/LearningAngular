import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogin } from '../../interfaces/users/iUserLogin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(user: IUserLogin): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/login', user);
  }

  verifyLogin() {
    return sessionStorage.getItem('token') ? true : false;
  }
}