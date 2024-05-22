import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/products/iproduct';
import { SERVER_URL_DEPLOY, environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  photos: any;
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
      `${SERVER_URL_DEPLOY}/product`,
      this.options
    );
  }

  getData(tag: string): void {
    this.http
      .get(
        `https://res.cloudinary.com/${environment.CLOUD_NAME}/image/list/${tag}.json`
      )
      .subscribe((data: any) => {
        this.photos = data.resources;
      });
  }
}
