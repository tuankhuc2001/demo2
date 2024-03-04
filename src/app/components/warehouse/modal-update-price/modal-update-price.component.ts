import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from '../../../types/product';

@Component({
  selector: 'app-modal-update-price',
  templateUrl: './modal-update-price.component.html',
  styleUrl: './modal-update-price.component.css'
})
export class ModalUpdatePriceComponent {
  constructor() { }

  ngOnInit() {
  }


  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  handleCloseModal() {
    this.closeModal.emit();
  }

  @Input() productItem:IProduct = {
    id: 0,
    nameProduct: "",
    quantityProduct: 0,
    expiredDate: "String",
    provider: "string",
    unit: "string",
    origin: "string",
    avatar:"",
    codeProduct: "",
    description: "",
    providePrice: 0,
    floorPrice: 0,
  }
}
