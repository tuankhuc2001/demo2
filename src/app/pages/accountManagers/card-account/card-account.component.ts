import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-account',
  templateUrl: './card-account.component.html',
  styleUrls: ['./card-account.component.css']
})
export class CardAccountComponent implements OnInit {

  constructor() { }

  isVisibleModalUpdateAccount: boolean = false;
  idUser: number = 0;

  handleCloseModelUpdateAccount(){
    this.isVisibleModalUpdateAccount = false;
  }

  handleOpenUpdateAccount(idUser: number){
    console.log("hihi");
    
    this.isVisibleModalUpdateAccount = true;
  }
  

  ngOnInit() {
  }

}
