import { Component, Input } from '@angular/core';
import { IProduct } from '../../../types/product';
import { IOder } from '../../../types/order';
@Component({
  selector: 'app-card-oder',
  templateUrl: './card-oder.component.html',
  styleUrl: './card-oder.component.css',
})
export class CardOderComponent {
  @Input() listCard: any;
  @Input() listOder: IOder = {
    id: 0,
    idUser: 0,
    Customer: {
      id: 0,
      nameCustomer: "abc",
      phoneCustomer: "abc",
      adderss: "abc",
    },
    totalPrice: 0,
    status: "abc",
    createdAt: new Date(),
    totalCartItem: 0,
    color: "abc",
    codeOder: "abc",
  };
}
