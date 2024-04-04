import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';

import { SearchService } from '../../services/search.service';
import { routerNames } from '../../constant/router';
import { OrderService } from '../../services/order.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IOrder } from '../../types/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent implements OnInit, OnDestroy {
  constructor(
    private notification: NzNotificationService,
    private searchService: SearchService,
    private orderService: OrderService,
    private router: Router) { }

  private $destroy = new Subject()

  listOrder: IOrder[] = []
  isLoading: boolean = false

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
    this.isLoading = true
    this.orderService.getOrder(1, value).subscribe({
      next: (res) => {
        this.listOrder = res.content.list
        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false
        if (error.status == 403) {
          this.router.navigate([routerNames.signInPage]);
          this.createNotification('error', "Phiên đăng nhập hết hạn")
        }
      }
    })
  }

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      ''
    );
  }

  handleGetOrderDetail(id: number) {
    this.orderService.setOrderDetail(id)
    this.router.navigate([routerNames.orderDetailPage]);
  }
}
