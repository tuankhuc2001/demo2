import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICustomerRequest } from '../../../types/customer';
import { CustomerService } from '../../../services/customer.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal-add-customer',
  templateUrl: './modal-add-customer.component.html',
  styleUrl: './modal-add-customer.component.css'
})
export class ModalAddCustomerComponent {

  constructor(
    private customerService: CustomerService,
    private notification: NzNotificationService,
    private fb: NonNullableFormBuilder, private router: Router,
  ) { }

  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  ngOnInIt(){
    this.validateFormAddCustomer.setValue({
      nameCustomer: "1",
      phoneCustomer: "2",
      address: "3",
    })
  }

  handleResetState() {
    this.validateFormAddCustomer.setValue({
      nameCustomer: "",
      phoneCustomer: "",
      address: "",
    })
  }

  handleCloseAddCustomer() {
    this.handleResetState();
    this.closeModal.emit();
  }

  handleAddCustomer() {
    if (this.validateFormAddCustomer.valid) {
      const addCustomer = {
        nameCustomer: this.validateFormAddCustomer.value.nameCustomer ? this.validateFormAddCustomer.value.nameCustomer : "",
        phoneCustomer: this.validateFormAddCustomer.value.phoneCustomer ? this.validateFormAddCustomer.value.phoneCustomer : "",
        address: this.validateFormAddCustomer.value.address ? this.validateFormAddCustomer.value.address : "",
      }
      this.customerService.addCustomer(addCustomer).subscribe({
        next: (v) => {
          if (v.status == false) {
            this.notification.create('error', `${v.message}`, '')
          } else {
            this.notification.create('success', `${v.message}`, '')
            this.handleResetState();
            this.handleCloseAddCustomer();
          }
        }
      })
    } else {
      Object.values(this.validateFormAddCustomer.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  nameCustomerValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 255) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    }
    else {
      return {}
    }
  }

  addressValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 255) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    }
    else {
      return {}
    }
  }

  phoneCustomerValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 11) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    }
    else {
      return {}
    }
  }

  validateFormAddCustomer: FormGroup<{
    nameCustomer: FormControl<string>;
    phoneCustomer: FormControl<string>;
    address: FormControl<string>;
  }> = this.fb.group({
    nameCustomer: ["", [Validators.required, this.nameCustomerValidator]],
    phoneCustomer: ["", [Validators.required, this.phoneCustomerValidator]],
    address: ["", [Validators.required, this.addressValidator]],
  })
}
