import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { routerNames } from '../../constant/router';
import { SearchService } from '../../services/search.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  constructor(private router: Router, private searchService: SearchService, private userService: UserService) { }

  routerNames = routerNames
  user = this.userService.getUser()

  sideDrawerVisible = false;
  currentSubMenu: string | null = null;
  nameUser: string = "ADMIN"
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
    localStorage.clear()
    this.router.navigate(['/signIn']);
  }

  ngOnInit(): void {

  }
}
