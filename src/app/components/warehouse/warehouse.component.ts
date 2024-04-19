import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { IProduct } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IUser } from '../../types/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ILoginResponse } from '../../types/login';
import { routerNames } from '../../constant/router';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent implements OnInit, OnDestroy {

  constructor(
    private searchService: SearchService,
    private producService: ProductService,
    private notification: NzNotificationService,
    private userService: UserService,
    private router: Router
  ) { }

  private $destroy = new Subject()

  isLoading: boolean = true

  listProduct: IProduct[] = [];
  productItem: IProduct = {
    id: 0,
    nameProduct: "abc",
    quantityProduct: 0,
    expiredDate: new Date,
    provider: "abc",
    unit: "abc",
    origin: "abc",
    codeProduct: "abc",
    description: "abc",
    providePrice: 0,
    floorPrice: 0,
    phoneProvider: "",
    imageUrl: ""
  }

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

  textSearch: string = ""
  isVisibleModalUpdatePrice: boolean = false;

  ngOnInit(): void {
    this.searchService.setSearchInput("")

    this.searchService
      .getSearchInput()
      .pipe(takeUntil(this.$destroy), debounceTime(1000))
      .subscribe({
        next: value => {
          this.handleSearch(value)
        }
      })
    this.user = this.userService.getUser()
  }

  handleGetProduct(textSearch: string) {
    this.isLoading = true
    this.producService.getProductWareHouse(this.user.id, textSearch).subscribe({
      next: (v) => {
        if (v.status == false) {
          this.notification.create("error", `${v.message}`, "");
        }
        else {
          this.listProduct = v.content.list
        }
        this.isLoading = false
      },
      error: (error) => {
        if (error.status === 403) {
          this.user = this.userService.getUser();
          this.userService
            .loginRefreshToken(this.user.refreshToken)
            .subscribe({
              next: (value) => {
                this.userService.setUser(value);
                localStorage.setItem('token', value.refreshToken);
              },
              error: (error) => {
                this.router.navigate([routerNames.signInPage]);
              },
            });
        }
      },
    })
  }

  handleSearch(textSearch: string) {
    this.handleGetProduct(textSearch);
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
  }

  handleOpenModalUpdatePrice(event: IProduct) {
    this.isVisibleModalUpdatePrice = true;
    this.productItem = event;
  }

  handleCloseModalUpdatePrice() {
    this.isVisibleModalUpdatePrice = false;
    this.searchService.getSearchInput().pipe(takeUntil(this.$destroy), debounceTime(1000)).subscribe({
      next: value => {
        this.handleSearch(value)
      }
    })
  }

  handleSetIsVisibleClose() {
    this.isVisibleModalUpdatePrice = false;
  }

  handleNavigate(): void {
    this.router.navigate(['singIn']);
  }
}
