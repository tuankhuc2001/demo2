import { Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { IUserRequestUpdate, ItemUser } from '../../../types/user';

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

  @Input() itemUser: IUserRequestUpdate ={
    id: 1,
    password: "string",
    role:"s"
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.itemUser && changes.itemUser.currentValue) {
      this.selectedValue = changes.itemUser.currentValue.role;
    }
  }

  selectedValue = this.itemUser.role
  passwordVisible = false;

  handleChangeRole(event: string) {
    this.selectedValue = event
  }

  handleUpdateAccount(){
    if (this.validateFormAddUser.valid) {
      this.itemUser.password = this.validateFormAddUser.value.password ? this.validateFormAddUser.value.password : "",
      this.itemUser.role = this.selectedValue
      this.userService.updateAccount(2, this.itemUser).subscribe({
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

  validateFormAddUser: FormGroup<{
    password: FormControl<string>;
    newPassword: FormControl<string>;
  }> = this.fb.group({
    password:[""],
    newPassword:[""]
  })

}
