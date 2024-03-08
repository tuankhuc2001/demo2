import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { IProduct } from '../../../types/product';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-modal-add-cart-item',
  templateUrl: './modal-add-cart-item.component.html',
  styleUrl: './modal-add-cart-item.component.css'
})
export class ModalAddCartItemComponent implements OnChanges {

  constructor(private fb: NonNullableFormBuilder) { }

  @Input() isVisible: boolean = false
  @Input() ProductDetail: IProduct = {
    id: 1,
    nameProduct: 'mockProduct',
    quantityProduct: 200,
    expiredDate: new Date,
    provider: 'Factory ABC',
    unit: 'Box(es)',
    origin: 'Ha Noi',
    avatar: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
    codeProduct: 'XM2304',
    description: 'Avoid drinking more than 1 gauge',
    providePrice: 500000,
    floorPrice: 550000,
  }

  @Output() closeModal: EventEmitter<void> = new EventEmitter()

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ProductDetail'] && !changes['ProductDetail'].firstChange) {
      console.log('ProductDetail changed:', changes['ProductDetail'].currentValue);
      this.validateAddCartForm.setValue({ quantity: 1, editPrice: this.ProductDetail.floorPrice, rate: 0 })
    }
  }

  /////////////// Form Handling

  editPriceValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (control.value > this.ProductDetail.floorPrice * 1.1 || control.value < this.ProductDetail.floorPrice * 0.9) {
      return { confirm: true, error: true }
    }
    return {}
  }

  quantityValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0) {
      return { confirm: true, error: true };
    }
    return {};
  }

  rateValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    const editPrice = this.validateAddCartForm ? this.validateAddCartForm.value.editPrice : null;
    if (control.value === null) {
      return { required: true };
    } else if (editPrice && (control.value > editPrice * 1.1 || control.value < editPrice * 0.9)) {
      return { confirm: true, error: true };
    }
    return null;
  }
  validateAddCartForm: FormGroup<{
    quantity: FormControl<number>;
    editPrice: FormControl<number>;
    rate: FormControl<number>
  }> = this.fb.group({
    quantity: [1, [Validators.required, this.quantityValidator]],
    editPrice: [this.ProductDetail.floorPrice, [Validators.required, this.editPriceValidator]],
    rate: [0, [Validators.required, this.rateValidator]]
  });

  handleSubmit() {
    if (this.validateAddCartForm.valid) {
      console.log('submit:', this.validateAddCartForm.value);
    } else {
      Object.values(this.validateAddCartForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  //////////////////////// 

  handleCloseModal() {
    
    this.closeModal.emit()
  }
}