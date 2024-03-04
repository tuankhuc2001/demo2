import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { Router } from '@angular/router';
>>>>>>> 17dad58e557ed872fdbde6a7a144499c8ec2fd78
@Component({
  selector: 'app-import-warehose',
  templateUrl: './import-warehose.component.html',
  styleUrl: './import-warehose.component.css'
})
export class ImportWarehoseComponent {
<<<<<<< HEAD
  constructor() {}

  toggleDrawer(): void {
=======
  constructor(private router: Router) {}

  handlenavigate() : void {
    this.router.navigate(['/addProduct']);
>>>>>>> 17dad58e557ed872fdbde6a7a144499c8ec2fd78
  }

}
