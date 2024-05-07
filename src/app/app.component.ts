import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
  title = 'Tech Store';
  name = localStorage.getItem('name');
  email = localStorage.getItem('email');

  ngOnInit(): void {
    initFlowbite();
    this.verifyIfLogged();
  }

  verifyIfLogged() {
    if (!this.name && !this.email) {
      sessionStorage.removeItem('token');
    }
  }
}
