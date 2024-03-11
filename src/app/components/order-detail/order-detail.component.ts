import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';

import { routerNames } from '../../constant/router';
import { IOrderAndOrderDetail } from '../../types/order';
import { SearchService } from '../../services/search.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent {

  constructor(
    private orderService: OrderService, 
    private searchService: SearchService,
    private router: Router){}

  private $destroy = new Subject()

  listOrderDetail: IOrderAndOrderDetail[] = []
  isLoading: boolean = false

  ngOnInit(): void {
    this.searchService.getSearchInput().pipe(takeUntil(this.$destroy), debounceTime(1000)).subscribe({
      next: value => {
        this.handleSearch(value)
      }
    })
  }

  handleSearch(value: string) {
    this.orderService.getOrderDetail(1).subscribe({
      next: (res) => {
        this.listOrderDetail = res.content.list
        console.log(res)
      }
    })
  }

  handleBackOrder(){
    this.router.navigate([routerNames.homePage+"/"+routerNames.orderPage]);
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
  }

}
