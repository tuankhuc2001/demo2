import { Component } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { SearchService } from '../../service/search.service';
import { Router } from '@angular/router';
import { routerNames } from '../../constant/router';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-import-warehose',
  templateUrl: './import-warehose.component.html',
  styleUrl: './import-warehose.component.css'
})
export class ImportWarehoseComponent {
  constructor(private searchService: SearchService, private router: Router) { }

  listCard: any = [{}, {}, {}]
  private $destroy = new Subject()

  ngOnInit(): void {
    this.searchService.getSearchInput().pipe(takeUntil(this.$destroy), debounceTime(1000)).subscribe({
      next: value => {
        this.handleSearch(value)
      }
    })
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
    console.log("Destroyed")
  }

  handleSearch(textSearch: string) {
    console.log(textSearch)
  }

  handleAddProduct() {
    this.router.navigate([routerNames.homePage + "/" + routerNames.addProductPage])
  }

}
