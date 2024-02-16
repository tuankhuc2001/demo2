import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.css'
})
export class ProductSaleComponent implements OnDestroy,OnInit {
  listCard: any = [{},{},{}]
  private destroyed$ = new Subject()

  constructor(private productService: SearchService) {
  }

  handleSearch(value: string) {
    
    console.log(value, " HELs")
  }

  ngOnInit(): void {
    this.productService.getSearchInput().pipe(takeUntil(this.destroyed$), debounceTime(1000)).subscribe({
      next: value => {
        this.handleSearch(value)
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
    this.destroyed$.complete()

    console.log("destroyed")
  }
}
