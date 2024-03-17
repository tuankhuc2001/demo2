import { Component } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { CartService } from '../../../services/cart.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ICustomer } from '../../../types/customer';

@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrl: './modal-customer.component.css'
})
export class ModalCustomerComponent {
  listCustomer: ICustomer[] = [];
  constructor(
    private customerService: CustomerService,
    private cartService: CartService,
    private notification: NzNotificationService,
  ) { }

  private destroyed$ = new Subject();
  textSearch: string = "";
  isVisibleAddCustomer: boolean = false;

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      ''
    );
  }

  handleSearch(value: string) {
    this.customerService.getCustomer(value).subscribe({
      next: (res) => {
        this.listCustomer = res.content.list
        console.log(res)
      },
      error: (error) => {
        this.createNotification('error', error)
      }
    })
  }

  ngOnInit(): void {
    this.customerService.getSearchInput().pipe(takeUntil(this.destroyed$), debounceTime(1000)).subscribe({
      next: value => {
        this.handleSearch(value)
      }
    })
  }

  getCustomer(): void {
    this.customerService
      .getSearchInput()
      .pipe(takeUntil(this.destroyed$), debounceTime(1000))
      .subscribe({
        next: (value) => {
          this.textSearch = value
          this.handleSearch(value);
        },
      });
  }

  handleOpenAddCustomer() {
    this.isVisibleAddCustomer = true
  }


  handleUpdateCartCustomer(){
    
  }

}
