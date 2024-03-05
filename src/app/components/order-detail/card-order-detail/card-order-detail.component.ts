import { Component, Input, OnInit } from '@angular/core';
import { IOder } from '../../../types/order';

@Component({
  selector: 'app-card-order-detail',
  templateUrl: './card-order-detail.component.html',
  styleUrls: ['./card-order-detail.component.css']
})
export class CardOrderDetailComponent implements OnInit {

  @Input() listCardOrderDetail: any;
  @Input() listOderDetail: IOder = {
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
  constructor() { }

  ngOnInit() {
  }

}
