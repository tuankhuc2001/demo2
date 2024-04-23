import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../types/product';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { routerNames } from '../../../constant/router';

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
    private router : Router
  ) {
  }

  ngOnInit() {
  }

  @Input() isVisible: boolean = false;
  @Output() isVisibleChange: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  token = localStorage.getItem("token")

  handleSetIsVisisble() {
    this.isVisibleChange.emit();
    this.validateForm.setValue({priceFloor: this.formatCurrencyValue(this.productItem.floorPrice)});
  }

  handleCloseModal(){
    this.closeModal.emit();
  }

  @Input() productItem: IProduct = {
    id: 0,
    nameProduct: "",
    quantityProduct: 0,
    expiredDate: new Date,
    provider: "",
    unit: "",
    origin: "",
    codeProduct: "",
    description: "",
    providePrice: 0,
    floorPrice: 0,
    phoneProvider: "",
    imageUrl: ""
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productItem'] && !changes['productItem'].firstChange) {
      this.validateForm.setValue({
        priceFloor: this.formatCurrencyValue(this.productItem.floorPrice),
      })      
    }
  }

  validateForm: FormGroup = this.fb.group({
    priceFloor: [this.formatCurrencyValue(this.productItem.floorPrice), [Validators.required]],
  });

  handleUpdatePrice() {
    console.log(this.validateForm.value.priceFloor ,"floorPrice");
    
    if(this.validateForm.value.priceFloor == "") {
      return
    }
    const priceFloorValue = this.getNumberValue(this.validateForm.value.priceFloor);
    if(priceFloorValue == 0){
      this.notification.create("error", ``, "Giá sàn không được bằng 0");
      return
    }
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
              this.handleCloseModal();
            }
          },
          error: (error) => {
            if(error.status == 403){
              this.router.navigate([routerNames.signInPage]);
              this.notification.create("error", `Phiên đăng nhập hết hạn`, "Vui lòng đăng nhập lại");
            } else{
              error.error.messageError.map((e: string) => {
                this.notification.create("error", `${e}`, "");
              })
            }
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
    console.log(value,"value");
    console.log(value== 0,"value1");
    
    if(value == 0) {
      console.log();
      
      return ''
    }
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
    value = value || '';
    value = value.replace(/\D/g, '');
    if (!isNaN(Number(value))) {
      const numericValue = Number(value)
      const formattedValue = numericValue.toLocaleString('en-US', { maximumFractionDigits: 0 });
      event.target.value = value.endsWith('.') ? value : formattedValue;
    }
    return event.target.value;
  }
}
