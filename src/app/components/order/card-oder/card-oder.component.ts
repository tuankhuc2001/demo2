import { Component, Input } from '@angular/core';
import { IOder } from '../../../types/order';
@Component({
  selector: 'app-card-oder',
  templateUrl: './card-oder.component.html',
  styleUrl: './card-oder.component.css',
})
export class CardOderComponent {
  @Input() listCard: any;
  @Input() listOder: IOder = {
    id: 0,
    idUser: 0,
    Customer: {
      id: 0,
      nameCustomer: "Nguyễn Công Phượng",
      phoneCustomer: "abc",
      adderss: "Diễn Châu - Nghệ An",
    },
    totalPrice: 31150000,
    status: "Thành công",
    createdAt: new Date(),
    totalCartItem: 3,
    color: "abc",
    codeOder: "11.676485.001",
  };
}
