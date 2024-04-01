import { Component, Input, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-account',
  templateUrl: './card-account.component.html',
  styleUrls: ['./card-account.component.css']
})


export class CardAccountComponent implements OnChanges {

  constructor() { }

  @Input() listUser :any;
  isVisibleModalUpdateAccount: boolean = false;


  public formatRole(role: string): string {
    switch (role) {
      case 'ROLE_ADMIN':
        return 'Admin';
      case 'ROLE_SALE':
        return 'Sale';
      case 'ROLE_WAREHOUSE':
        return 'Warehouse';
      default:
        return role;
    }
  }

  handleCloseModelUpdateAccount(){
    this.isVisibleModalUpdateAccount = false;
  }

  handleOpenUpdateAccount(){
    this.isVisibleModalUpdateAccount = true;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.listUser && changes.listUser.currentValue) {
      this.listUser.forEach((user: any) => {
        user.role = this.formatRole(user.role);
      });
    }

  }
  ngOnInit() {
  }

}
