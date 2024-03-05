import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from '../../../types/order';

@Component({
  selector: 'app-card-order-detail',
  templateUrl: './card-order-detail.component.html',
  styleUrls: ['./card-order-detail.component.css']
})
export class CardOrderDetailComponent implements OnInit {

  @Input() listCardOrderDetail: any;
  @Input() listOderDetail: IOrder = {
    id: 0,
    User: {
      id: 1,
      phone: 'abc',
      password:'abc',
      email: 'abc',
      fullname: 'Nguyễn Quang Hải',
      avatar: 'abc',
      type: 'sale'
    },
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
    codeOrder: "abc",
  };
  constructor() { }

  ngOnInit() {
  }

}
