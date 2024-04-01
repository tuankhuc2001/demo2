import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../types/product';

@Component({
  selector: 'app-card-warehouse',
  templateUrl: './card-warehouse.component.html',
  styleUrl: './card-warehouse.component.css'
})
export class CardWarehouseComponent {

  @Input() listCard: any;
  @Input() listProduct: IProduct = {
    id: 0,
    nameProduct: "abc",
    quantityProduct: 0,
    expiredDate: "new Date()",
    provider: "abc",
    unit: "abc",
    origin: "abc",
    avatar: "abc",
    codeProduct: "abc",
    description: "abc",
    providePrice: 0,
    floorPrice: 0,
    phoneProvider: "abc",
    imageUrl:""
  }

  @Output() productIdEmit: EventEmitter<IProduct> = new EventEmitter();

  handleProductIdEmit(productId: IProduct) {
    this.productIdEmit.emit(productId)
  }
}
