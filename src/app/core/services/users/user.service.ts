import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../interfaces/users/iuser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  options = {
    headers: {
      Authorization:
        'Bearer ' +
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbnRyYUBtYWlsLmNvbSIsImlhdCI6MTcxNDY4MDgxOSwiZXhwIjoxNzE5ODY0ODE5fQ.H0KTzoJwcAR8W4towyksONhTeQ2ZCSGxvLTnI7Tu-Y8',
    },
  };
  private url: string = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url, this.options);
  }

  addUser(user: IUser) {
    return this.http.post<IUser>(this.url, user, this.options);
  }

  deleteUser(id: string): Observable<IUser> {
    return this.http.delete<IUser>(`${this.url}/${id}`, this.options);
  }
}
