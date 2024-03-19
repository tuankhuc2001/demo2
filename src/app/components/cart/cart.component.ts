import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CartService } from '../../services/cart.service';

import { Router } from '@angular/router';
import { routerNames } from '../../constant/router';
import { ICartItem } from '../../types/cart-item';
import { IProduct } from '../../types/product';
import { ICart } from '../../types/cart';
import { IAddOder, IOrder } from '../../types/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnDestroy, OnInit {
  private destroyed$ = new Subject()
  constructor(
    private notification: NzNotificationService,
    private cartService: CartService,
    private router: Router) {
  }

  isVisibleModalCustomer: boolean = false;
  isLoading: boolean = false;
  isVisibleDeleteAll: boolean = false;
  isVisibleDeleteSingle: boolean = false;
  isVisibleAddOrder: boolean = false;

  idCartDelete: number = 0;
  idCartOrder: number = 0;
  idCartCustomer: number = 0;

  listCard: any[] = [];
  listCart: ICart[] = [];
  itemCartItem: ICartItem = {
    id: 1,
    Product: {
      id: 1,
      nameProduct: "String",
      quantityProduct: 1,
      expiredDate: "new Date",
      provider: "string",
      unit: "string",
      origin: "string",
      avatar: "any",
      codeProduct: "string",
      description: "string",
      providePrice: 1,
      floorPrice: 1,
      phoneProvider: "string",
    },
    idCart: 1,
    quantity: 1,
    rate: 1,
    plus: false,
    editPrice: 1,
    isDisable: false,
  };
  listCustomer: any[] = [];
  totalPrice: IAddOder ={
    totalPrice: 1,
  };


  handleTotalPriceChanged(totalPrice: number) {
    this.totalPrice.totalPrice = totalPrice;
  }

  handleBackProductSale() {
    this.router.navigate([routerNames.homePage + "/" + routerNames.productSalePage]);
  }

  handleValidate(): void {

  }

  handleOpenModalDeleteAll(idCart: any) {
    this.isVisibleDeleteAll = true;
    this.idCartDelete = idCart;
  }

  handleCloseModalDeleteAll(): void {
    this.isVisibleDeleteAll = false;
  }

  handleOpenModalDeleteSingle(event: ICartItem) {
    this.isVisibleDeleteSingle = true;
    this.itemCartItem = event;
  }

  handleCloseModalDeleteSingle(): void {
    this.isVisibleDeleteSingle = false
  }

  handleOpenModelAddOrder(idCart: any): void{
    this.isVisibleAddOrder = true;
    this.idCartOrder = idCart;
  }

  handleCloseModelAddOrder(): void{
    this.isVisibleAddOrder = false;
  }

  handleGetCart(): void {
    this.isLoading = true
    this.cartService.getCart(1).subscribe({
      next: (res) => {
        this.isLoading = false
        this.listCard = res.content.list
        this.listCart = res.content.list
        this.listCustomer = res?.content.list      
      },
      error: (error) => {
        this.isLoading = false
        this.createNotification('error', error)
      }
    })
  }

  handleOpenModelCustomer(idCartCustomer:number){
    this.idCartCustomer = this.listCard[0].id;
    this.isVisibleModalCustomer = true
  }

  handleCloseModelCustomer(): void{
    this.isVisibleModalCustomer = false
    this.handleGetCart()
  }

  ngOnInit(): void {
    this.handleGetCart();
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
