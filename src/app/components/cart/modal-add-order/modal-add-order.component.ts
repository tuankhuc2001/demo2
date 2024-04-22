import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OrderService } from '../../../services/order.service';
import { IOrder } from '../../../types/order';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { routerNames } from '../../../constant/router';
import { notificationEnum } from '../../../utils/notificationEnum';

@Component({
  selector: 'app-modal-add-order',
  templateUrl: './modal-add-order.component.html',
  styleUrl: './modal-add-order.component.css'
})
export class ModalAddOrderComponent {
  constructor(
    private orderSerVice: OrderService,
    private userService: UserService,
    private notification: NzNotificationService,
    private router: Router,
  ) { }

  @Input() isVisible: boolean = false;
  @Input() idCart: number = 0;;
  @Input() orderRequest: IOrder = {
    id: 1,
    totalPrice: 1,
    status: "string",
    createdAt: new Date(),
    totalCartItem: 1,
    codeOrder: "string",
    User: {
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
      id: 1,
      nameCustomer: "string",
      phoneCustomer: "string",
      address: "string",
    }
  };
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() getCart: EventEmitter<void> = new EventEmitter();
  @Output() getProductSale: EventEmitter<void> = new EventEmitter;

  isLoading: boolean = false

  handleCloseModal() {
    this.closeModal.emit();
  }

  handleAddOrder(idCart: number, orderRequest: IOrder) {
    this.isLoading = true
    this.orderSerVice.addOrder(idCart, orderRequest).subscribe({
      next: (res) => {
        this.isLoading = false
        this.createNotification('success', res.message)
        this.getProductSale.emit();
        this.closeModal.emit();
      },
      error: (error) => {
        if (error.status == 403) {
          const user = this.userService.getUser()
          this.userService.loginRefreshToken(user.refreshToken).subscribe({
            next: value => {
              this.userService.setUser(value)
              localStorage.setItem("token", value.refreshToken)
              this.handleAddOrder(idCart, orderRequest)
            },
            error: () => {
              this.isLoading = false
              this.router.navigate([routerNames.signInPage]);
              this.createNotification(notificationEnum.error, "Phiên đăng nhập hết hạn")
            }
          })
        } else {
          error.error.messageError.map((e: string) => {
            this.createNotification(notificationEnum.error, e)
          })
        }
        this.isLoading = false
        this.createNotification('error', error)
        this.closeModal.emit();
        this.getCart.emit();
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
}
