import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { CartItemService } from '../../../services/cart-item.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-modal-delete-single',
  templateUrl: './modal-delete-single.component.html',
  styleUrl: './modal-delete-single.component.css'
})
export class ModalDeleteSingleComponent {
  constructor (
    private cartService: CartService, 
    private cartItemService: CartItemService,
    private notification: NzNotificationService,
    ) {}
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() getCart: EventEmitter<void> = new EventEmitter();
  @Input() idCartItem: any;

  handleCloseModal() {
    this.closeModal.emit();
  }

  handleDeleteCartItem(idCartItem: number){
    
    this.cartItemService.deleteCartItem(idCartItem).subscribe({
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
