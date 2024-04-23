import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, debounceTime, takeUntil } from 'rxjs';

import { UserService } from '../../services/user.service';
import { IUser } from '../../types/user';
import { Router } from '@angular/router';
import { routerNames } from '../../constant/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-accountManagers',
  templateUrl: './accountManagers.component.html',
  styleUrls: ['./accountManagers.component.css']
})
export class AccountManagersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private router: Router,
    private searchService: SearchService,
  ) { }
  private destroyed$ = new Subject();
  

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
  textSearch: string = ""

  handOpenModalAddAccount(){
    this.isVisibleModalAccount = true;
    
  }

  handleCloseModelAddAccount(){
    this.isVisibleModalAccount = false;
  }

  handleSearch(value: string) {
    this.textSearch = value
    this.handleGetAllAccount(value)
  }

  handleGetAllAccount(textSearch: string): void {
    this.isLoading = true
    this.userService.getAllAccount(textSearch).subscribe({
      next: (res) => {
        this.isLoading = false  
        this.listUser = res.content.list
      },
      error: (error) => {
        this.isLoading = false
        if (error.status == 403) {
          this.userService.loginRefreshToken(this.user.refreshToken).subscribe({
            next: value => {
              this.userService.setUser(value)
              localStorage.setItem("token", value.refreshToken)
            },
            error: error => {
              this.router.navigate([routerNames.signInPage]);
              this.createNotification('error', "Phiên đăng nhập hết hạn")
            }
          })
        }
      }
    })
  }

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      '',
      { nzDuration: 3000 }
    );
  }
  ngOnInit() {
    this.user = this.userService.getUser()
    this.searchService.setSearchInput("")
    this.searchService.getSearchInput().pipe(takeUntil(this.destroyed$), debounceTime(1000)).subscribe({
      next: value => {
        this.handleSearch(value)
      }
    })
  }

}
