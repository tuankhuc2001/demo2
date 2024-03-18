import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICartItem } from '../../../types/cart-item';
import { CustomerService } from '../../../services/customer.service';
import { ICustomer } from '../../../types/customer';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrl: './modal-customer.component.css'
})
export class ModalCustomerComponent implements OnInit{
  ngOnInit(): void {
    this.handleGetCustomer();
  }

  constructor( private customerService: CustomerService,
    private  notification: NzNotificationService,
    ) {
    
  }

  @Input() isVisibleModalCustomer: boolean = false  ;
  @Output() closeModal: EventEmitter<void> = new EventEmitter <void> ();

  displayNone: {} = {
    display: 'none',
  }

  displayBlock: {} = {
    display: 'block'
  }

  heightModalData: {} = {
    height: '50vh'
  }

  heightModalNoData: {} = {
    height: '20vh'
  }
  
  listCustomer : ICustomer [] = []

  customerItem: ICustomer = {
    id: 0,
    nameCustomer: "",
    phoneCustomer: "",
    address: "",
    avatar: ""
  }

  isVisibleAddCustomer: boolean = false;

  handleOpenAddCustomer() {
    this.isVisibleAddCustomer = true;
  } 

  handleCloseModalAddCustomer() {
    this.isVisibleAddCustomer = false;
    this.handleGetCustomer();
  }

  textSearch: string = "";

  handleGetCustomer() {
    this.customerService.getCustomer(this.textSearch).subscribe(
      {
        next: (v) =>{
            if(v.status == false) {
              this.notification.create('error', `${v.message}`, '')
            }else{
              this.listCustomer = v.content.list
            }
        }
      }
    )
      
    }
  }


