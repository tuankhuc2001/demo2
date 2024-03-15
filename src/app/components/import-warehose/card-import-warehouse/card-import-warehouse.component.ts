import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProduct } from '../../../types/product';

@Component({
  selector: 'app-card-import-warehouse',
  templateUrl: './card-import-warehouse.component.html',
  styleUrls: ['./card-import-warehouse.component.css']
})
export class CardImportWarehouseComponent implements OnInit {
  @Input() listCard: IProduct[] = [];
  @Output() onClickCard: EventEmitter<IProduct> = new EventEmitter()
  handleOnClickDetail(item: IProduct){ 
    this.onClickCard.emit(item)
  }
  constructor() { }
  ngOnInit() {
  }

}
