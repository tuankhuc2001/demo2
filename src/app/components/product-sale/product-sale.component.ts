import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { __values } from 'tslib';
import { IProduct } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../types/user';
import { routerNames } from '../../constant/router';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.css'
})
export class ProductSaleComponent implements OnDestroy, OnInit {
  listProduct: IProduct[] = []
  totalCartItem: number = 0
  isLoading: boolean = true
  private destroyed$ = new Subject()

  constructor(
    private notification: NzNotificationService,
    private searchService: SearchService,
    private productService: ProductService,
    private router: Router,
    private userService: UserService) {
  }

  textSearch: string = ""
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

  isVisibleModalAddCartItem: boolean = false
  productDetail: IProduct = {
    id: 0,
    nameProduct: "undefined",
    quantityProduct: 0,
    expiredDate: new Date,
    provider: '',
    unit: '',
    origin: '',
    codeProduct: '',
    description: '',
    providePrice: 0,
    floorPrice: 0,
    phoneProvider: "0123456",
    imageUrl: ""
  }

  ngOnInit(): void {
    this.searchService.setSearchInput("")
    this.searchService.getSearchInput().pipe(takeUntil(this.destroyed$), debounceTime(1000)).subscribe({
      next: value => {
        this.handleSearch(value)
      }
    })

    this.user = this.userService.getUser()
  }

  handleSearch(value: string) {
    this.textSearch = value
    this.handleGetProductSale(this.user.id, value)
  }

  handleGetProductSale(userId: number, textSearch: string) {
    this.isLoading = true
    this.productService.getProductSale(userId, textSearch).subscribe({
      next: (res) => {
        this.listProduct = res.content.list
        this.totalCartItem = res.content.totalCartItem
        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false
        if (error.status == 403) {
          this.userService.loginRefreshToken(this.user.refreshToken).subscribe({
            next: value => {
              this.userService.setUser(value)
              localStorage.setItem("token", value.refreshToken)
              if(userId !== null){
                this.handleGetProductSale(userId, textSearch)
              }
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

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      '',
      { nzDuration: 3000 }
    );
  }

  handleOpenModalAddCartItem(item: IProduct) {
    this.isVisibleModalAddCartItem = true
    this.productDetail = item
  }

  handleCloseModalAddCartItem() {
    this.isVisibleModalAddCartItem = false
  }

  handleNavigate(): void {
    this.router.navigate(['/cartPage']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
