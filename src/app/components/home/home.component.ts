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
export class HomeComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    console.log(user.roles.includes('ADMINISTRADOR') ? true : false);
  }
  realTime = Date.now();
}
