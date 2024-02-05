import { Component } from '@angular/core';
import { DrawerService} from '../../services/drawer.service';
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css'
})
export class WarehouseComponent {
  constructor(private drawerService: DrawerService) {}

  toggleDrawer(): void {
    this.drawerService.toggleDrawer();
  }
}
