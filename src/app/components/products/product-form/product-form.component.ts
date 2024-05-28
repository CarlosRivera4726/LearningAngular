import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../core/services/products/products.service';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { CloudinaryModule } from '@cloudinary/ng';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { UploadImagesComponent } from '../../upload-images/upload-images.component';
import { ErrorAlertComponent } from '../../messages/error-alert/error-alert.component';
import { SuccessAlertComponent } from '../../messages/success-alert/success-alert.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CloudinaryModule,
    UploadImagesComponent,
    ErrorAlertComponent,
    SuccessAlertComponent,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  protected message: string = '';
  protected showMessage: boolean = false;
  protected isError: boolean = false;

  @Input()
  productForm!: FormGroup;

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      quantity: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      image: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    //console.log(this.productForm.value);
    const product = this.productForm.value;
    product.categories = [{ name: 'COMPUTADORES' }, { name: 'TECNOLOGIA' }];
    product.sellerId = localStorage.getItem('id');
    this.productService.addProduct(product).subscribe({
      next: (data) => {
        this.message = $localize`Producto añadido correctamente.`;
        this.isError = false;
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 5000);
        this.productForm.reset();
      },
      error: (error) => {
        this.message = $localize`El producto no pudo ser añadido.`;
        this.showMessage = true;
        this.isError = true;
        setTimeout(() => {
          this.showMessage = false;
          this.isError = false;
        }, 5000);
      },
    });
  }

  gettingUrl(event: any) {
    this.productForm.controls['image'].setValue(event);
  }
}
