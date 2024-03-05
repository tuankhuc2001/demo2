import { Component,Input } from '@angular/core';
import { IProduct } from '../../../types/product';
@Component({
  selector: 'app-card-product-sale',
  templateUrl: './card-product-sale.component.html',
  styleUrl: './card-product-sale.component.css'
})
export class CardProductSaleComponent {
  @Input() listCard: any;
  @Input() listProduct: IProduct = {
    id: 0,
    nameProduct: "abc",
    quantityProduct: 0,
    expiredDate: new Date,
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
