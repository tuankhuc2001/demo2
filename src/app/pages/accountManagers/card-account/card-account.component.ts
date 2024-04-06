import { Component, Input, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { ItemUser } from '../../../types/user';

@Component({
  selector: 'app-card-account',
  templateUrl: './card-account.component.html',
  styleUrls: ['./card-account.component.css']
})


export class CardAccountComponent implements OnChanges {

  constructor() { }

  @Input() listUser :any;
  itemAccount: ItemUser = {
    id: 1,
    phone: "string",
    password: "string" ,
    address: "string",
    fullname: "string",
    role: "string",
  }
  isVisibleModalUpdateAccount: boolean = false;


  formatRole(role: string): string {
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

  handleOpenUpdateAccount(item: ItemUser){
      this.isVisibleModalUpdateAccount = true;
      this.itemAccount = item;
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
