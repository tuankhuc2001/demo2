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

  @Input() listCard: any;
  @Input() listProduct: IProduct = {
    id: 0,
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
  }

  @Output() openModalUpdatePrice : EventEmitter<void> = new EventEmitter;
  handleOpenModalUpdatePrice(){
    this.openModalUpdatePrice.emit();
  }

}
