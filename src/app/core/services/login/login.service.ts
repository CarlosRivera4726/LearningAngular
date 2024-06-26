import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUserLogin } from '../../interfaces/users/iUserLogin';
import { Observable, tap } from 'rxjs';
import { SERVER_URL_DEPLOY } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private tokenKey = 'token';
  constructor(private http: HttpClient, private router: Router) {}

  login(user: IUserLogin): Observable<any> {
    return this.http.post<any>(`${SERVER_URL_DEPLOY}/auth/login`, user).pipe(
      tap((response) => {
        if (response.Authorization) {
          this.setToken(response.Authorization);
          this.setUser(response.data);
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  private setUser(user: any): void {
    sessionStorage.setItem(user.email, JSON.stringify(user));
    sessionStorage.setItem(user.name, JSON.stringify(user));
    sessionStorage.setItem(user.lastName, JSON.stringify(user));
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    const now = Date.now();
    return now < exp;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}
