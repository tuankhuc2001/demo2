import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-import-warehose',
  templateUrl: './import-warehose.component.html',
  styleUrl: './import-warehose.component.css'
})
export class ImportWarehoseComponent {
  constructor(private router: Router) {}

  handlenavigate() : void {
    this.router.navigate(['/addProduct']);
  }

}
