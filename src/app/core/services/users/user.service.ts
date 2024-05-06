import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/users/iuser';
import { Observable } from 'rxjs';
import { IUserLogin } from '../../interfaces/users/iUserLogin';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  options = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('token'),
    },
  };
  private url: string = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  login(user: IUserLogin): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/login', user);
  }

  getUsers(): Observable<IUser[]> {
    try {
      return this.http.get<IUser[]>(this.url, this.options);
    } catch (error) {
      console.error('UN ERROR EN EL SERVICIO: ' + error);
      return new Observable<IUser[]>();
    }
  }

  addUser(user: IUser) {
    return this.http.post<IUser>(this.url, user, this.options);
  }

  deleteUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(`${this.url}/${id}`, this.options);
  }
}
