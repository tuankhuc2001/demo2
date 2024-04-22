import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OrderService } from '../../../services/order.service';
import { IOrder } from '../../../types/order';

@Component({
  selector: 'app-modal-add-order',
  templateUrl: './modal-add-order.component.html',
  styleUrl: './modal-add-order.component.css'
})
export class ModalAddOrderComponent {
  constructor(
    private orderSerVice: OrderService,
    private notification: NzNotificationService,
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
  @Output() getProductSale: EventEmitter<void> = new EventEmitter

  handleCloseModal() {
    this.closeModal.emit();
  }

  handleAddOrder(idCart: number, orderRequest: IOrder) {
    this.orderSerVice.addOrder(idCart, orderRequest).subscribe({
      next: (res) => {
        this.createNotification('success', res.message)
        this.closeModal.emit();
        if(res.status == true){
        this.getProductSale.emit();}
      },
      error: (error) => {
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
