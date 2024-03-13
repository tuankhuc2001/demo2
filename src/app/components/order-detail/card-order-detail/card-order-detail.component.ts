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
      user: {
        id: 0,
        phone: '',
        password: '',
        email: '',
        fullname: '',
        avatar: '',
        type: '',
      },
      customerResponse: {
        id: 0,
        nameCustomer: '',
        phoneCustomer: '',
        adderss: ''
      },
      orderDetailResponseList: []
  };

  handlelog(): void {
    console.log(this.listCardOrderDetail, "AppList")
  }

  constructor() { }

  ngOnInit() {
  }

}
