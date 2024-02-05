import { Component } from '@angular/core';
import { DrawerService} from '../../services/drawer.service';
@Component({
  selector: 'app-product-sale',
  templateUrl: './product-sale.component.html',
  styleUrl: './product-sale.component.css'
})
export class ProductSaleComponent {
  constructor(private drawerService: DrawerService) {}

  toggleDrawer(): void {
    this.drawerService.toggleDrawer();
  }
}
