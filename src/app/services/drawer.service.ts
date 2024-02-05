import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  constructor() {}
  private drawerVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  toggleDrawer(): void {
    this.drawerVisible.next(!this.drawerVisible.value);
  }

  getDrawerState() {
    return this.drawerVisible.asObservable();
  }

  setDrawerState(visible: boolean): void {
    this.drawerVisible.next(visible);
  }
}
