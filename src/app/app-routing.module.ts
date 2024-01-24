import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ExportProductComponent } from './components/export-product/export-product.component';
import { ImportWarehoseComponent } from './components/import-warehose/import-warehose.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { WarehouseListComponent } from './components/warehouse-list/warehouse-list.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';

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
      { path: '', pathMatch: 'full', redirectTo: 'home/exportProduct' },
      {
        path: 'home/exportProduct',
        component: ExportProductComponent,
      },
      {
        path: 'home/importWarehouse',
        component: ImportWarehoseComponent,
      },
      {
        path: 'home/requestList',
        component: RequestListComponent,
      },
      {
        path: 'home/waterhouseList',
        component: WarehouseListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
