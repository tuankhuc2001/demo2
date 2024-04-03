import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { IAddUser, IUser, IUserRequest } from '../../../types/user';

@Component({
  selector: 'app-modal-update-account',
  templateUrl: './modal-update-account.component.html',
  styleUrls: ['./modal-update-account.component.css']
})
export class ModalUpdateAccountComponent implements OnChanges {

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
  @Input() idUser: number =0;

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

  handleUpdateAccount(){

    if (this.validateFormAddUser.valid) {
      // const updateAccount = {
      //   password: this.validateFormAddUser.value.password ? this.validateFormAddUser.value.password : "",
      //   phone: this.validateFormAddUser.value.password ? this.validateFormAddUser.value.password : "",
      //   address: this.validateFormAddUser.value.password ? this.validateFormAddUser.value.password : "",
      //   fullname: this.validateFormAddUser.value.password ? this.validateFormAddUser.value.password : "",
      //   role: this.selectedValue
      // }
      this.IUserRequest.password = this.validateFormAddUser.value.password ? this.validateFormAddUser.value.password : "",
      this.IUserRequest.role = this.selectedValue
      
      this.userService.updateAccount(this.idUser, this.IUserRequest).subscribe({
        next: (v: any) => {
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
      password: "",
      newPassword: "",
    })
  }


  ngOnChanges() {
  }


  validateFormAddUser: FormGroup<{
    password: FormControl<string>;
    newPassword: FormControl<string>;
  }> = this.fb.group({
    password:[""],
    newPassword:[""]
  })

}
