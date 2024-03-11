import { Component, Input, OnInit } from '@angular/core';
import { IOrder, IOrderAndOrderDetail } from '../../../types/order';

@Component({
  selector: 'app-card-order-detail',
  templateUrl: './card-order-detail.component.html',
  styleUrls: ['./card-order-detail.component.css']
})
export class CardOrderDetailComponent implements OnInit {

  @Input() listCardOrderDetail: IOrderAndOrderDetail[] = [];;
  constructor() { }

  ngOnInit() {
  }

}
