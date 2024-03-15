import { Component, Input } from '@angular/core';
import { ICartItem } from '../../../types/cart-item';
@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrl: './card-cart.component.css',
})
export class CardCartComponent {
  @Input() listCard: any;
  @Input() listProduct: ICartItem = {
    id: 0,
    Product: {
      id: 0,
      nameProduct: "abc",
      quantityProduct: 0,
      expiredDate: new Date,
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
    idCart: 0,
    quantity: 0,
    rate: 0,
    isPlus: true,
    editPrice: 0,
    isDisable: true,
  };
}
