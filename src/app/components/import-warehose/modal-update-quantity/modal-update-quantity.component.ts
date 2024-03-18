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
    private notification: NzNotificationService
  ) {}

  @Input() ProductDetail: IProduct = {
    id: 1,
    nameProduct: 'mockProduct',
    quantityProduct: 200,
    expiredDate: "new Date()",
    provider: 'Factory ABC',
    unit: 'Box(es)',
    origin: 'Ha Noi',
    avatar: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
    codeProduct: 'XM2304',
    description: 'Avoid drinking more than 1 gauge',
    providePrice: 500000,
    floorPrice: 550000,
    phoneProvider: '01234567890',
  };
  isLoading: boolean = false;
  listProduct = {
    nameProduct: 'mockProduct',
    quantityProduct: 200,
    expiredDate: new Date(),
    provider: 'Factory ABC',
    unit: 'Box(es)',
    origin: 'Ha Noi',
    avatar: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
    codeProduct: 'XM2304',
    description: 'Avoid drinking more than 1 gauge',
    providePrice: 500000,
    floorPrice: 550000,
    phoneProvider: '01234567890',
  }

  quantityValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0) {
      return { confirm: true, error: true };
    }
    return {};
  };
  validateAddCartForm: FormGroup<{
    quantity: FormControl<number>;
  }> = this.fb.group({
    quantity: [0, [Validators.required, this.quantityValidator]],
  });

  handleSubmit() {
    if (this.validateAddCartForm.value.quantity)
      this.listProduct.quantityProduct = this.validateAddCartForm.value.quantity;
    this.isLoading = true;
    if (this.validateAddCartForm.valid) {
      this.productService
        .updateQuantity(this.ProductDetail.id, this.listProduct)
        .subscribe({
          next: (v) => {
            this.handleCloseModal();
            this.getProduct.emit();
            this.createNotification('success', `${v.message}`);
            this.isLoading = false;
          },
          error: (error) => {
            this.createNotification('error', error);
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
    this.validateAddCartForm.setValue({ quantity: 0 });
    this.closeModal.emit();
  }
}
