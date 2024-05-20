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

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CloudinaryModule,
    UploadImagesComponent,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  constructor(private productService: ProductsService) {}

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
    console.log(this.productForm.value);
    //this.productService.setLocalProduct(this.productForm.value);
  }
}
