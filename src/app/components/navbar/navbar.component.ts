import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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
  ngOnInit(): void {
    this.isLogged = this.getToken();
  }
  getToken() {
    this.token = sessionStorage.getItem('token');
    return this.token ? true : false;
  }

  logout() {
    sessionStorage.removeItem('token');
    this.isLogged = false;
    this.router.navigate(['/login']);
  }
}
