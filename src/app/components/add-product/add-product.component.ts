import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ProductService } from '../../services/product.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { routerNames } from '../../constant/router';

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
    private http: HttpClient,
    private fb: NonNullableFormBuilder, private router: Router
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

  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
  handleCallAPI(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file.originFileObj!);
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
  handleAddProduct() {
    this.handleCallAPI();
    // this.handleCallAPIAdd();
  }
  handleCallAPIAdd() {
    console.log("1111111111111");
    this.router.navigate([routerNames.homePage + "/" + routerNames.importWarehousePage])
  }

}
