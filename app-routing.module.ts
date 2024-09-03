import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrugListComponent } from './features/drugsInventory/drug-list/drug-list.component';
import { AddDrugsComponent } from './features/drugsInventory/add-drugs/add-drugs.component';
import { EditDrugComponent } from './features/drugsInventory/edit-drug/edit-drug.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/signup/signup.component';
import { SuppliersListComponent } from './features/Suppliers/suppliers-list/suppliers-list.component';
import { AddSuppliersComponent } from './features/Suppliers/add-suppliers/add-suppliers.component';
import { EditSuppliersComponent } from './features/Suppliers/edit-suppliers/edit-suppliers.component';
import { OrderListComponent } from './features/Orders/order-list/order-list.component';
import { EditOrderComponent } from './features/Orders/edit-order/edit-order.component';
import { OrderDetailsComponent } from './features/Orders/order-details/order-details.component';
import { SalesReportComponent } from './features/Orders/sales-report/sales-report.component';
import { AddOrdersComponent } from './features/Orders/add-order/add-order.component';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/drugsInventory/cart/cart.component';
import { PaymentComponent } from './features/Orders/payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Home',
    component: HomeComponent
  },
  {
    path: 'admin/drugsInventory',
    component: DrugListComponent
  },
  {
    path: 'admin/drugsInventory/add',
    component: AddDrugsComponent
  },
  {
    path: 'admin/drugsInventory/:id',
    component: EditDrugComponent
  },
  {
    path: 'admin/suppliers',
    component: SuppliersListComponent
  },
  {
    path: 'admin/suppliers/add',
    component: AddSuppliersComponent
  },
  {
    path: 'admin/suppliers/:id',
    component: EditSuppliersComponent
  },
  {
    path: 'admin/orders',
    component: OrderListComponent
  },
  {
    path: 'admin/orders/:userId',
    component: OrderDetailsComponent
  },
  {
    path: 'admin/order-details/:id',
    component: OrderDetailsComponent
  },
  {
    path: 'admin/sales-report',
    component: SalesReportComponent
  },
  {
    path: 'admin/add-order',
    component: AddOrdersComponent
  },
  {
    path: 'add-order',
    component: AddOrdersComponent
  },
  {
    path: 'admin/orders/edit/:id',
    component: EditOrderComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }



