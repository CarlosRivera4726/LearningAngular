import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoginService } from '../../core/services/login/login.service';
import { Rol } from '../../core/environments/environment';
import { Subscription } from 'rxjs';
import { SharedService } from '../../core/services/shared/shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.less',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService, private sharedService: SharedService) {}
  private authChangeSubscription: Subscription | undefined;
  isAuthenticated: boolean = false;

  token: string | null = null;
  isLogged: boolean = false;
  readonly roles = JSON.parse(sessionStorage.getItem('user') || '{}').roles;

  ngOnInit(): void {
    this.isLogged = this.loginService.isAuthenticated();
    initFlowbite();
    this.authChangeSubscription = this.sharedService.authChange$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  logout(): void {
    this.loginService.logout();
    this.updateNavbar();
  }
  private updateNavbar() {
    window.location.reload();
  }
  isAdministrator(): boolean {
    return this.roles.some((role: any) => role.name === Rol.ADMIN);
  }

}
