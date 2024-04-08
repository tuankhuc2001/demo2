import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
  NgControl,
} from '@angular/forms';
import { IProduct } from '../../../types/product';
import { ProductService } from '../../../services/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { routerNames } from '../../../constant/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-update-quantity',
  templateUrl: './modal-update-quantity.component.html',
  styleUrl: './modal-update-quantity.component.css',
})
export class ModalUpdateQuantityComponent {
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() getProduct = new EventEmitter<IProduct>();

  constructor(
    private fb: NonNullableFormBuilder,
    private productService: ProductService,
    private notification: NzNotificationService,
    private router: Router,
  ) {}

  @Input() ProductDetail: IProduct = {
    id: 1,
    nameProduct: '',
    quantityProduct: 0,
    expiredDate: "",
    provider: '',
    unit: '',
    origin: '',
    codeProduct: '',
    description: '',
    providePrice: 0,
    floorPrice: 0,
    phoneProvider: '',
    imageUrl: "" 
  };
  isLoading: boolean = false;

  quantityValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0) {
      return { confirm: true, error: true };
    } else if ((control.value + this.ProductDetail.quantityProduct) > 10000) {
      return { quantityValid: true, error: true };
    }
    return {};
  };

  validateAddCartForm: FormGroup<{ 
    quantity: FormControl<number>;
  }> = this.fb.group({
    quantity: [1, [Validators.required, this.quantityValidator]],
  });

  handleSubmit() { 
    if (this.validateAddCartForm.value.quantity)
      this.ProductDetail.quantityProduct = this.validateAddCartForm.value.quantity;
    this.isLoading = true;
    if (this.validateAddCartForm.valid) {
      this.productService
        .updateQuantity(this.ProductDetail.id, this.ProductDetail)
        .subscribe({ 
          next: (v) => {
            this.handleCloseModal();
            this.getProduct.emit();
            this.createNotification('success', `${v.message}`);
            this.isLoading = false;
          },
          error: (error) => {
            error.error.messageError.map((e: string) => {
              this.notification.create("error", `${e}`, "");
              this.isLoading = false;
            })
            if (error.status === 403) {
              this.router.navigate([routerNames.signInPage]);
              this.createNotification('error', "Phiên đăng nhập hết hạn")
            }
          },
        });
    } else {
      Object.values(this.validateAddCartForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          this.isLoading = false;
        }
      }); 
    }
  } 

  createNotification(type: string, content: string): void {
    this.notification.create(type, `${content}`, '');
  }
  handleCloseModal() {
    this.validateAddCartForm.setValue({ quantity: 1 });
    this.closeModal.emit();
  }
}
