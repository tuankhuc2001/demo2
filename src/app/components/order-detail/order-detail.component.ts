import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { trigger, transition, animate, style } from '@angular/animations';
import { IOrderAndOrderDetail } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { OrderDetailService } from '../../services/order-detail.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { routerNames } from '../../constant/router';
import { IUser } from '../../types/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css',
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ]
})
export class OrderDetailComponent {

  constructor(
    private router: Router,
    private notification: NzNotificationService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private userService: UserService
  ) { }

  private $destroy = new Subject()

  isLoading: boolean = false
  listOrderAndDetail: IOrderAndOrderDetail[] = []
  listCardOrderDetail: IOrderAndOrderDetail = {
    id: 0,
    totalPrice: 0,
    status: '',
    createdAt: new Date(),
    totalCartItem: 0,
    codeOrder: '',
    userResponse: {
      id: 0,
      phone: 'string',
      email: 'string',
      fullname: 'string',
      avatar: 'any',
      role: 'string',
      token: 'string',
      refreshToken: 'string'
    },
    customerResponse: {
      id: 0,
      nameCustomer: '',
      phoneCustomer: '',
      address: '',
    },
    orderDetailResponseList: []
  };
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

  ngOnInit(): void {
    this.orderService.getOrderDetails().subscribe({
      next: (value: number) => {
        this.handleGetOrderDetail(value)
      }
    });
    this.user = this.userService.getUser();
  }

  setColors(color: string): void {
    document.documentElement.style.setProperty('--active-tab-color', color);
    document.documentElement.style.setProperty('--ink-bar-color', color);
  }

  handleGetOrderDetail(value: number): void {
    this.orderDetailService.getOrderDetail(value).subscribe({
      next: (res) => {
        this.listOrderAndDetail = res.content.list
        this.listCardOrderDetail = res.content.list[0]
        this.updateStatus(res.content.list[0].status)
      },
      error: (error) => {
        this.isLoading = false
        if (error.status == 403) {
          this.userService.loginRefreshToken(this.user.refreshToken).subscribe({
            next: value => {
              this.userService.setUser(value);
              localStorage.setItem("token", value.refreshToken)
            },
            error: error => {
              this.router.navigate([routerNames.signInPage]);
              this.createNotification('error', "Phiên đăng nhập hết hạn");
            }
          });
        }
      }
    });
  }

  updateStatus(status: string): void {
    this.listCardOrderDetail.status = status;
    this.setColorsAccordingToStatus(status);
  }

  setColorsAccordingToStatus(status: string): void {
    switch (status) {
      case 'success':
        this.setColors('#1A9804');
        break;
      case 'fail':
        this.setColors('#C7393C');
        break;
      case 'pending':
        this.setColors('#1E5993');
        break;
      default:
        break;
    }
  }

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      ''
    );
  }

  handleBackOrder() {
    this.router.navigate([routerNames.homePage + "/" + routerNames.orderPage]);
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
  }
}
