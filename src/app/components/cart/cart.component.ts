import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Subject } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CartService } from '../../services/cart.service';

import { Router } from '@angular/router';
import { routerNames } from '../../constant/router';
import { ICartItem } from '../../types/cart-item';
import { IOrder } from '../../types/order';
import { IUser } from '../../types/user';
import { UserService } from '../../services/user.service';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../types/customer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnDestroy, OnInit {
  private destroyed$ = new Subject()
  constructor(
    private notification: NzNotificationService,
    private cartService: CartService,
    private router: Router,
    private userService: UserService,
    private customerService: CustomerService
  ) {
  }

  isVisibleModalCustomer: boolean = false;
  isLoading: boolean = false;
  isVisibleDeleteAll: boolean = false;
  isVisibleDeleteSingle: boolean = false;
  isVisibleAddOrder: boolean = false;
  
  idCart: number = 0; 
  listCard: any[] = [];
  itemCartItem: ICartItem = {
    id: 1,
    productResponse: {
      id: 1,
      nameProduct: "String",
      quantityProduct: 1,
      expiredDate: new Date,
      provider: "string",
      unit: "string",
      origin: "string",
      codeProduct: "string",
      description: "string",
      providePrice: 1,
      floorPrice: 1,
      phoneProvider: "string",
      imageUrl: ""
    },
    idCart: 1,
    quantity: 1,
    rate: 1,
    plus: false,
    editPrice: 1,
    disable: false,
  };

  addOrder: IOrder = {
    id: 1,
    totalPrice: 1,
    status: "string",
    createdAt: new Date(),
    totalCartItem: 1,
    codeOrder: "string",
    User: {
      id: 0,
      phone: 'string',
      email: 'string',
      fullname: 'string',
      avatar: 'any',
      role: 'string',
      token: 'string',
      refreshToken: 'string'
    },
    customerResponse: {
      id: 1,
      nameCustomer: "string",
      phoneCustomer: "string",
      address: "string",
    }
  };

  user: IUser = {
    id: 0,
    phone: "",
    email: "",
    fullname: "",
    avatar: "",
    role: "",
    token: "",
    refreshToken: ""
  } 

  listCustomerProps: ICustomer[] = []

  handleTotalPriceChanged(totalPrice: number) {
    this.addOrder.totalPrice = totalPrice;
  }

  handleBackProductSale() {
    this.router.navigate([routerNames.homePage + "/" + routerNames.productSalePage]);
  }

  handleOpenModalDeleteAll(idCart: number) {
    this.isVisibleDeleteAll = true;
    this.idCart = idCart;
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

  handleOpenModelAddOrder(idCart: number): void {
    this.isVisibleAddOrder = true;
    this.idCart = idCart;
  }

  handleCloseModelAddOrder(): void {
    this.isVisibleAddOrder = false;
  }

  handleGetCart(): void {
    this.customerService.getCustomer("").subscribe({
      next: res => {
        this.listCustomerProps = res.content.list
      }
    })
    this.cartService.getCart(this.user.id).subscribe({
      next: (res) => {
        this.isLoading = false
        this.listCard = res.content.list
      },
      error: (error) => {
        this.isLoading = false
        if (error.status == 403) {
          this.user = this.userService.getUser()
          this.userService.loginRefreshToken(this.user.refreshToken).subscribe({
            next: value => {
              this.userService.setUser(value)
              localStorage.setItem("token", value.refreshToken)
              this.handleGetCart()
            },
            error: error => {
              this.router.navigate([routerNames.signInPage]);
              this.createNotification('error', "Phiên đăng nhập hết hạn")
            }
          })
        }
      }
    })
  }

  handleOpenModelCustomer() {
    this.idCart = this.listCard[0].id;
    this.isVisibleModalCustomer = true;
  }

  handleCloseModelCustomer(): void {
    this.isVisibleModalCustomer = false
    this.handleGetCart()
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.isLoading = true;
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
