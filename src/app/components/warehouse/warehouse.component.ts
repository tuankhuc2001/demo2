import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent implements OnInit, OnDestroy{

  constructor(private searchService: SearchService){}

  private $destroy = new Subject()

  ngOnInit(): void {
      this.searchService.getSearchInput().pipe(takeUntil(this.$destroy)).subscribe({next: value => {
        this.handleSearch(value)
      }})
  }

  ngOnDestroy(): void {
    this.$destroy.next(true)
    this.$destroy.complete()
    console.log("Destoryed")
  }

  handleSearch(textSearch: string){
    console.log(textSearch)
  }

}
