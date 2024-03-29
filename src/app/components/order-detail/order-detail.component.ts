import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Location } from '@angular/common';

import { IOrderAndOrderDetail } from '../../types/order';
import { OrderService } from '../../services/order.service';
import { OrderDetailService } from '../../services/order-detail.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {

  constructor(
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private location: Location) { }

  private $destroy = new Subject()

  listOrderAndDetail: IOrderAndOrderDetail[] = []
  listCardOrderDetail: IOrderAndOrderDetail = {
    id: 0,
    totalPrice: 0,
    status: '',
    createdAt: new Date(),
    totalCartItem: 0,
    codeOrder: '',
    userResponse: {
      id: 0,
      phone: '',
      password: '',
      email: '',
      fullname: '',
      address: '',
      avatar: '',
      type: ''
    },
    customerResponse: {
      id: 0,
      nameCustomer: '',
      phoneCustomer: '',
      address: '',
    },
    orderDetailResponseList: []
  };

  isLoading: boolean = false

  handleGetOrderDetail(value: number) {
    this.orderDetailService.getOrderDetail(value).subscribe({
      next: (res) => {
        this.listOrderAndDetail = res.content.list
        this.listCardOrderDetail = res.content.list[0]
        console.log(res.content.list[0])
      }
    })
  }

  ngOnInit(): void {
    this.orderService.getOrderDetails().subscribe({
      next: (value: number) => {
        this.handleGetOrderDetail(value)
      }
    })
  }

  handleBackOrder() {
    this.location.back()
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
  }
}
