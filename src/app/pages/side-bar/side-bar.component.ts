import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  constructor() {}

  sideDrawerVisible = false;
  nameUser:string = "Cường"
  role:string = "Admin"
  phone:string = "0987654321"

  sideDrawerOpen(): void {
    this.sideDrawerVisible = true;
  }

  sideDrawerClose(): void {
    this.sideDrawerVisible = false;
  }

  ngOnInit(): void {

  }
}
