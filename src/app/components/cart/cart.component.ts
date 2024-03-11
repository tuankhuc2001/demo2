import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { ICart } from '../../types/cart';
import { ICartItem } from '../../types/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnDestroy, OnInit {
  listCard: ICart[] = []
  listCustomer: any[] = []
  
  isVisibleDeleteAll: boolean = false;
  isVisibleDeleteSingle: boolean = false;

  handleOpenModalDeleteAll(): void {
    this.isVisibleDeleteAll = true
  }

  handleCloseModalDeleteAll(): void {
    this.isVisibleDeleteAll = false
  }

  handleOpenModalDeleteSingle(): void {
    this.isVisibleDeleteSingle = true
  }

  handleCloseModalDeleteSingle(): void {
    this.isVisibleDeleteSingle = false
  }






  private destroyed$ = new Subject()
  constructor( private notification: NzNotificationService,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.getCart(1).subscribe({
      next: (res) => {
        this.listCard = res.content.list
        this.listCustomer = res?.content.list
        
      },
      error: (error) => {
        this.createNotification('error', error)
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
  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
