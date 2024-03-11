import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-update-quantity',
  templateUrl: './modal-update-quantity.component.html',
  styleUrl: './modal-update-quantity.component.css',
})
export class ModalUpdateQuantityComponent {
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  formProduct: any = {
    id: 1,
    nameProduct: 'mockProduct',
    quantityProduct: 200,
    expiredDate: new Date(),
    provider: 'Factory ABC',
    unit: 'Box(es)',
    origin: 'Ha Noi',
    avatar: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
    codeProduct: 'XM2304',
    description: 'Avoid drinking more than 1 gauge',
    providePrice: 5000000000,
    floorPrice: 550000, 
  };
  newValueQuantity:string = ""
  handleCloseModal() {
    this.closeModal.emit();
  }
}
