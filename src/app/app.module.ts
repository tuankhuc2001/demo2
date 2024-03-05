import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
registerLocaleData(en);
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { ImportWarehoseComponent } from './components/import-warehose/import-warehose.component';
import { CardComponent } from './common/card/card.component';
import { ButtonComponent } from './common/button/button.component';
import { ModalComponent } from './common/modal/modal.component';
import { NotificationComponent } from './common/notification/notification.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { ModalUpdateQuantityComponent } from './components/modal-update-quantity/modal-update-quantity.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductSaleComponent } from './components/product-sale/product-sale.component';
import { ModalAddCartItemComponent } from './components/product-sale/modal-add-cart-item/modal-add-cart-item.component';
import { ModalCustomerComponent } from './components/cart/modal-customer/modal-customer.component';
import { ModalAddCustomerComponent } from './components/cart/modal-add-customer/modal-add-customer.component';
import { ModalAddOrderComponent } from './components/cart/modal-add-order/modal-add-order.component';
import { ModalDeleteSingleComponent } from './components/cart/modal-delete-single/modal-delete-single.component';
import { ModalDeleteAllComponent } from './components/cart/modal-delete-all/modal-delete-all.component';
import { CardProductSaleComponent } from './components/product-sale/card-product-sale/card-product-sale.component';
import { CardOderComponent } from './components/order/card-oder/card-oder.component';
import { CardCustomerComponent } from './components/cart/card-customer/card-customer.component';
import { CardCartComponent } from './components/cart/card-cart/card-cart.component';
import { InputComponent } from './common/inputValidate/input.component';
import {CardOrderDetailComponent} from './components/order-detail/card-order-detail/card-order-detail.component'
//UI
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTabsModule } from 'ng-zorro-antd/tabs';


@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ImportWarehoseComponent,
    CardComponent,
    ButtonComponent,
    ModalComponent,
    NotificationComponent,
    SignInComponent,
    CartComponent,
    OrderComponent,
    OrderDetailComponent,
    WarehouseComponent,
    ModalUpdateQuantityComponent,
    AddProductComponent,
    ProductSaleComponent,
    ModalAddCartItemComponent,
    ModalCustomerComponent,
    ModalAddCustomerComponent,
    ModalAddOrderComponent,
    ModalDeleteSingleComponent,
    ModalDeleteAllComponent,
    CardProductSaleComponent,
    CardOderComponent,
    CardCustomerComponent,
    CardCartComponent,
    InputComponent,
    CardOrderDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzModalModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzPaginationModule,
    NzSelectModule,
    NzFormModule,
    NzLayoutModule,
    NzMenuModule,
    NzNotificationModule,
    NzImageModule,
    NzAlertModule,
    NzDrawerModule,
    NzAvatarModule,
    NzCardModule,
    NzCheckboxModule,
    NzSpinModule,
    NzUploadModule,
    NzDatePickerModule,
    NzTabsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
