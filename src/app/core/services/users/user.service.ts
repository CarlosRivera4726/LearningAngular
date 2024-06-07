import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/users/iuser';
import { Observable } from 'rxjs';
import { IUserLogin } from '../../interfaces/users/iUserLogin';
import { SERVER_URL_DEPLOY } from '../../environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private loginService: LoginService) {
    this.options = {
      headers: {
        Authorization: localStorage.getItem('token')
          ? 'Bearer ' + localStorage.getItem('token')
          : '',
      },
    };
  }

  options = {};
  private url: string = `${SERVER_URL_DEPLOY}/users`;

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url, this.options);
  }

  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/${id}`, this.options);
  }

  updateUser(id: string, user: IUser): Observable<IUser> {
    console.info('user', user);

    return this.http.patch<IUser>(`${this.url}/${id}`, user, this.options);
  }

  addUser(user: IUser) {
    return this.http.post<IUser>(this.url, user, this.options);
  }

  deleteUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(`${this.url}/${id}`, this.options);
  }
}
