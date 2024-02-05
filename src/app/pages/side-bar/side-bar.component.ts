import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { DrawerService } from '../../services/drawer.service';

import { routerNames } from '../../constant/router';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  // constructor(private router: Router) {}

  routerNames = routerNames

  textSearch: string = ""

  sideDrawerVisible: boolean = false;

  private drawerSub: Subscription;

  constructor(private drawerService: DrawerService,private router: Router) {
    this.drawerSub = this.drawerService.getDrawerState().subscribe(visible => {
      this.sideDrawerVisible = visible;
    });
  }

  sideDrawerClose(): void {
    this.drawerService.setDrawerState(false);
  }

  ngOnDestroy(): void {
    if (this.drawerSub) {
      this.drawerSub.unsubscribe();
    }
  }

  nameUser:string = "Cường"
  role:string = "Admin"
  phone:string = "0987654321"
  
  // sideDrawerVisible = false;
  // sideDrawerOpen(): void {
  //   this.sideDrawerVisible = true;
  // }

  // sideDrawerClose(): void {
  //   this.sideDrawerVisible = false;
  // }
  handleLogOut():void {
    this.router.navigate(['/signIn']);
  }
  handleChaneSearch(event:any):void {
    const newValue = event.target.value;
    console.log("data:", newValue);
    
  }

  ngOnInit(): void {

  }
}
