import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { routerNames } from '../../constant/router';
import { OrderService } from '../../services/order.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IOrder } from '../../types/order';
import { IUser } from '../../types/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})

export class OrderComponent implements OnInit, OnDestroy {
  constructor(
    private notification: NzNotificationService,
    private searchService: SearchService,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router) { }

  private $destroy = new Subject()

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

  listOrder: IOrder[] = []
  isLoading: boolean = true

  ngOnInit(): void {
    this.searchService.getSearchInput().pipe(takeUntil(this.$destroy), debounceTime(1000)).subscribe({
      next: value => {
        this.handleSearch(value)
      }
    })
    this.user = this.userService.getUser()
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
  }

  handleSearch(value: string) {
    this.isLoading = true
    this.orderService.getOrder(1, value).subscribe({
      next: (res) => {
        this.listOrder = res.content.list
        this.isLoading = false
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
      ''
    );
  }

  handleGetOrderDetail(id: number) {
    this.orderService.setOrderDetail(id)
    this.router.navigate([routerNames.orderDetailPage]);
  }
}
