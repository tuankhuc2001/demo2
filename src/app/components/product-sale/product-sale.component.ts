import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { __values } from 'tslib';

import { IProduct } from '../../types/product';
import { ProductService } from '../../services/product.service';
import { SearchService } from '../../services/search.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.css'
})
export class ProductSaleComponent implements OnDestroy, OnInit {
  listProduct: IProduct[] = []
  totalCartItem: number = 0
  isLoading: boolean = false
  private destroyed$ = new Subject()

  constructor( private notification: NzNotificationService,
    private searchService: SearchService, 
    private productService: ProductService,
    private router: Router) {
  }

  isVisibleModalAddCartItem: boolean = false
  productDetail: IProduct = {
    id: 0,
    nameProduct: "undefined",
    quantityProduct: 0,
    expiredDate: "new Date",
    provider: '',
    unit: '',
    origin: '',
    avatar: 'undefined',
    codeProduct: '',
    description: '',
    providePrice: 0,
    floorPrice: 0,
    phoneProvider: "0123456",
    imageUrl:""
  }

  handleSearch(value: string) {
    this.productService.getProductSale(1, value).subscribe({
      next: (res) => {
        this.listProduct = res.content.list
        this.totalCartItem = res.content.totalCartItem
        console.log(res)
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

  handleOpenModalAddCartItem(item: IProduct) {
    this.isVisibleModalAddCartItem = true
    this.productDetail = item
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

  handleNavigate(): void {
    this.router.navigate(['/cartPage']);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()
  }
}
