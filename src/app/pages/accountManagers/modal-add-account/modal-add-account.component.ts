import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { IAddUser, IUser, IUserRequest } from '../../../types/user';


@Component({
  selector: 'app-modal-add-account',
  templateUrl: './modal-add-account.component.html',
  styleUrls: ['./modal-add-account.component.css']
})
export class ModalAddAccountComponent implements OnInit {

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private fb: NonNullableFormBuilder, private router: Router,
  ) { }

  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
    handleCloseModal() {
    this.closeModal.emit();
  }

  selectedValue = 'ROLE_SALE';

  IUserRequest: IUserRequest ={
    phone: "string",
    password: "string",
    address:"string",
    fullname: "string",
    role:"s"
  }

  passwordVisible = false;

  handleChangeRole(event: string) {
    this.selectedValue = event
    console.log(this.selectedValue);
    
  }

  handleAddAccount(){
    if (this.validateFormAddUser.valid) {
      const addAccount = {
        phone: this.validateFormAddUser.value.phone ? this.validateFormAddUser.value.phone : "",
        fullname: this.validateFormAddUser.value.fullname ? this.validateFormAddUser.value.fullname : "",
        password: this.validateFormAddUser.value.password ? this.validateFormAddUser.value.password : "",
        address: this.validateFormAddUser.value.address ? this.validateFormAddUser.value.address : "",
        role: this.selectedValue
      }
      console.log(addAccount);
      
      this.userService.addAccount(addAccount).subscribe({
        next: (v) => {
          if (v.status == false) {
            this.notification.create('error', `${v.message}`, '')
          } else {
            this.notification.create('success', `${v.message}`, '')
            this.handleResetState();
            this.handleCloseModal();
          }
        }
      })
    } else {
      Object.values(this.validateFormAddUser.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleResetState() {
    this.validateFormAddUser.setValue({
      fullname: "",
      phone: "",
      address: "",
      password: "",
    })
  }


  ngOnInit() {
  }

  userValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 255) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    }
    else {
      return {}
    }
  }

  phoneValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    if (control.value.length > 11) {
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

  validateFormAddUser: FormGroup<{
    fullname: FormControl<string>;
    phone: FormControl<string>;
    address: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    fullname: ["", [Validators.required, this.userValidator]],
    phone: ["", [Validators.required, this.phoneValidator]],
    address: ["", [Validators.required, this.addressValidator]],
    password:[""]
  })

}
