import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRole } from '../../interfaces/roles/irole';
import { Observable } from 'rxjs';
import { SERVER_URL_DEPLOY } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private http: HttpClient) {}
  private url: string = `${SERVER_URL_DEPLOY}/roles`;

  getRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(this.url);
  }

  getRol(name: string): Observable<IRole> {
    return this.http.get<IRole>(`${this.url}${name}`);
  }
}
