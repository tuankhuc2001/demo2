import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';

import { SearchService } from '../../services/search.service';
import { routerNames } from '../../constant/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit, OnDestroy{

  
  constructor( private searchService: SearchService, private orderService: OrderService, private router: Router){}
  private $destroy = new Subject()
  listCard: any = [{},{},{}]
  


  ngOnInit(): void {
      this.searchService.getSearchInput().pipe(takeUntil(this.$destroy), debounceTime(1000)).subscribe({next: value => {
        this.handleSearch(value)
      }})
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
    console.log("Destoryed")
  }

  handleSearch(textSearch: string){
    console.log(textSearch)
  }

  handleGetOrderDetail(idOrder: number){
    this.orderService.setOrderDetailId(idOrder)

    this.router.navigate([routerNames.orderDetailPage]);
  }
}
