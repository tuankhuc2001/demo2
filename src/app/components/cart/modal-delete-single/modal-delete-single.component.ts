import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItemService } from '../../../services/cart-item.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ICartItem } from '../../../types/cart-item';

@Component({
  selector: 'app-modal-delete-single',
  templateUrl: './modal-delete-single.component.html',
  styleUrl: './modal-delete-single.component.css'
})
export class ModalDeleteSingleComponent implements OnChanges {
  constructor(
    private cartItemService: CartItemService,
    private notification: NzNotificationService,
  ) { }
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();
  @Output() getCart: EventEmitter<void> = new EventEmitter();
  @Input() cartItem: ICartItem = {
    id: 1,
    productResponse: {
      id: 1,
      nameProduct: "String",
      quantityProduct: 1,
      expiredDate: new Date,
      provider: "string",
      unit: "string",
      origin: "string",
      codeProduct: "string",
      description: "string",
      providePrice: 1,
      floorPrice: 1,
      phoneProvider: "string",
      imageUrl: ""
    },
    idCart: 1,
    quantity: 1,
    rate: 1,
    plus: false,
    editPrice: 1,
    disable: false,
  };
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartItem'] && !changes['cartItem'].firstChange) {
      this.cartItem = changes['cartItem'].currentValue;
    }
  }

  handleCloseModal() {
    this.closeModal.emit();
  }

  handleDeleteCartItem(cartItem: ICartItem) {
    this.cartItemService.deleteCartItem(cartItem.id).subscribe({
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
