import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICustomerRequest } from '../../../types/customer';
import { CustomerService } from '../../../services/customer.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-modal-add-customer',
  templateUrl: './modal-add-customer.component.html',
  styleUrl: './modal-add-customer.component.css'
})
export class ModalAddCustomerComponent {

  constructor ( private customerService : CustomerService, 
    private  notification: NzNotificationService) {}

  @Input() isVisible: boolean = false;
  @Output() closeModal : EventEmitter<void> = new EventEmitter<void> ();

  customerRequest : ICustomerRequest = {
    nameCustomer: "",
    phoneCustomer: "",
    address: "",
    avatar: ""
  }

  handleResetState(){
    this.customerRequest.nameCustomer = "",
    this.customerRequest.phoneCustomer = "",
    this.customerRequest.address = ""
  }
  
  handleCloseAddCustomer(){
    this.closeModal.emit();
    this.handleResetState();
  }

  handleAddCustomer() {
    console.log("asdasdasdas");
    
    this.customerService.addCustomer(this.customerRequest).subscribe({
      next: (v) => {
        if(v.status == false){
          this.notification.create('error', `${v.message}`, '')
        } else{
          this.notification.create('success', `${v.message}`, '')
          this.handleCloseAddCustomer();
        }
      }
    })
  }

}
