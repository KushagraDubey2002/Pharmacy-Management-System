
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddDrugsComponent } from './features/drugsInventory/add-drugs/add-drugs.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditDrugComponent } from './features/drugsInventory/edit-drug/edit-drug.component';
import { AddSuppliersComponent } from './features/Suppliers/add-suppliers/add-suppliers.component';
import { SuppliersListComponent } from './features/Suppliers/suppliers-list/suppliers-list.component';
import { EditSuppliersComponent } from './features/Suppliers/edit-suppliers/edit-suppliers.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/signup/signup.component';
import { OrderListComponent } from './features/Orders/order-list/order-list.component';
import { AddOrdersComponent } from './features/Orders/add-order/add-order.component';
import { EditOrderComponent } from './features/Orders/edit-order/edit-order.component';
import { OrderDetailsComponent } from './features/Orders/order-details/order-details.component';
import { SalesReportComponent } from './features/Orders/sales-report/sales-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './features/home/home.component';
import { AuthInterceptor } from './features/auth/auth.interceptor';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './features/drugsInventory/cart/cart.component';
import { DrugListComponent } from './features/drugsInventory/drug-list/drug-list.component';
import { PaymentComponent } from './features/Orders/payment/payment.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//import { CartComponent } from './features/drugsInventory/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DrugListComponent,
    AddDrugsComponent,
    EditDrugComponent,
    AddSuppliersComponent,
    SuppliersListComponent,
    EditSuppliersComponent,
    LoginComponent,
    RegisterComponent,
    OrderListComponent,
    AddOrdersComponent,
    EditOrderComponent,
    OrderDetailsComponent,
    SalesReportComponent,
    HomeComponent,
    FooterComponent,
    CartComponent,
   PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
