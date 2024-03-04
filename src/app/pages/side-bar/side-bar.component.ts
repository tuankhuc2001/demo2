import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { routerNames } from '../../constant/router';
import { SearchService } from '../../service/search.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  constructor(private router: Router, private searchService: SearchService) { }

  routerNames = routerNames

  sideDrawerVisible = false;
  currentSubMenu: string | null = null;
  nameUser: string = "Cường"
  role: string = "Admin"
  phone: string = "0987654321"
  textSearch: string = ""

  handleSearch(e: any) {
    this.textSearch = e
    this.searchService.setSearchInput(this.textSearch)
  }

  handleSideDrawerClose(): void {
    this.sideDrawerVisible = false;
    this.currentSubMenu = null;
    this.textSearch = "";
    this.handleSearch("")
  }

  handleLogOut(): void {
    this.router.navigate(['/signIn']);
  }

  ngOnInit(): void {

  }
}
