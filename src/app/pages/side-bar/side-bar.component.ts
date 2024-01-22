import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  activeRoute: string = '';
  constructor(private router: Router) {}

  sideDrawerVisible = false;

  sideDrawerOpen(): void {
    this.sideDrawerVisible = true;
  }

  sideDrawerClose(): void {
    this.sideDrawerVisible = false;
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event) => {
        this.activeRoute = event.urlAfterRedirects.slice(1);
      });
  }
}
