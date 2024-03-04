import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent implements OnInit, OnDestroy{

  constructor(private searchService: SearchService){}

  listCard: any = [{
    id: 1,
    nameProduct: "abc",
    quantityProduct: 0,
    expiredDate: "abc",
    provider: "abc",
    unit: "abc",
    origin: "abc",
    avatar: "abc",
    codeProduct: "abc",
    description: "abc",
    providePrice: 0,
    floorPrice: 0,
  },{
    id: 2,
    nameProduct: "abc",
    quantityProduct: 0,
    expiredDate: "abc",
    provider: "abc",
    unit: "abc",
    origin: "abc",
    avatar: "abc",
    codeProduct: "abc",
    description: "abc",
    providePrice: 0,
    floorPrice: 0,
  },{
    id: 3,
    nameProduct: "abc",
    quantityProduct: 0,
    expiredDate: "abc",
    provider: "abc",
    unit: "abc",
    origin: "abc",
    avatar: "abc",
    codeProduct: "abc",
    description: "abc",
    providePrice: 0,
    floorPrice: 0,
  }]
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

  handleOpenModal(id: number){
    console.log(id,"id");
  }
}
