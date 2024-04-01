import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { IProduct } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
    avatar: "abc",
    codeProduct: "abc",
    description: "abc",
    providePrice: 0,
    floorPrice: 0,
    phoneProvider: "",
    imageUrl:""
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
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
    console.log("Destoryed")
  }

  handleSearch(textSearch: string) {
    this.handleGetProduct(textSearch);
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

  handleGetProduct(textSearch: string) {
    this.producService.getProductSale(1, textSearch).subscribe({
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

}
