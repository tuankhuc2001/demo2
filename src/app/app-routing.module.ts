import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportWarehoseComponent } from './components/import-warehose/import-warehose.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { ProductSaleComponent } from './components/product-sale/product-sale.component';
import { OrderComponent } from './components/order/order.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/signIn' },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'home',
    component: SideBarComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'productSale' },
      {
        path: 'productSale',
        component: ProductSaleComponent,
      },
      {
        path: 'importWarehouse',
        component: ImportWarehoseComponent,
      },
      {
        path: 'oder',
        component: OrderComponent,
      },
      {
        path: 'warehouse',
        component: WarehouseComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
