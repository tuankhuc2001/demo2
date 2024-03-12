import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  handleCloseModal() {
    this.closeModal.emit();
  }

  @Input() productItem:IProduct = {
    id: 0,
    nameProduct: "Vitamin gái",
    quantityProduct: 0,
    expiredDate: new Date,
    provider: "string",
    unit: "string",
    origin: "string",
    avatar:"",
    codeProduct: "",
    description: "",
    providePrice: 0,
    floorPrice: 100000000,
  }


    validateForm: FormGroup<{
      priceFloor: FormControl<number>;
    }> = this.fb.group({
      priceFloor: [this.productItem.floorPrice, [Validators.required]],
    });

    handleResetState(){
      
    }

    handleCancel(){
        this.handleCloseModal();
        this.handleResetState();
    }


    handleUpdatePrice(){
      
      this.producService.updateProductWareHouse(this.productItem).subscribe({
        next: (v) =>{
          if (v.status == false){
            this.notification.create("error", `${v.message}`, "");

          }
          else{
            this.notification.create("success", `${v.message}`, "");
            this.handleCancel();
          }
        }
    })
    }

}
