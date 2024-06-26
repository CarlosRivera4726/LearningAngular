import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent implements OnInit {
  title = `Tech Store`;
  name = localStorage.getItem('name');
  email = localStorage.getItem('email');

  constructor() {
    $localize`${this.title}`;
    initFlowbite();
  }

  ngOnInit(): void {
    this.verifyIfLogged();
  }
  verifyIfLogged() {
    if (!this.name && !this.email) {
      sessionStorage.removeItem('token');
    }
  }
}
