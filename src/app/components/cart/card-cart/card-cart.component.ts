import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { notificationEnum } from '../../../utils/notificationEnum';

import { ICartItem } from '../../../types/cart-item';
import { CartItemService } from '../../../services/cart-item.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { Subject, timer } from 'rxjs';

@Component({
  selector: 'app-card-cart',
  templateUrl: './card-cart.component.html',
  styleUrl: './card-cart.component.css',
})
export class CardCartComponent implements OnChanges {
  constructor(
    private cartItemService: CartItemService,
    private notification: NzNotificationService,
  ) { }

  @Input() listCard: any;
  @Output() onClickDeleteSingle: EventEmitter<ICartItem> = new EventEmitter();
  @Output() totalPriceChanged: EventEmitter<number> = new EventEmitter();
  @Output() getCart: EventEmitter<void> = new EventEmitter();

  totalPrice: number = 0;
  quantity: number = 0;
  token = localStorage.getItem("token")

  cartItemRequest: ICartItem = {
    id: 1,
    productResponse: {
      id: 0,
      nameProduct: "abc",
      quantityProduct: 0,
      expiredDate: new Date,
      provider: "abc",
      unit: "abc",
      origin: "abc",
      codeProduct: "abc",
      description: "abc",
      providePrice: 0,
      floorPrice: 0,
      phoneProvider: "012345",
      imageUrl: ""
    },
    idCart: 1,
    quantity: 1,
    rate: 4,
    plus: false,
    editPrice: 1,
    disable: true,
  }

  onInputQuantity( item: any, event: any) {
    const inputQuantity = event.target.value;
    const availableQuantity = item.productResponse.quantityProduct - this.getTotalQuantityOfOtherItems(item);

    item.showErrorQuantityNoEnter = false;
    item.showErrorQuantityExceed = false;

    if (!inputQuantity || inputQuantity <= 0) {
      item.showErrorQuantityNoEnter = true;
    } else if (inputQuantity > availableQuantity) {
      item.showErrorQuantityExceed = true;
    }
  }

  onInputRate(item: any, event: any) {
    const value = event.target.value;
    item.showRateError = false;
    item.showRateExceed = false;
    if (!value || value < 0) {
      item.showRateError = true;
    } else if (value > (item.editPrice*0.1)) {
      item.showRateExceed = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.listCard) {
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    if (!this.listCard || this.listCard.length === 0) {
      return;
    }
    this.totalPrice = 0;
    this.listCard.forEach((card: any) => {
      card.cartItemResponseSet.forEach((item: any) => {
        const itemTotal = item.plus ? (item.editPrice + item.rate) * item.quantity : (item.editPrice - item.rate) * item.quantity;
        this.totalPrice += itemTotal;
      });
    });
    this.totalPriceChanged.emit(this.totalPrice);
  }

  handleOpenDeleteSingle(item: ICartItem) {
    this.onClickDeleteSingle.emit(item)
  }


  private plusQuantitySubject = new Subject<any>();
  private minusQuantitySubject = new Subject<any>();
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.plusQuantitySubject.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe((item: any) => {
      this.cartItemRequest.quantity = item.quantity;
      this.cartItemService.updateQuantity(item.id, this.cartItemRequest).subscribe({
        next: (res) => {
          this.calculateTotalPrice();
        },
        error: (error) => {
          error.error.messageError.map((e: string) => {
            this.createNotification(notificationEnum.error, e);
          });
          this.getCart.emit();
        }
      });
    });

    this.minusQuantitySubject.pipe(
      debounceTime(500),
      takeUntil(this.destroy$)
    ).subscribe((item: any) => {
      this.cartItemRequest.quantity = item.quantity;
      this.cartItemService.updateQuantity(item.id, this.cartItemRequest).subscribe({
        next: (res) => {
          this.calculateTotalPrice();
        },
        error: (error) => {
          error.error.messageError.map((e: string) => {
            this.createNotification(notificationEnum.error, e);
          });
          this.getCart.emit();
        }
      });
    });
  }

