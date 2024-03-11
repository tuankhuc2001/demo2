import { Component,EventEmitter,Input, Output } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

import { ICart } from '../../../types/cart';
import { ICartItem } from '../../../types/cart-item';
import {IProduct} from '../../../types/product'
@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrl: './card-cart.component.css',
})
export class CardCartComponent {
  @Input() listCard :any;
  @Output() onClickDeleteSingle: EventEmitter<void> = new EventEmitter();

  handleOpenDeleteSingle(){
    this.onClickDeleteSingle.emit()
  }
}
