import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-modal-delete-all',
  templateUrl: './modal-delete-all.component.html',
  styleUrl: './modal-delete-all.component.css'
})
export class ModalDeleteAllComponent {
  constructor (private cartService: CartService) {}
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  handleCloseModal() {
    this.closeModal.emit();
  }
}
