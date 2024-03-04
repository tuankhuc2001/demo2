import { Component, Input, Output } from '@angular/core';
import { IProduct } from '../../../types/product';
@Component({
  selector: 'app-card-import-warehouse',
  templateUrl: './card-import-warehouse.component.html',
  styleUrls: ['./card-import-warehouse.component.css'],
})
export class CardImportWarehouseComponent {

  @Input() listCard: any;
  @Input() listProduct: IProduct = {
    id: 0,
    nameProduct: 'abc',
    quantityProduct: 0,
    expiredDate: 'abc',
    provider: 'abc',
    unit: 'abc',
    origin: 'abc',
    avatar: 'abc',
    codeProduct: 'abc',
    description: 'abc',
    providePrice: 0,
    floorPrice: 0,
  };

  isVisibleQuantity: boolean = false;


}
