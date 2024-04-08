import { Component, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IProduct } from '../../types/product';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { notificationEnum } from '../../utils/notificationEnum';
import { Location } from '@angular/common';
import { routerNames } from '../../constant/router';
import { Router } from '@angular/router';

const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    8;
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
    private fb: NonNullableFormBuilder,
    private notification: NzNotificationService,
    private location: Location,
    private router: Router,
  ) { }

  listProduct: IProduct[] = [];
  currentTime: Date = new Date();

  product: IProduct = {
    id: 0,
    nameProduct: '',
    quantityProduct: 0,
    expiredDate: 'new Date()',
    provider: '',
    unit: '',
    origin: '',
    codeProduct: '',
    description: '',
    providePrice: 0,
    floorPrice: 0,
    phoneProvider: '',
    imageUrl: '',
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

    const header = this.productService.headerUpload();

    this.productService.uploadImage(formData, header).subscribe(
      () => {
        this.msg.error('Upload Failed.');
      },
      () => {
        this.fileList = [];
        this.msg.success('upload successfully');
      }
    );
  }

  quantityValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0 || control.value > 10000) {
      return { confirm: true, error: true };
    }
    return {};
  };

  floorPriceValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0) {
      return { confirm: true, error: true };
    }
    return {};
  };

  providePriceValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0) {
      return { confirm: true, error: true };
    }
    return {};
  };

  nameProductValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } | null => {
    if (control.value.length > 255 || control.value.length < 3) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  originValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } | null => {
    if (control.value.length > 255 || control.value.length < 3) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  unitValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } | null => {
    if (control.value.length > 255 || control.value.length < 3) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  providerValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } | null => {
    if (control.value.length > 255 || control.value.length < 3) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  expireDateValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } | null => {
    if (control.value.length > 255 || control.value.length < 3) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  phoneNumberValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    const phonePattern = /^(0\d{9})$/;
    if (!phonePattern.test(control.value)) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {}
    }
  }

  codeProductValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length < 17 || control.value.length > 17) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  validateAddProductForm: FormGroup<{
    nameProduct: FormControl<string>;
    floorPrice: FormControl<number>;
    quantityProduct: FormControl<number>;
    providePrice: FormControl<number>;
    provider: FormControl<string>;
    origin: FormControl<string>;
    unit: FormControl<string>;
    expiredDate: FormControl<string>;
    phoneNumber: FormControl<string>;
    codeProduct: FormControl<string>;
  }> = this.fb.group({
    nameProduct: ['', [Validators.required, this.nameProductValidator]],
    floorPrice: [0, [Validators.required, this.floorPriceValidator]],
    quantityProduct: [0, [Validators.required, this.quantityValidator]],
    providePrice: [0, [Validators.required, this.providePriceValidator]],
    provider: ['', [Validators.required, this.providerValidator]],
    origin: ['', [Validators.required, this.originValidator]],
    unit: ['', [Validators.required, this.unitValidator]],
    expiredDate: ['', [Validators.required, this.expireDateValidator]],
    phoneNumber: ['', [Validators.required, this.phoneNumberValidator]],
    codeProduct: ['MSP' + `${this.currentTime.getFullYear()}${(this.currentTime.getMonth() + 1).toString().padStart(2, '0')}${this.currentTime.getDate().toString().padStart(2, '0')}${this.currentTime.getHours().toString().padStart(2, '0')}${this.currentTime.getMinutes().toString().padStart(2, '0')}${this.currentTime.getSeconds().toString().padStart(2, '0')}`, [Validators.required, this.codeProductValidator]],
  });

  handleNavigate(): void {
    this.location.back();
  }

  handleAddProduct() {
    if (this.validateAddProductForm.valid) {
      const formData = new FormData();
      this.fileList.forEach((file: any) => {
        formData.append('file', file.originFileObj!);
      });
      this.loading = true;
      const header = this.productService.headerUpload();
      this.productService.uploadImage(formData, header).subscribe(
        (v) => {
          this.fileList = [];
          this.msg.success('upload successfully');
          addProduct.imageUrl = v.body.message
          this.productService.addProduct(addProduct).subscribe({
            next: (res) => {
              this.createNotification(notificationEnum.success, res.message);
              this.handleNavigate();
            },
            error: (error) => {
              this.createNotification(notificationEnum.error, error.message);
              if (error.status === 403) {
                this.router.navigate([routerNames.signInPage]);
                this.createNotification('error', "Phiên đăng nhập hết hạn")
              }
            },
          });
        },
        (error) => {
          this.msg.error('Upload Failed.');
          if (error.status === 403) {
            this.router.navigate([routerNames.signInPage]);
            this.createNotification('error', "Phiên đăng nhập hết hạn")            
          }

        }
      );

      const addProduct = {
        nameProduct: this.validateAddProductForm.value.nameProduct
          ? this.validateAddProductForm.value.nameProduct
          : '',
        floorPrice: this.validateAddProductForm.value.floorPrice
          ? this.validateAddProductForm.value.floorPrice
          : 0,
        quantityProduct: this.validateAddProductForm.value.quantityProduct
          ? this.validateAddProductForm.value.quantityProduct
          : 0,
        providePrice: this.validateAddProductForm.value.providePrice
          ? this.validateAddProductForm.value.providePrice
          : 0,
        provider: this.validateAddProductForm.value.provider
          ? this.validateAddProductForm.value.provider
          : '',
        origin: this.validateAddProductForm.value.origin
          ? this.validateAddProductForm.value.origin
          : '',
        unit: this.validateAddProductForm.value.unit
          ? this.validateAddProductForm.value.unit
          : '',
        expiredDate: this.validateAddProductForm.value.expiredDate
          ? this.validateAddProductForm.value.expiredDate
          : '',
        codeProduct: this.validateAddProductForm.value.codeProduct
          ? this.validateAddProductForm.value.codeProduct
          : '',
        description: this.product.description,
        imageUrl: this.product.imageUrl
      };
    } else {
      Object.values(this.validateAddProductForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleSubmit() {
    if (this.validateAddProductForm.valid) {
      this.handleAddProduct();
    } else {
      Object.values(this.validateAddProductForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createNotification(type: string, content: string): void {
    this.notification.create(type, `${content}`, '');
  }
}