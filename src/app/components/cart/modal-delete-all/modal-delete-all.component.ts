import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CartItemService } from '../../../services/cart-item.service';

@Component({
  selector: 'app-modal-delete-all',
  templateUrl: './modal-delete-all.component.html',
  styleUrl: './modal-delete-all.component.css'
})
export class ModalDeleteAllComponent {
  constructor (
    private cartItemService: CartItemService,
    private notification: NzNotificationService,
    ) {}
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() getCart: EventEmitter<void> = new EventEmitter();
  @Input() idCart: number = 0;

  handleCloseModal() {
    this.closeModal.emit();
  }

  handleDeleteAllCartItem(idCart: number){
    this.cartItemService.deleteAllCartItem(idCart).subscribe({
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
      '',
      { nzDuration: 3000 }
    );
  }
}
