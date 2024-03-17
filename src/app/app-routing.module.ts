import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportWarehoseComponent } from './components/import-warehose/import-warehose.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { ProductSaleComponent } from './components/product-sale/product-sale.component';
import { OrderComponent } from './components/order/order.component';
import { WarehouseComponent } from './components/warehouse/warehouse.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CartComponent } from './components/cart/cart.component';

import { routerNames } from './constant/router';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/signIn' },
  {
    path: `${routerNames.signInPage}`,
    component: SignInComponent,
  },
  {
    path: `${routerNames.addProductPage}`,
    component: AddProductComponent,
  },
  {
    path: `${routerNames.orderDetailPage}`,
    component: OrderDetailComponent,
  },
  {
    path: `${routerNames.cartPage}`,
    component: CartComponent,
  },
  {
    path: `${routerNames.homePage}`,
    component: SideBarComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: `${routerNames.productSalePage}` },
      {
        path: `${routerNames.productSalePage}`,
        component: ProductSaleComponent,
      },
      {
        path: `${routerNames.importWarehousePage}`,
        component: ImportWarehoseComponent,
      },
      {
        path: `${routerNames.orderPage}`,
        component: OrderComponent,
      },
      {
        path: `${routerNames.warehousePage}`,
        component: WarehouseComponent,
      },
      {
        path: `${routerNames.addProductPage}`,
        component: AddProductComponent,
      },
    ],
  },
  {
    path: `${routerNames.cart}`,
    component: CartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
