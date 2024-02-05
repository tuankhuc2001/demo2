import { Component } from '@angular/core';
import { DrawerService} from '../../services/drawer.service';
@Component({
  selector: 'app-import-warehose',
  templateUrl: './import-warehose.component.html',
  styleUrl: './import-warehose.component.css'
})
export class ImportWarehoseComponent {
  constructor(private drawerService: DrawerService) {}

  toggleDrawer(): void {
    this.drawerService.toggleDrawer();
  }
}
