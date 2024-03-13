import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CartItemService } from '../../../services/cart-item.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OrderService } from '../../../services/order.service';
import { IOder } from '../../../types/order';

@Component({
  selector: 'app-modal-add-order',
  templateUrl: './modal-add-order.component.html',
  styleUrl: './modal-add-order.component.css'
})
export class ModalAddOrderComponent {
  constructor (
    private orderSerVice: OrderService,
    private cartItemService: CartItemService,
    private notification: NzNotificationService,
    ) {}

  @Input() isVisible: boolean = false;
  @Input() idCart: any;
  @Input() orderRequest: any;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() getCart: EventEmitter<void> = new EventEmitter();

  handleCloseModal() {
    this.closeModal.emit();
  }

  handleAddOrder(idCart: any, orderRequest: IOder) {
    console.log(typeof orderRequest,"xem lay duoc du lieu gui xuong chua");
    this.orderSerVice.addOrder(idCart, orderRequest).subscribe({
      next: (res) => {
        this.createNotification('success', res.message) 
        this.closeModal.emit();
        this.getCart.emit();
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
