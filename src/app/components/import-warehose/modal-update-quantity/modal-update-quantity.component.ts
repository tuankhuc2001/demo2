import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-update-quantity',
  templateUrl: './modal-update-quantity.component.html',
  styleUrl: './modal-update-quantity.component.css'
})
export class ModalUpdateQuantityComponent {
  @Input() isVisible: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter()
  handleCloseModal() {
    
    this.closeModal.emit()
  }
}
