import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { __values } from 'tslib';
import { IProduct } from '../../types/product';
import { buttonType } from '../../constant/button';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.css'
})
export class ProductSaleComponent implements OnDestroy, OnInit {
  buttonType = buttonType

  private destroyed$ = new Subject()

  constructor(private searchService: SearchService) {
  }

  isVisibleModalAddCartItem: boolean = false
  productDetail: IProduct = {
    id: 1,
    nameProduct: 'mockProduct',
    quantityProduct: 200,
    expiredDate: "ngu",
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
    console.log(value, "Search")
  }

  handleOpenModalAddCartItem() {
    this.isVisibleModalAddCartItem = true
    this.productDetail = {
      id: 4,
      nameProduct: 'NextProduct',
      quantityProduct: 422,
      expiredDate: "ngu",
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
