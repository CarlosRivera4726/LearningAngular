import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoginService } from '../../core/services/login/login.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}
  token: string | null = null;
  isLogged: boolean = false;
  readonly role = sessionStorage.getItem('role');
  ngOnInit(): void {
    initFlowbite();
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (this.loginService.isAuthenticated()) {
          this.isLogged = true;
        } else {
          this.isLogged = false;
        }
      }
    });
  }

  logout(): void {
    this.loginService.logout();
  }
  isAdministrator(): boolean {
    return this.role?.includes('ADMINISTRADOR') || false;
  }
}
