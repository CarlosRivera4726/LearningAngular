import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/products/iproduct';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: IProduct[] = [];
  options = {};
  constructor(private http: HttpClient) {
    this.options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
  }
  setLocalProduct(product: IProduct) {
    this.products.push(product);
  }
  getLocalProducts(): IProduct[] {
    return this.products;
  }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      'http://localhost:3000/product',
      this.options
    );
  }
}
