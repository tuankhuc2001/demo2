import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';

import { routerNames } from '../../constant/router';
import { OrderDetailService } from '../../services/order-detail.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {

  constructor(private orderDetailService: OrderDetailService, private router: Router){}
  private $destroy = new Subject()
  listCardOrderDetail: any = [{},{},{},{},{},{},{},{},{}]


  handleBackOrder(){
    this.router.navigate([routerNames.homePage+"/"+routerNames.orderPage]);
  }

}
