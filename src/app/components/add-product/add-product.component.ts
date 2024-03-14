import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer, defer } from 'rxjs';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ProductService } from '../../services/product.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerNames } from '../../constant/router';
import { IProduct } from '../../types/product';

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

  product: IProduct = {
    id: 0,
    nameProduct: "",
    quantityProduct: 0,
    expiredDate: new Date(),
    provider: "",
    unit: "",
    origin: "",
    avatar: "",
    codeProduct: "",
    description: "",
    providePrice: 0,
    floorPrice: 0
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
  handleCallApiImage(): void {
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
    console.log("Test hàm add product");
    this.productService.addProduct(this.product).subscribe(() => { });
    this.handleCallApiImage();
    console.log(this.product);
  }

  quantityValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0) {
      return { confirm: true, error: true };
    }
    return {};
  }

  floorPriceValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0) {
      return { confirm: true, error: true };
    }
    return {};
  }

  providePriceValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0) {
      return { confirm: true, error: true };
    }
    return {};
  }

  nameProductValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 255) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    }
    else {
      return {}
    }
  }

  originValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 255) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    }
    else {
      return {}
    }
  }

  unitValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 255) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    }
    else {
      return {}
    }
  }

  providerValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 255) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    }
    else {
      return {}
    }
  }

  expireDateValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 255) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    }
    else {
      return {}
    }
  }

  validateAddProductForm: FormGroup<{
    nameProduct: FormControl<string>;
    floorPrice: FormControl<number>;
    quantityProduct: FormControl<number>;
    providePrice: FormControl<number>
    provider: FormControl<string>;
    origin: FormControl<string>;
    unit: FormControl<string>;
    expiredDate: FormControl<string>;
  }> = this.fb.group({
    nameProduct: ["", [Validators.required, this.nameProductValidator]],
    floorPrice: [0, [Validators.required, this.floorPriceValidator]],
    quantityProduct: [0, [Validators.required, this.quantityValidator]],
    providePrice: [0, [Validators.required, this.providePriceValidator]],
    provider: ["", [Validators.required, this.providerValidator]],
    origin: ["", [Validators.required, this.originValidator]],
    unit: ["", [Validators.required, this.unitValidator]],
    expiredDate: ["", [Validators.required, this.expireDateValidator]],
  });

  handleSubmit() {
    if (this.validateAddProductForm.valid) {
      this.handleAddProduct();
      console.log('submit:', this.validateAddProductForm.value);
    } else {
      Object.values(this.validateAddProductForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
