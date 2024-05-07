import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../products/product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, ProductListComponent],
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
