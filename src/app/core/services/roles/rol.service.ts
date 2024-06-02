import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRole } from '../../interfaces/roles/irole';
import { Observable } from 'rxjs';
import { SERVER_URL_DEPLOY, SERVER_URL_LOCAL } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<IRole[]> {
    return this.http.get<IRole[]>(`${SERVER_URL_LOCAL}/roles`);
  }

  getRol(name: string): Observable<IRole> {
    return this.http.get<IRole>(`${SERVER_URL_LOCAL}/roles/${name}`);
  }
}
