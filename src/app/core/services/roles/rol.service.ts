import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRole } from '../../interfaces/roles/irole';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>('http://localhost:3000/roles');
  }

  getRol(name: string): Observable<IRole> {
    return this.http.get<IRole>(`http://localhost:3000/roles/${name}`);
  }
}
