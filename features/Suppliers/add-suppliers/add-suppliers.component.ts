import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SupplierService } from '../services/supplier.service';
import { Router } from '@angular/router';
import { AddSupplierRequest } from '../models/add-supplier-request.model';

@Component({
  selector: 'app-add-suppliers',
  templateUrl: './add-suppliers.component.html',
  styleUrls: ['./add-suppliers.component.css']
})
export class AddSuppliersComponent implements OnDestroy{

  model: AddSupplierRequest;
  private addSupplierSubscription?: Subscription;

  constructor(private supplierService: SupplierService,
    private router: Router
  ){
    this.model = {
      name: '',
      contact:0,
      email:''

    }
  }

  onFormSubmit(){
    this.addSupplierSubscription = this.supplierService.addSupplier(this.model)
    .subscribe({
      next: (data) => {
        this.router.navigateByUrl('admin/suppliers');
      },
      error: (error) => {
        console.log('Failed to Add Suppliers',error);
      }
      
    });
  }

  ngOnDestroy(): void {
    this.addSupplierSubscription?.unsubscribe();
  }

}
