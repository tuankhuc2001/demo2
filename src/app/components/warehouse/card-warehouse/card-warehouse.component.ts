import { Component, EventEmitter, OnInit } from '@angular/core';
import { Input, Output } from '@angular/core';
import { IProduct } from '../../../types/product';

@Component({
  selector: 'app-card-warehouse',
  templateUrl: './card-warehouse.component.html',
  styleUrls: ['./card-warehouse.component.css']
})
export class CardWarehouseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() listProduct : IProduct [] = []


  @Output() openModalUpdatePrice : EventEmitter<IProduct> = new EventEmitter;
  handleOpenModalUpdatePrice(productItem: IProduct){
    this.openModalUpdatePrice.emit(productItem);
  }

}
