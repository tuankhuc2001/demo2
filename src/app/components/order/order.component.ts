import { Component } from '@angular/core';
import { DrawerService } from '../../services/drawer.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  constructor(private drawerService: DrawerService) {}

  toggleDrawer(): void {
    this.drawerService.toggleDrawer();
  }
}
