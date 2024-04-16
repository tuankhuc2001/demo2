import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NonNullableFormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { IProduct } from '../../../types/product';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CartItemService } from '../../../services/cart-item.service';
import { UserService } from '../../../services/user.service';
import { ICartItemRequest } from '../../../types/cart-item';
import { notificationEnum } from '../../../utils/notificationEnum';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { routerNames } from '../../../constant/router';

@Component({
  selector: 'app-modal-add-cart-item',
  templateUrl: './modal-add-cart-item.component.html',
  styleUrl: './modal-add-cart-item.component.css',
  animations: [
    trigger('slideInOut', [
      state('void', style({
        height: '0',
        opacity: '0'
      })),
      state('*', style({
        height: '*',
        opacity: '1'
      })),
      transition(':enter', [
        animate('0.2s ease-out')
      ]),
      transition(':leave', [
        animate('0.2s ease-in')
      ])
    ])
  ]
})

export class ModalAddCartItemComponent implements OnChanges {

  constructor(private fb: NonNullableFormBuilder
    , private notification: NzNotificationService
    , private cartItemService: CartItemService
    , private userService: UserService
    , private changeDetection: ChangeDetectorRef
    , private router: Router
  ) { }

  isLoading: boolean = false
  userId: number = 1;
  enableDescription: boolean = false
  plus: boolean = true

  @Input() isVisible: boolean = false
  @Input() ProductDetail: IProduct = {
    id: 1,
    nameProduct: 'mockProduct',
    quantityProduct: 200,
    expiredDate: new Date,
    provider: 'Factory ABC',
    unit: 'Box(es)',
    origin: 'Ha Noi',
    codeProduct: 'XM2304',
    description: 'Avoid drinking more than 1 gauge',
    providePrice: 500000,
    floorPrice: 550000,
    phoneProvider: "012345678",
    imageUrl: ""
  }

  @Output() closeModal: EventEmitter<void> = new EventEmitter()
  @Output() callBackGetProductSale: EventEmitter<void> = new EventEmitter()

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['ProductDetail'] && !changes['ProductDetail'].firstChange) {
      this.validateAddCartForm.setValue({ quantity: 1, editPrice: this.ProductDetail.floorPrice, rate: 0 })
      this.enableDescription = false
      this.plus = true
    }
  }

  editPriceValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (control.value > this.ProductDetail.floorPrice * 1.1 || control.value < this.ProductDetail.floorPrice * 0.9) {
      return { confirm: true, error: true }
    }
    return {}
  }

  quantityValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (control.value === null) {
      return { required: true }
    } else if (control.value <= 0) {
      return { confirm: true, error: true }
    } else if (control.value > this.ProductDetail.quantityProduct) {
      return { invalid: true, error: true }
    }
    return {};
  }

  rateValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } | null => {
    const editPrice = this.validateAddCartForm ? this.validateAddCartForm.value.editPrice : null;
    if (control.value === null) {
      return { required: true };
    } else if (editPrice && (control.value > editPrice / 10)) {
      return { confirm: true, error: true };
    }
    return null;
  }

  validateAddCartForm: FormGroup<{
    quantity: FormControl<number>;
    editPrice: FormControl<number>;
    rate: FormControl<number>;
  }> = this.fb.group({
    quantity: [1, [Validators.required, this.quantityValidator]],
    editPrice: [this.ProductDetail.floorPrice, [Validators.required, this.editPriceValidator]],
    rate: [0, [Validators.required, this.rateValidator]],
  });

  handleSubmit() {
    if (this.validateAddCartForm.valid) {
      this.isLoading = true
      const user = this.userService.getUser();
      this.userId = user.id;

      const requestdObject: ICartItemRequest = {
        quantity: this.validateAddCartForm.value.quantity ? this.validateAddCartForm.value.quantity : 0,
        rate: this.validateAddCartForm.value.rate ? this.validateAddCartForm.value.rate : 0,
        plus: this.plus,
        editPrice: this.validateAddCartForm.value.editPrice ? this.validateAddCartForm.value.editPrice : this.ProductDetail.floorPrice,
        floorPrice: this.ProductDetail.floorPrice
      }
      this.cartItemService.addCartItem(this.ProductDetail.id, requestdObject, this.userId).subscribe({
        next: (res) => {
          this.callBackGetProductSale.emit()
          this.handleCloseModal()
          this.isLoading = false
          this.createNotification(res.status === true ? notificationEnum.success : notificationEnum.error, res.message)
        },
        error: (error) => {
          if (error.status == 403) {
            this.userService.loginRefreshToken(user.refreshToken).subscribe({
              next: value => {
                this.userService.setUser(value)
                localStorage.setItem("token", value.refreshToken)
              },
              error: () => {
                this.router.navigate([routerNames.signInPage]);
                this.createNotification(notificationEnum.error, "Phiên đăng nhập hết hạn")
              }
            })
          } else {
            error.error.messageError.map((e: string) => {
              this.createNotification(notificationEnum.error, e)
            })
          }
          this.isLoading = false
        }
      })
    } else {
      Object.values(this.validateAddCartForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createNotification(type: notificationEnum, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      ''
    );
  }

  handleEnableDescription() {
    this.enableDescription = !this.enableDescription
  }

  handlePlusRate() {
    this.plus = !this.plus
    this.changeDetection.detectChanges()
  }

  handleCloseModal() {
    this.validateAddCartForm.setValue({ quantity: 1, editPrice: this.ProductDetail.floorPrice, rate: 0 })
    this.enableDescription = false
    this.plus = true
    this.closeModal.emit()
  }

  token = localStorage.getItem('token')
}