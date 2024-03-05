import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../types/product';

@Component({
  selector: 'app-card-import-warehouse',
  templateUrl: './card-import-warehouse.component.html',
  styleUrls: ['./card-import-warehouse.component.css']
})
export class CardImportWarehouseComponent implements OnInit {
  @Input() listCard: any;

  constructor() { }

  ngOnInit() {
  }

}
