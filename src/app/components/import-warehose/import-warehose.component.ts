import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-import-warehose',
  templateUrl: './import-warehose.component.html',
  styleUrl: './import-warehose.component.css',
})
export class ImportWarehoseComponent {
  constructor(private router: Router, private productService: SearchService) {}

  listCard: any = [{}, {}, {}];
  private destroyed$ = new Subject();

  handleSearch(value: string) {
    console.log(value, ' HELs');
  }

  ngOnInit(): void {
    this.productService
      .getSearchInput()
      .pipe(takeUntil(this.destroyed$), debounceTime(1000))
      .subscribe({
        next: (value) => {
          this.handleSearch(value);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();

    console.log('destroyed');
  }

  handlenavigate(): void {
    this.router.navigate(['/addProduct']);
  }
}
