import { Component, Input } from '@angular/core';
import { CloudinaryModule } from '@cloudinary/ng';
import { CommonModule } from '@angular/common';
import { environment } from '../../core/environments/environment';
import { ScriptService } from '../../core/services/upload/script.service';

@Component({
  selector: 'app-upload-images',
  standalone: true,
  imports: [CommonModule, CloudinaryModule],
  templateUrl: './upload-images.component.html',
  styleUrl: './upload-images.component.css',
})
export class UploadImagesComponent {
  @Input() tag!: string;
  uploadedImage = '';
  isDisabled = false;
  uploadedImages: string[] = [];

  constructor(private scriptService: ScriptService) {
    this.scriptService.load('uw');
  }

  processResults = (error: any, result: any): void => {
    if (result.event === 'close') {
      this.isDisabled = false;
    }
    if (result && result.event === 'success') {
      const secureUrl = result.info.secure_url;
      const previewUrl = secureUrl.replace('/upload/', '/upload/w_400/');
      this.uploadedImages.push(previewUrl);
      this.isDisabled = false;
    }
    if (error) {
      this.isDisabled = false;
    }
  };

  cloudName = environment.CLOUD_NAME;
  uploadPreset = environment.UPLOAD_PRESET;

  uploadWidget = (): void => {
    this.isDisabled = true;
    window.cloudinary.openUploadWidget(
      {
        cloudName: this.cloudName,
        uploadPreset: this.uploadPreset,
        sources: ['local', 'url'],
        tags: [this.tag, 'products'],
        clientAllowedFormats: ['image'],
        resourceType: 'image',
      },
      this.processResults
    );
  };
}