import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../types/product';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-modal-update-price',
  templateUrl: './modal-update-price.component.html',
  styleUrl: './modal-update-price.component.css'
})

export class ModalUpdatePriceComponent {
  constructor(
    private fb: NonNullableFormBuilder,
    private producService: ProductService,
    private notification: NzNotificationService,
  ) {
  }

  ngOnInit() {
  }

  @Input() isVisible: boolean = false;
  @Output() isVisibleChange: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();



  handleSetIsVisisble() {
    this.closeModal.emit();
    this.validateForm.setValue({ priceFloor: this.productItem.floorPrice })
  }

  @Input() productItem: IProduct = {
    id: 0,
    nameProduct: "",
    quantityProduct: 0,
    expiredDate: "",
    provider: "",
    unit: "",
    origin: "",
    avatar: "",
    codeProduct: "",
    description: "",
    providePrice: 0,
    floorPrice: 0,
    phoneProvider: "",
    imageUrl:""
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productItem'] && !changes['productItem'].firstChange) {
      this.validateForm.setValue({
        priceFloor: this.formatCurrencyValue(this.productItem.floorPrice),
      })
    }
  }

  validateForm: FormGroup = this.fb.group({
    priceFloor: [null, [Validators.required]],
  });

  handleUpdatePrice() {
    const priceFloorValue = this.getNumberValue(this.validateForm.value.priceFloor);

    if (priceFloorValue !== undefined) {
      if (priceFloorValue === this.productItem.floorPrice) {
        this.handleSetIsVisisble();
      } else { 
        this.producService.updateProductWareHouse(this.productItem, priceFloorValue).subscribe({
          next: (v) => {
            if (v.status == false) {
              this.notification.create("error", `${v.message}`, "");
            } else {
              this.notification.create("success", `${v.message}`, "");
              this.handleSetIsVisisble();
            }
          },
          error: (error) => {
            console.log(error.error.messageError)
            error.error.messageError.map((e: string) => {
              this.notification.create("error", `${e}`, "");
            })
          }
        })
      }
    }
  }

  getNumberValue(value: string | null): number | undefined {
    if (value !== undefined && value !== null && value !== '') {
      return parseFloat(value.replace(/\D/g, ''));
    }
    return undefined;
  }

  formatCurrencyValue(value: number | null): string {
    if (value !== null) {
      let formattedValue = value.toLocaleString('en-US', { maximumFractionDigits: 2 });
      formattedValue = formattedValue.replace(/\$/g, '').replace(/\.00$/, '');
      return formattedValue;
    } else {
      return '';
    }
  }

  formatPrice(event: any) {
    let value: string | null = event.target.value;
    value = value || '0';
    value = value.replace(/\D/g, '');
    if (!isNaN(Number(value))) {
      const numericValue = Number(value)
      const formattedValue = numericValue.toLocaleString('en-US', { maximumFractionDigits: 0 });
      event.target.value = value.endsWith('.') ? value : formattedValue;
    }
    return event.target.value;
  }
}
