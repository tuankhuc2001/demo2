import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
  NgControl
} from '@angular/forms';
@Component({
  selector: 'app-modal-update-quantity',
  templateUrl: './modal-update-quantity.component.html',
  styleUrl: './modal-update-quantity.component.css',
})
export class ModalUpdateQuantityComponent {
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  constructor(private fb: NonNullableFormBuilder) { }

  formProduct: any = {
    id: 1,
    nameProduct: 'mockProduct', 
    quantityProduct: 200,
    expiredDate: new Date(),
    provider: 'Factory ABC',
    unit: 'Box(es)',
    origin: 'Ha Noi',
    avatar: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
    codeProduct: 'XM2304',
    description: 'Avoid drinking more than 1 gauge',
    providePrice: 5000000000,
    floorPrice: 550000,
  };
  quantityValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true };
    } else if (control.value <= 0) {
      return { confirm: true, error: true };
    } 
    return {};
  }
  validateAddCartForm: FormGroup<{
    quantity: FormControl<number>;
  }> = this.fb.group({
    quantity: [0, [Validators.required, this.quantityValidator]],
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
  handleCloseModal() {
    this.closeModal.emit();
  }
  
}
