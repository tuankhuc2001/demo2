import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { IProduct } from '../../types/product';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent implements OnInit, OnDestroy{

  constructor(private searchService: SearchService){}

  private $destroy = new Subject()

  ngOnInit(): void {
      this.searchService.getSearchInput().pipe(takeUntil(this.$destroy), debounceTime(1000)).subscribe({next: value => {
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

  listCard:any = [{}, {}, {}]


  isVisibleModalUpdatePrice: boolean= false;
  handleOpenModalUpdatePrice(){
    this.isVisibleModalUpdatePrice = true;
  }

  handleCloseModalUpdatePrice() {
    this.isVisibleModalUpdatePrice = false;
  }
}
