import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { UserService } from '../../services/user.service';
import { IUser } from '../../types/user';
import { Router } from '@angular/router';
import { routerNames } from '../../constant/router';

@Component({
  selector: 'app-accountManagers',
  templateUrl: './accountManagers.component.html',
  styleUrls: ['./accountManagers.component.css']
})
export class AccountManagersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private router: Router
  ) { }
  

  isLoading: boolean = false;
  isVisibleModalAccount: boolean = false;
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

  listUser: any;

  handOpenModalAddAccount(){
    this.isVisibleModalAccount = true;
  }

  handleCloseModelAddAccount(){
    this.isVisibleModalAccount = false;
  }

  handleGetAllAccount(): void {
    this.isLoading = true
    this.userService.getAllAccount().subscribe({
      next: (res) => {
        this.isLoading = false  
        this.listUser = res.content.list
      },
      error: (error) => {
        this.isLoading = false
        if (error.status == 403) {
          this.router.navigate([routerNames.signInPage]);
          this.createNotification('error', "Phiên đăng nhập hết hạn")
        }
      }
    })
  }

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      ''
    );
  }
  ngOnInit() {
    this.user = this.userService.getUser()
    this.handleGetAllAccount();
  }

}
