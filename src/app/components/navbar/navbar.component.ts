import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}
  token: string | null = null;
  isLogged: boolean = false;
  readonly role = localStorage.getItem('role');
  ngOnInit(): void {
    initFlowbite();
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (this.getToken()) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      }
    });
  }
  getToken() {
    this.token = sessionStorage.getItem('token');
    return this.token ? true : false;
  }

  logout() {
    sessionStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
  isAdministrator(): boolean {
    return this.role?.includes('ADMINISTRADOR') || false;
  }
}
