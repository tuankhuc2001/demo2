import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { SearchService } from '../../service/search.service';
import { __values } from 'tslib';
import { IProduct } from '../../types/product';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.css'
})
export class ProductSaleComponent implements OnDestroy, OnInit {
  listCard: any = [{},{},{}]
  private destroyed$ = new Subject()

  constructor(private searchService: SearchService) {
  }

  isVisibleModalAddCartItem: boolean = false
  productDetail: IProduct = {
    id: 1,
    nameProduct: 'mockProduct',
    quantityProduct: 200,
    expiredDate: new Date,
    provider: 'Factory ABC',
    unit: 'Box(es)',
    origin: 'Ha Noi',
    avatar: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
    codeProduct: 'XM2304',
    description: 'Avoid drinking more than 1 gauge',
    providePrice: 500000,
    floorPrice: 550000,
  }

  handleSearch(value: string) {
    console.log(value, "Search222")
  }

  handleOpenModalAddCartItem() {
    this.isVisibleModalAddCartItem = true
    this.productDetail = {
      id: 4,
      nameProduct: 'NextProduct',
      quantityProduct: 422,
      expiredDate: new Date,
      provider: 'Factory FGD',
      unit: 'Box(es)',
      origin: 'HCM',
      avatar: 'BBBBBBBBBBBBBBBB',
      codeProduct: 'Xaaaaaas',
      description: 'Avoid drinking more than 4 gauges',
      providePrice: 200000,
      floorPrice: 750000,

    }
  }

  handleCloseModalAddCartItem() {
    this.isVisibleModalAddCartItem = false
  }

  ngOnInit(): void {
    this.searchService.getSearchInput().pipe(takeUntil(this.destroyed$), debounceTime(1000)).subscribe({
      next: value => {
        this.handleSearch(value)
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
