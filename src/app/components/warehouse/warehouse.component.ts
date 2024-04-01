import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { IProduct } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IUser } from '../../types/user';
import { UserService } from '../../services/user.service';

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
    private userService: UserService
  ) { }

  private $destroy = new Subject()

  listProduct: IProduct[] = [];
  productItem: IProduct = {
    id: 0,
    nameProduct: "abc",
    quantityProduct: 0,
    expiredDate: "",
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
    this.searchService
      .getSearchInput()
      .pipe(takeUntil(this.$destroy), debounceTime(1000))
      .subscribe({
        next: value => {
          this.handleSearch(value)
        }
      })

      this.userService.getUser().subscribe({
        next: (res: IUser) => {
          this.user = res
        }
      })
  }

  handleGetProduct(textSearch: string) {
    this.producService.getProductWareHouse(this.user.id, textSearch).subscribe({
      next: (v) => {
        if (v.status == false) {
          this.notification.create("error", `${v.message}`, "");
        }
        else {
          this.listProduct = v.content.list
          console.log(this.listProduct);
        }
      },
      error: (error) => {
        console.log(error.error.messageError)
        error.error.messageError.map((e: string) => {
          this.notification.create("error", `${e}`, "");
        })
      }
    })
  }
  
  handleSearch(textSearch: string) {
    this.handleGetProduct(textSearch);
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
    console.log("Destoryed")
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
}
