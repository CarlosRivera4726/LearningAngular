import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogin } from '../../interfaces/users/iUserLogin';
import { Observable } from 'rxjs';
import { SERVER_URL_DEPLOY } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url: string = `${SERVER_URL_DEPLOY}/auth/login`
  constructor(private http: HttpClient) {}

  login(user: IUserLogin): Observable<any> {
    return this.http.post<any>(this.url, user);
  }

  verifyLogin() {
    return sessionStorage.getItem('token') ? true : false;
  }
}