  handlePlusQuantity(item: any) {
    if (!item) {
      return;
    }
    const maxQuantity = item.productResponse.quantityProduct - this.getTotalQuantityOfOtherItems(item);
    if (item.quantity >= maxQuantity) {
      item.quantity = item.quantity + 1;
      item.showErrorQuantityExceed = true;
      setTimeout(() => {
        item.showErrorQuantityExceed = false;
        item.quantity = maxQuantity
        this.plusQuantitySubject.next(item);
      }, 5000);
    }
    else{ item.quantity = item.quantity + 1;
      this.plusQuantitySubject.next(item);
      this.calculateTotalPrice();}
  }

  getTotalQuantityOfOtherItems(item: any): number {
    let totalQuantity = 0;
    this.listCard.forEach((card: any) => {
      card.cartItemResponseSet.forEach((cartItem: any) => {
        if (cartItem.productResponse.id === item.productResponse.id && cartItem !== item) {
          totalQuantity += cartItem.quantity;
        }
      });
    });
    return totalQuantity;
  }

  getMaxQuantityForItem(productId: number): number {
    let maxQuantity = 0;
    this.listCard.forEach((card: any) => {
      card.cartItemResponseSet.forEach((item: any) => {
        if (item.productResponse.id === productId) {
          maxQuantity += item.quantity;
        }
      });
    });
    return maxQuantity;
  }

  handleMinusQuantity(item: any) {
    if (!item) {
      return;
    }
    if (item.quantity <= 1) {
      return;
    }
    item.quantity = (item.quantity ?? 0) - 1;
    this.minusQuantitySubject.next(item);
  }

  handlePlus(item: any) {
    if (!item || item.rate == 0) {
      return;
    }
    this.cartItemRequest.plus = !item.plus
    this.cartItemService.updateIsPlus(item.id, this.cartItemRequest).subscribe({
      next: () => {
        item.plus = !item.plus;
        this.calculateTotalPrice();
      },
      error: (error) => {
        error.error.messageError.map((e: string) => {
          this.createNotification(notificationEnum.error, e)
        })
        this.getCart.emit();
      }
    })
  }

  handleRateBlur(item: any, event: any) {
    const newValue = event.target.value;
    if (item.showRateError || item.showRateExceed) {
      event.target.value = item.rate;
      setTimeout(() => {
        item.showRateError = false;
        item.showRateExceed = false;
      }, 1000);
    } else {
    if (!item) {
      return;
    }
    this.cartItemRequest.rate = newValue;
      this.cartItemService.updateRate(item.id, this.cartItemRequest).subscribe({
        next: () => {
          this.calculateTotalPrice();
          this.getCart.emit();
        },
        error: (error) => {
          event.target.value = item.onInputRate;
          error.error.messageError.map((e: string) => {
            this.createNotification(notificationEnum.error, e)
          })
          this.getCart.emit();
        }
      })
    }
  }

  handleQuantityBlur(item: any, event: any) {
    const newValue = event.target.value;
    if (item.showErrorQuantityNoEnter || item.showErrorQuantityExceed) {
      event.target.value = item.quantity;
      setTimeout(() => {
        item.showErrorQuantityNoEnter = false;
        item.showErrorQuantityExceed = false;
      }, 1000);
    } else {
      if (!item) {
        return;
      }
      this.cartItemRequest.quantity = newValue;
      this.cartItemService.updateQuantity(item.id, this.cartItemRequest).subscribe({
        next: () => {
          item.originalQuantity = newValue;
          this.calculateTotalPrice();
          // this.getCart.emit();
        },
        error: (error) => {
          event.target.value = item.originalQuantity;
          error.error.messageError.map((e: string) => {
            this.createNotification(notificationEnum.error, e)
          })
          // this.getCart.emit();
        }
      });
    }
  }

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      ''
    );
  }
}
