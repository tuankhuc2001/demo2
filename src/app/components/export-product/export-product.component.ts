import { Component } from '@angular/core';

@Component({
  selector: 'app-export-product',
  templateUrl: './export-product.component.html',
  styleUrl: './export-product.component.css'
})
export class ExportProductComponent {

  isVisible: boolean = false

  handleOpenModal() {
    this.isVisible = true
  }

  handleCloseModal() {
    this.isVisible = false
  }

}
