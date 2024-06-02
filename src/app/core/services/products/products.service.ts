import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/products/iproduct';
import { SERVER_URL_DEPLOY } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  photos: any;
  products: IProduct[] = [];
  options = {};
  url: string = `${SERVER_URL_DEPLOY}/product`
  constructor(private http: HttpClient) {
    this.options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
  }
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(
      this.url,
      product,
      this.options
    );
  }
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      this.url,
      this.options
    );
  }
}
