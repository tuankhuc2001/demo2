import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { trigger, transition, animate, style } from '@angular/animations';

import { IProduct } from '../../types/product';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { notificationEnum } from '../../utils/notificationEnum';
import { Location } from '@angular/common';
import { routerNames } from '../../constant/router';
import { Router } from '@angular/router';
import { IUser } from '../../types/user';
import { UserService } from '../../services/user.service';

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
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ]
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
    private userService: UserService,
  ) { }

  listProduct: IProduct[] = [];
  currentTime: Date = new Date();

  product: IProduct = {
    id: 0,
    nameProduct: '',
    quantityProduct: 0,
    expiredDate: '',
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
  today = new Date();

  dataDate = new Date();

  user: IUser = {
    id: 0,
    phone: "",
    email: "",
    fullname: "",
    avatar: "",
    role: "",
    token: "",
    refreshToken: ""
  }

  fileList: NzUploadFile[] = [];

  loading = false;

  previewImage: string | undefined = '';
  previewVisible = false;
  handleMaintain() {
    this.createNotification(notificationEnum.warning, "Chức năng đang phát triển");
  }

  onChange(result: Date): void  {debugger
    console.log('onChange: ', result);
    this.dataDate = result
    console.log(this.dataDate,"dddddd");
    
  }

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) < 0;

  handleCallApiImage(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file.originFileObj!);
    });
    this.loading = true;

    const header = this.productService.headerUpload();

    this.productService.uploadImage(formData, header).subscribe(
      () => {
        this.msg.error('Tải ảnh lên thất bại.');
      },
      () => {
        this.fileList = [];
        this.msg.success('Tải ảnh lên thành công');
      }
    );
  }

  quantityValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0 || control.value > 10000) {
      return { confirm: true, error: true };
    }
    return {};
  };

  floorPriceValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0 || control.value > 1000000000) {
      return { confirm: true, error: true };
    }
    return {};
  };

  providePriceValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0 || control.value > 1000000000) {
      return { confirm: true, error: true };
    }
    return {};
  };

  nameProductValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 250) {
      return { confirm: true, error: true };
    } else if (control.value.length > 0 && control.value.length < 3) {
      return { confirm: true, error: true }
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  originValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 50) {
      return { confirm: true, error: true };
    } else if (control.value.length > 0 && control.value.length < 3) {
      return { confirm: true, error: true }
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  unitValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 50) {
      return { confirm: true, error: true };
    } else if (control.value.length > 0 && control.value.length < 2) {
      return { confirm: true, error: true }
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  providerValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 100) {
      return { confirm: true, error: true };
    } else if (control.value.length > 0 && control.value.length < 3) {
      return { confirm: true, error: true }
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  expireDateValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 50) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    } else if (control.value.length > 0 && control.value.length < 8) {
      return { confirm: true, error: true }
    } else {
      return {};
    }
  };

  phoneProviderValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    const phonePattern = /^(0\d{9})$/;
    if (!phonePattern.test(control.value)) {
      return { required: true, error: true };
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
    phoneProvider: FormControl<string>;
    codeProduct: FormControl<string>;
  }> = this.fb.group({
    nameProduct: ['', [Validators.required, this.nameProductValidator]],
    floorPrice: [1, [Validators.required, this.floorPriceValidator]],
    quantityProduct: [1, [Validators.required, this.quantityValidator]],
    providePrice: [1, [Validators.required, this.providePriceValidator]],
    provider: ['', [Validators.required, this.providerValidator]],
    origin: ['', [Validators.required, this.originValidator]],
    unit: ['', [Validators.required, this.unitValidator]],
    expiredDate: ['', [Validators.required, this.expireDateValidator]],
    phoneProvider: ['', [Validators.required, this.phoneProviderValidator]],
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
          this.msg.success('Tải ảnh lên thành công');
          addProduct.imageUrl = v.body.message
          this.productService.addProduct(addProduct).subscribe({
            next: (res) => {
              this.createNotification(notificationEnum.success, res.message);
              this.handleNavigate();
            },
            error: (error) => {
              this.createNotification(notificationEnum.error, error.message);
              if (error.status === 403) {
                this.user = this.userService.getUser()
                this.userService.loginRefreshToken(this.user.refreshToken).subscribe({
                  next: value => {
                    this.userService.setUser(value)
                    localStorage.setItem("token", value.refreshToken)
                  },
                  error: error => {
                    this.router.navigate([routerNames.signInPage]);
                    this.createNotification('error', error)
                  }
                })
              }
            },
          });
        },
        (error) => {
          if (error.status === 403) {
            this.user = this.userService.getUser()
            this.userService.loginRefreshToken(this.user.refreshToken).subscribe({
              next: value => {
                this.userService.setUser(value)
                localStorage.setItem("token", value.refreshToken)
              },
              error: error => {
                this.router.navigate([routerNames.signInPage]);
                this.createNotification('error', 'Phiên đăng nhập hết hạn')
              }
            })
          }else{
            this.createNotification('error', error)
          }
        },
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
        expiredDate: this.product.description,
        codeProduct: this.validateAddProductForm.value.codeProduct
          ? this.validateAddProductForm.value.codeProduct
          : '',
        phoneProvider: this.validateAddProductForm.value.phoneProvider
          ? this.validateAddProductForm.value.phoneProvider
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