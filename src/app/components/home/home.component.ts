import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less',
})
export class HomeComponent {
  name = localStorage.getItem('name');
  email = localStorage.getItem('email');
  role = localStorage.getItem('role');
  constructor() {}
  realTime = Date.now();
}
