import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IOrder } from '../../../types/order';

@Component({
  selector: 'app-card-oder',
  templateUrl: './card-oder.component.html',
  styleUrl: './card-oder.component.css',
})
export class CardOderComponent {
  @Input() listCard: IOrder[] = [];

  @Output() onClickCard: EventEmitter<number> = new EventEmitter()

  handleClickCard(item: number){
    this.onClickCard.emit(item)
  }

  ngOnInit(): void {
  } 
}
