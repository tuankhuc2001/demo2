import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { routerNames } from '../../constant/router';
import { IOrderAndOrderDetail } from '../../types/order';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {

  constructor(
    private orderService: OrderService,
    private router: Router) { }

  private $destroy = new Subject()

  listOrderAndDetail: IOrderAndOrderDetail[] = []
  listCardOrderDetail: IOrderAndOrderDetail = {
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
      type: ''
    },
    customerResponse: {
      id: 0,
      nameCustomer: '',
      phoneCustomer: '',
      adderss: ''
    },
    orderDetailResponseList: []
  };

  isLoading: boolean = false

  handleGetOrderDetail(value: number) {
    this.orderService.getOrderDetail(value).subscribe({
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
    this.router.navigate([routerNames.homePage + "/" + routerNames.orderPage]);
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
  }
}
