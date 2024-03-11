import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';

import { SearchService } from '../../services/search.service';
import { routerNames } from '../../constant/router';
import { OrderService } from '../../services/order.service';
import { IOrder } from '../../types/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit, OnDestroy {
  constructor(
    private searchService: SearchService,
    private orderService: OrderService,
    private router: Router) { }

  private $destroy = new Subject()

  listOrder: IOrder[] = []
  isLoading: boolean = false
  idOrder: number = 0

  ngOnInit(): void {
    this.searchService.getSearchInput().pipe(takeUntil(this.$destroy), debounceTime(1000)).subscribe({
      next: value => {
        this.handleSearch(value)
      }
    })
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
  }

  handleSearch(value: string) {
    this.orderService.getOrder(1, value).subscribe({
      next: (res) => {
        this.listOrder = res.content.list
        console.log(res)
      }
    })
  }

  handleGetOrderDetail(idOrder: number) {
    this.orderService.setOrderDetailId(idOrder)
    console.log(idOrder)
    this.router.navigate([routerNames.orderDetailPage]);
  }
}
