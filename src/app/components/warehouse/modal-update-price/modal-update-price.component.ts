import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../types/product';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-modal-update-price',
  templateUrl: './modal-update-price.component.html',
  styleUrl: './modal-update-price.component.css'
})
export class ModalUpdatePriceComponent {
  constructor
  (private fb: NonNullableFormBuilder, 
    private producService: ProductService,
    private  notification: NzNotificationService,
    ) {}

  ngOnInit() {
  }


  @Input() isVisible: boolean = false;
  @Output() isVisibleChange :EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  handleCloseModal() {
    this.closeModal.emit();
  }

  handleSetIsVisisble(){
    this.isVisibleChange.emit();
    this.validateForm.setValue({ priceFloor: this.productItem.floorPrice})
  }
  

  @Input() productItem:IProduct = {
    id: 0,
    nameProduct: "Vitamin gái",
    quantityProduct: 0,
    expiredDate: "",
    provider: "string",
    unit: "string",
    origin: "string",
    avatar:"",
    codeProduct: "",
    description: "",
    providePrice: 0,
    floorPrice: 1,
    phoneProvider: "",
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productItem'] && !changes['productItem'].firstChange) {
      console.log('productItem changed:', changes['productItem'].currentValue);
      this.validateForm.setValue({priceFloor: this.productItem.floorPrice })
    }
  }

    validateForm: FormGroup<{
      priceFloor: FormControl<number>;
    }> = this.fb.group({
      priceFloor: [this.productItem.floorPrice, [Validators.required]],
    });


    handleUpdatePrice(){
      if(this.validateForm.value.priceFloor !== undefined)
      if( this.validateForm.value.priceFloor == this.productItem.floorPrice){
        this.handleSetIsVisisble();
      }else{
        console.log(this.validateForm.value.priceFloor,"TYPE");
        this.productItem.floorPrice = this.validateForm.value.priceFloor;
        this.producService.updateProductWareHouse(this.productItem).subscribe({
          next: (v) =>{
            if (v.status == false){
              this.notification.create("error", `${v.message}`, "");
            }
            else{
              this.notification.create("success", `${v.message}`, "");
              this.handleCloseModal();
            }
          }
      })
      }
      
    }

   
}
