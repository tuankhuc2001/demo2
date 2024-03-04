import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../types/product';
@Component({
  selector: 'app-modal-update-quantity',
  templateUrl: './modal-update-quantity.component.html',
  styleUrl: './modal-update-quantity.component.css',
})
export class ModalUpdateQuantityComponent {
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  title: string = 'hello';
  @Input() ProductDetail: IProduct = {
    id: 1,
    nameProduct: 'mockProduct',
    quantityProduct: 200,
    expiredDate: 'abc',
    provider: 'Factory ABC',
    unit: 'Box(es)',
    origin: 'Ha Noi',
    avatar: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
    codeProduct: 'XM2304',
    description: 'Avoid drinking more than 1 gauge',
    providePrice: 500000,
    floorPrice: 550000,
  };

  handleCloseModal() {
    this.closeModal.emit();
  }
}
