import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accountManagers',
  templateUrl: './accountManagers.component.html',
  styleUrls: ['./accountManagers.component.css']
})
export class AccountManagersComponent implements OnInit {

  constructor() { }

  isVisibleModalAccount: boolean = false;
  

  handOpenModalAddAccount(){
    this.isVisibleModalAccount = true;

  }

  handleCloseModelAddAccount(){
    this.isVisibleModalAccount = false;
  }

  ngOnInit() {
  }

}
