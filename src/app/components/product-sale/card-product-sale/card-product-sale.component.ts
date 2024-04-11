import { Component,EventEmitter,Input, Output } from '@angular/core';
import { IProduct } from '../../../types/product';

@Component({
  selector: 'app-card-product-sale',
  templateUrl: './card-product-sale.component.html',
  styleUrl: './card-product-sale.component.css'
})
export class CardProductSaleComponent {
  @Input() listCard: IProduct [] = [];

  @Output() onClickCard: EventEmitter<IProduct> = new EventEmitter()

  token = localStorage.getItem('token');

  handleOnClickDetail(item: IProduct){
    this.onClickCard.emit(item)
  }
}
