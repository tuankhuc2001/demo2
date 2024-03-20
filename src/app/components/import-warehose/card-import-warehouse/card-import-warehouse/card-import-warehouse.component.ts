import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../types/product';

@Component({
  selector: 'app-card-import-warehouse',
  templateUrl: './card-import-warehouse.component.html',
  styleUrl: './card-import-warehouse.component.css'
})
export class CardImportWarehouseComponent {
  @Input() listCard: any;
  @Input() listProduct: IProduct = {
    id: 0,
    nameProduct: "chim",
    quantityProduct: 0,
    expiredDate: new Date(),
    provider: "abc",
    unit: "abc",
    origin: "abc",
    avatar: "abc",
    codeProduct: "abc",
    description: "abc",
    providePrice: 0,
    floorPrice: 0,
  }
}
