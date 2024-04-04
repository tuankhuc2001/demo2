import { Component, Input, OnInit } from '@angular/core';
import { IOrderAndOrderDetail } from '../../../types/order';

@Component({
  selector: 'app-card-order-detail',
  templateUrl: './card-order-detail.component.html',
  styleUrls: ['./card-order-detail.component.css']
})

export class CardOrderDetailComponent implements OnInit {

  @Input() listCardOrderDetail: IOrderAndOrderDetail = {
    id: 0,
    totalPrice: 0,
    status: '',
    createdAt: new Date(),
    totalCartItem: 0,
    codeOrder: '',
    userResponse: {
      id: 0,
      phone: 'string',
      email: 'string',
      fullname: 'string',
      avatar: 'any',
      role: 'string',
      token: 'string',
      refreshToken: 'string'
    },
    customerResponse: {
      id: 0,
      nameCustomer: '',
      phoneCustomer: '',
      address: '',
    },
    orderDetailResponseList: []
  };

  constructor() { }

  ngOnInit() {
  }

}
