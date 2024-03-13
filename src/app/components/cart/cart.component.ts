import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CartService } from '../../services/cart.service';

import { Router } from '@angular/router';
import { routerNames } from '../../constant/router';
import { ICartItem } from '../../types/cart-item';
import { IProduct } from '../../types/product';
import { ICart } from '../../types/cart';
import { IAddOder, IOder } from '../../types/order';

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


  listCard: any[] = [];
  // itemCartItem: ICartItem = {
  //   id: 0,
  //   Product : {
  //     id: 0,
  //     nameProduct: "",
  //     quantityProduct: 0,
  //     expiredDate: "",
  //     provider: "",
  //     unit: "",
  //     origin: "",
  //     avatar: "any",
  //     codeProduct: "",
  //     description: "",
  //     providePrice: 0,
  //     floorPrice: 0,
  //   },
  //   quantity: 0,
  //   rate: 0,
  //   isPlus: false,
  //   editPrice: 0,
  //   isDisable: false,
  // };

  itemCartItem: any;
  idCartDelete: any;
  idCartOrder: any;

  listCustomer: any[] = [];
  totalPrice: IAddOder ={
    totalPrice: 1,
  };

  handleTotalPriceChanged(totalPrice: number) {
    this.totalPrice.totalPrice = totalPrice;
  }

  

  isLoading: boolean = false;
  isVisibleDeleteAll: boolean = false;
  isVisibleDeleteSingle: boolean = false;
  isVisibleAddOrder: boolean = false;

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
        this.listCustomer = res?.content.list
      },
      error: (error) => {
        this.isLoading = false
        this.createNotification('error', error)
      }
    })
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
