import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { getISOWeek } from 'date-fns';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ProductService } from '../../services/product.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  constructor(
    private productService: ProductService,
    private msg: NzMessageService,
    private http: HttpClient
  ) { }

  formProduct: {
    nameProduct: String;
    quantityProduct: Number;
    expiredDate: String;
    provider: String;
    unit: String;
    origin: String;
    avatar: NzUploadFile[];
    codeProduct: String;
    description: String;
    providePrice: Number;
    floorPrice: Number;
  } = {
      nameProduct: 'abc',
      quantityProduct: 1,
      expiredDate: 'abc',
      provider: 'abc',
      unit: 'abc',
      origin: 'abc',
      avatar: [],
      codeProduct: 'abc',
      description: 'abc',
      providePrice: 1,
      floorPrice: 1,
    };

  fileList: NzUploadFile[] = [];

  loading = false;
  avatarUrl?: string;

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng =
        file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG Or  file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 200;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 200MB!');
        observer.complete();
        return;
      }
      this.fileList = this.fileList.concat(file);
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  handleCallAIP(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.loading = true;
    const req = new HttpRequest(
      'POST',
      'http://localhost:8080/upload',
      formData,
      {
        // reportProgress: true
      }
    );
    this.http
      .request(req)
      .pipe(filter((e) => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.loading = false;
          this.msg.error('upload failed.');
        },
        () => {
          this.loading = false;
          this.fileList = [];
          this.msg.success('upload successfully');
        }
      );
  }
  handleAddProduct(){
    this.handleCallAIP();
    console.log("Test callAPI Upload");
  }
}
