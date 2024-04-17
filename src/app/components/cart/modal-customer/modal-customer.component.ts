import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { CartService } from '../../../services/cart.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ICustomer } from '../../../types/customer';
import { ICart, IUpdateCart } from '../../../types/cart';
import { routerNames } from '../../../constant/router';
import { Router } from '@angular/router';
import { IUser } from '../../../types/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrl: './modal-customer.component.css'
})
export class ModalCustomerComponent implements OnInit{

  @Input() isVisibleModalAddCustomer: boolean = false;
  @Input() isVisibleCustomer: boolean = false;
  @Input() idCart: number = 0;
  @Input() listCustomerProp: ICustomer[] = []
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() getCart: EventEmitter<void> = new EventEmitter();
  listCustomer: ICustomer[] = [];

  customer: IUpdateCart = {
    idCustomer: 0,
  }

  constructor(
    private customerService: CustomerService,
    private cartService: CartService,
    private notification: NzNotificationService,
    private router: Router,
    private userService: UserService,
  ) { }

  private destroyed$ = new Subject();
  textSearch: string = "";
  isVisibleAddCustomer: boolean = false;

  user: IUser = {
    id: 0,
    phone: "",
    email: "",
    fullname: "",
    avatar: "",
    role: "",
    token: "",
    refreshToken: ""
  }

  ngOnInit():void {
    this.listCustomer = this.listCustomerProp
  }

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      ''
    );
  }

  handleSearch(value: string) {
    setTimeout(() => {
      this.customerService.getCustomer(value).subscribe({
        next: (res) => {
          this.listCustomer = res.content.list
        },
        error: (v) => {
          if (v.status === 403) {
            this.userService.loginRefreshToken(this.user.refreshToken).subscribe({
              next: value => {
                this.userService.setUser(value)
                localStorage.setItem("token", value.refreshToken)
              },
              error: error => {
                this.router.navigate([routerNames.signInPage]);
                this.createNotification('error', "Phiên đăng nhập hết hạn")
              }
            })
          }
        }
      })
    }, 1000)
    
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
        error: (v) => {
          if (v.status === 403) {
            this.userService.loginRefreshToken(this.user.refreshToken).subscribe({
              next: value => {
                this.userService.setUser(value)
                localStorage.setItem("token", value.refreshToken)
              },
              error: error => {
                this.router.navigate([routerNames.signInPage]);
                this.createNotification('error', "Phiên đăng nhập hết hạn")
              }
            })
          }
        }
      });
  }

  handleUpdateCartCustomer(idCustomer: number) {
    this.customer.idCustomer = idCustomer;
    this.cartService.updateCartCustomer(this.idCart, this.customer).subscribe({
      next: (v: any) => {
        if (v.status == false) {
          this.notification.create('error', `${v.message}`, '') 
        } else {
          this.notification.create('success', `${v.message}`, '')
          this.handleCloseModalCustomer()
          this.getCart.emit()
        }
      },
      error: (v) => {
        if (v.status === 403) {
          this.userService.loginRefreshToken(this.user.refreshToken).subscribe({
            next: value => {
              this.userService.setUser(value)
              localStorage.setItem("token", value.refreshToken)
            },
            error: error => {
              this.router.navigate([routerNames.signInPage]);
              this.createNotification('error', "Phiên đăng nhập hết hạn")
            }
          })
        }
      }
    });
  }

  displayFlex: {} = {
    display: 'flex',
  }

  displayNone: {} = {
    display: 'none',
  }

  displayBlock: {} = {
    display: 'block',
  }

  heightModalData: {} = {
    height: '50vh'
  }

  heightModalNoData: {} = {
    height: '230px'
  }

  customerItem: ICustomer = {
    id: 0,
    nameCustomer: "",
    phoneCustomer: "",
    address: "",
  }

  handleOpenAddCustomer() {
    this.isVisibleAddCustomer = true;
  }

  handleCloseModalAddCustomer() {
    this.isVisibleAddCustomer = false;
    this.handleGetCustomer();
  }

  handleGetCustomer() {
    this.customerService.getCustomer(this.textSearch).subscribe(
      {
        next: (v) => {
          if (v.status == false) {
            this.notification.create('error', `${v.message}`, '')
          } else {
            this.listCustomer = v.content.list
          }
        },
      }
    )
  }

  handleCloseModalCustomer() {
    this.textSearch = "";
    this.closeModal.emit();
    this.handleGetCustomer()
  }

  handleResetSearch() {
    this.textSearch ="";
  }
}


