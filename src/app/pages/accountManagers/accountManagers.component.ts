import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { UserService } from '../../services/user.service';
import { IUser } from '../../types/user';

@Component({
  selector: 'app-accountManagers',
  templateUrl: './accountManagers.component.html',
  styleUrls: ['./accountManagers.component.css']
})
export class AccountManagersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
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
        this.createNotification('error', error)
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
    this.userService.getUser().subscribe({
      next: (res: IUser) => {
        this.listUser = res
      }
    })
    this.handleGetAllAccount();
  }

}
