import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../types/product';
@Component({
  selector: 'app-modal-update-quantity',
  templateUrl: './modal-update-quantity.component.html',
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
    imageUrl: "",
    codeProduct: 'XM2304',
    description: 'Avoid drinking more than 1 gauge',
    providePrice: 500000,
    floorPrice: 550000,
    phoneProvider: ''
  };

  handleCloseModal() {
    this.closeModal.emit();
  }
}
