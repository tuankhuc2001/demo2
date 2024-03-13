import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { ICart } from '../../../types/cart';
import { ICartItem } from '../../../types/cart-item';
import {IProduct} from '../../../types/product'
import { IAddOder } from '../../../types/order';
@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrl: './card-cart.component.css',
})
export class CardCartComponent implements OnChanges {
  @Input() listCard :any;
  @Output() onClickDeleteSingle: EventEmitter<ICartItem> = new EventEmitter();
  @Output() totalPriceChanged: EventEmitter<number> = new EventEmitter();

  totalPrice: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.listCard) {
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    if (!this.listCard || this.listCard.length === 0) {
      console.log("Danh sách card trống hoặc chưa được khởi tạo.");
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
  ngOnInit() {
    this.calculateTotalPrice();
  }

  handleOpenDeleteSingle(item:ICartItem){
    this.onClickDeleteSingle.emit(item)
  }
}
