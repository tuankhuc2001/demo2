import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOrder } from '../../../types/order';
@Component({
  selector: 'app-card-oder',
  templateUrl: './card-oder.component.html',
  styleUrl: './card-oder.component.css',
})
export class CardOderComponent {
  @Input() listCard: any;
  @Output() onClickCard: EventEmitter<IOrder> = new EventEmitter()

  handleClickCard(item: IOrder){
    this.onClickCard.emit(item)
    console.log();
  }

  ngOnInit(): void {
  } 
}
