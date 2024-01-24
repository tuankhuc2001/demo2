import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ExportProductComponent } from './components/export-product/export-product.component';
import { ImportWarehoseComponent } from './components/import-warehose/import-warehose.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { WarehouseListComponent } from './components/warehouse-list/warehouse-list.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/signIn' },
  {
    path: 'exportProduct',
    component: ExportProductComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'importWarehouse',
    component: ImportWarehoseComponent,
  },
  {
    path: 'requestList',
    component: RequestListComponent,
  },
  {
    path: 'waterhouseList',
    component: WarehouseListComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
