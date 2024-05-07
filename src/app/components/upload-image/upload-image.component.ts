import { Component } from '@angular/core';
import { environment } from '../../core/environment/environment';
import { S3 } from 'aws-sdk';
import * as AWS from 'aws-sdk/global';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent {
  selectedFile: File | null = null;

  constructor() {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadImage() {
    if (!this.selectedFile) {
      console.error('No se ha seleccionado ninguna imagen.');
      return;
    }

    const bucket = new S3({
      accessKeyId: environment.awsAccessKeyId,
      secretAccessKey: environment.awsSecretAccessKey,
      region: environment.awsRegion,
    });

    const params: any = {
      Bucket: environment.s3BucketName,
      Key: this.selectedFile.name,
      Body: this.selectedFile,
      ACL: 'public-read',
    };

    await bucket.upload(params, (err: any, data: any) => {
      if (err) {
        console.error('Error al cargar la imagen:', err);
      } else {
        console.log('Imagen cargada exitosamente:', data.Location);
      }
    });
  }
}
