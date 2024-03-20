import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { ICart } from '../../../types/cart';
import { CartItemRequest, ICartItem } from '../../../types/cart-item';
import {IProduct} from '../../../types/product'
import { CartItemService } from '../../../services/cart-item.service';
@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrl: './card-cart.component.css',
})
export class CardCartComponent implements OnChanges {
  constructor (
    private cartItemService: CartItemService,
    private notification: NzNotificationService,
    ) {}
  @Input() listCard :any;
  @Output() onClickDeleteSingle: EventEmitter<ICartItem> = new EventEmitter();
  @Output() totalPriceChanged: EventEmitter<number> = new EventEmitter();
  @Output() getCart: EventEmitter<void> = new EventEmitter();

  totalPrice: number = 0;
  quantity: number = 0;

  cartItemRequest: ICartItem ={
    id: 1,
    Product: {
      id: 0,
      nameProduct: "abc",
      quantityProduct: 0,
      expiredDate: "new Date",
      provider: "abc",
      unit: "abc",
      origin: "abc",
      avatar: "abc",
      codeProduct: "abc",
      description: "abc",
      providePrice: 0,
      floorPrice: 0,
      phoneProvider: "012345"
    },
    idCart: 1,
    quantity: 0,
    rate: 4,
    plus: false,
    editPrice: 1,
    isDisable: false,
  
  }

  onInputQuantity(item: any, event: any) {
    const inputQuantity = event.target.value;
    const availableQuantity = item.productResponse.quantityProduct;

    item.showErrorQuantityNoEnter = false;
    item.showErrorQuantityExceed = false;

    if (!inputQuantity || inputQuantity <= 0) {
        item.showErrorQuantityNoEnter = true;
    } else if (inputQuantity > availableQuantity) {
        item.showErrorQuantityExceed = true;
    }
}

  onInputRate(item: any, event: any) {
    const value = event.target.value;
    item.showRateError = !value;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.listCard) {
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    if (!this.listCard || this.listCard.length === 0) {
      return;
    }
    this.totalPrice = 0;
    this.listCard.forEach((card: any) => {
      card.cartItemResponseSet.forEach((item: any) => {
        const itemTotal = item.plus ? (item.editPrice + item.rate) * item.quantity : (item.editPrice - item.rate) * item.quantity;
        this.totalPrice += itemTotal;
      });
    });
    this.totalPriceChanged.emit(this.totalPrice);
  }

  handleOpenDeleteSingle(item:ICartItem){
    this.onClickDeleteSingle.emit(item)
  }

  handlePlusQuantity(item: any) { 
    if (!item) {
      return;
    }
    item.quantity = (item.quantity ?? 0) + 1;
    this.cartItemRequest.quantity = item.quantity;
    this.cartItemService.updateQuantity(item.id, this.cartItemRequest).subscribe({
      next: (res) => {
        this.calculateTotalPrice();
        this.getCart.emit();
      },
      error: (error) => {
        this.createNotification('error', error) 
        this.getCart.emit();
      }
    })
  }

  handleMinusQuantity(item: any) {
    if (!item) {
      return;
    }
    if (item.quantity <= 1) {
      return;
    }
    item.quantity = (item.quantity ?? 0) - 1;
    this.cartItemRequest.quantity = item.quantity;
    
    this.cartItemService.updateQuantity(item.id, this.cartItemRequest).subscribe({
      next: (res) => {
        this.calculateTotalPrice();
        this.getCart.emit();
      },
      error: (error) => {
        this.createNotification('error', error) 
        this.getCart.emit();
      }
    })
  } 

  handlePlus(item: any) {
    if (!item) {
      return;
    }
    this.cartItemRequest.plus = !item.plus
    this.cartItemService.updateIsPlus(item.id, this.cartItemRequest).subscribe({
      next: (res) => {
        this.createNotification('success', res.message) 
        this.calculateTotalPrice();
        this.getCart.emit();
      },
      error: (error) => {
        this.createNotification('error', error) 
        this.getCart.emit();
      }
    })
  } 


  handleRateBlur(item: any, event: any) {
    const value = event.target.value;
    item.showRateError = !value;
    this.cartItemRequest.rate = event.target.value;
    if (!item) {
      return;
    }
    this.cartItemService.updateRate(item.id, this.cartItemRequest).subscribe({
      next: (res) => {
        this.createNotification('success', res.message) 
        this.calculateTotalPrice();
        this.getCart.emit();
      },
      error: (error) => {
        this.createNotification('error', error) 
        this.getCart.emit();
      }
    })
    
  }

  handleQuantityBlur(item: any, event: any) {
    const newValue = event.target.value;
  
    if (item.showErrorQuantityNoEnter || item.showErrorQuantityExceed) {
      event.target.value = item.quantity; 
      setTimeout(() => {
        item.showErrorQuantityNoEnter = false;
        item.showErrorQuantityExceed = false;
        this.getCart.emit();
    }, 1000);
    } else {
      if (!item) {
        return;
      }
      this.cartItemRequest.quantity = newValue;
  
      this.cartItemService.updateQuantity(item.id, this.cartItemRequest).subscribe({
        next: (res) => {
          item.originalQuantity = newValue;
          this.calculateTotalPrice();
          this.getCart.emit();
        },
        error: (error) => {
          event.target.value = item.originalQuantity;
          this.createNotification('error', error);
          this.getCart.emit();
        }
      });
    }
  }

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      ''
    );
  }

}
