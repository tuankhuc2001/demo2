import { Component, Input, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { IUserRequestUpdate, ItemUser } from '../../../types/user';

@Component({
  selector: 'app-card-account',
  templateUrl: './card-account.component.html',
  styleUrls: ['./card-account.component.css']
})


export class CardAccountComponent implements OnChanges {

  constructor() { }

  @Input() listUser :any;
  itemAccount: IUserRequestUpdate = {
    id: 1,
    password: "string" ,
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

  handleOpenUpdateAccount(item: IUserRequestUpdate){
      this.isVisibleModalUpdateAccount = true;
      this.itemAccount = item;
      console.log(this.listUser, "danh dânh");
      
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes.itemAccount && changes.itemAccount.currentValue) {}
  }
}
