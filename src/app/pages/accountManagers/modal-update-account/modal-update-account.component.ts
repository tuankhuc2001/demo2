import { Component, EventEmitter, Input, OnChanges, Output,  SimpleChanges, } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators, } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { IUserRequestUpdate } from '../../../types/user';

@Component({
  selector: 'app-modal-update-account',
  templateUrl: './modal-update-account.component.html',
  styleUrls: ['./modal-update-account.component.css'],
})
export class ModalUpdateAccountComponent implements OnChanges {
  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private fb: NonNullableFormBuilder,
    private router: Router
  ) {}
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  @Input() itemUser: IUserRequestUpdate = {
    id: 1,
    password: 'string',
    role: 'Sale',
  };

  handleCloseModal() {
    this.closeModal.emit();
    this.validateFormAddUser.reset();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.isVisible) {
      this.listRole = this.itemUser.role;
      this.validateFormAddUser.setValue({
        password: '',
        newPassword: '',
        role: this.listRole,
      });
    }
  }

  listRole: string = ' ';
  passwordVisible = false;
  newPasswordVisible = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleNewPasswordVisibility() {
    this.newPasswordVisible = !this.newPasswordVisible;
  }

  handleChangeRole(event: string) {
    this.listRole = event;
  }

  handleUpdateAccount() {
    if (
      this.validateFormAddUser.value.password !=
      this.validateFormAddUser.value.newPassword
    ) {
      this.notification.create('error', ``, 'Cập nhật mật khẩu thất bại!');
    } else {
      if (this.validateFormAddUser.valid) {
        (this.itemUser.password = this.validateFormAddUser.value.password
          ? this.validateFormAddUser.value.password
          : ''),
          (this.itemUser.role = this.listRole);
        this.userService
          .updateAccount(this.itemUser.id, this.itemUser)
          .subscribe({
            next: (v: any) => {
              if (v.status == false) {
                this.notification.create('error', `${v.message}`, '');
              } else {
                this.notification.create('success', `${v.message}`, '');
                this.handleCloseModal();
              }
            },
          });
      } else {
        Object.values(this.validateFormAddUser.controls).forEach((control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }
  }

  passwordValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } | null => {
    if (control.value.length > 255) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  newPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } | null => {
    if (control.value.length > 255) {
      return { confirm: true, error: true };
    } else if (control.value === null) {
      return { required: true };
    } else {
      return {};
    }
  };

  validateFormAddUser: FormGroup<{
    password: FormControl<string>;
    newPassword: FormControl<string>;
    role: FormControl<string>;
  }> = this.fb.group({
    password: ['', [Validators.required, this.passwordValidator]],
    newPassword: ['', [Validators.required, this.newPasswordValidator]],
    role: [''],
  });
}
