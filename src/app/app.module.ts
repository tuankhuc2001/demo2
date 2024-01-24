import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { ExportProductComponent } from './components/export-product/export-product.component';
import { RequestListComponent } from './components/request-list/request-list.component';

registerLocaleData(en);
import { WarehouseListComponent } from './components/warehouse-list/warehouse-list.component';
import { ImportWarehoseComponent } from './components/import-warehose/import-warehose.component';

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
import { CardComponent } from './common/card/card.component';
import { ButtonComponent } from './common/button/button.component';
import { ModalComponent } from './common/modal/modal.component';
import { NotificationComponent } from './common/notification/notification.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SideBarComponent,
    ExportProductComponent,
    RequestListComponent,
    WarehouseListComponent,
    ImportWarehoseComponent,
    CardComponent,
    ButtonComponent,
    ModalComponent,
    NotificationComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
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
    NzCardModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
