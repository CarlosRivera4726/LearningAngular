import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private authChangeSubject = new BehaviorSubject<boolean>(false);
  authChange$ = this.authChangeSubject.asObservable();

  constructor() {}

  emitAuthChange(isAuthenticated: boolean) {
    this.authChangeSubject.next(isAuthenticated);
  }
}
