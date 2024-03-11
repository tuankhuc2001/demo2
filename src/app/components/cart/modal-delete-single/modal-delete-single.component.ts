import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-modal-delete-single',
  templateUrl: './modal-delete-single.component.html',
  styleUrl: './modal-delete-single.component.css'
})
export class ModalDeleteSingleComponent {
  constructor (private cartService: CartService) {}
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  handleCloseModal() {
    this.closeModal.emit();
  }
}
