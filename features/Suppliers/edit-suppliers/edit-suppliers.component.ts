import { Component, OnDestroy, OnInit } from '@angular/core';
import { supplier } from '../models/supplier.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../services/supplier.service';
import { UpdateSupplierRequest } from '../models/update-supplier-request.model';

@Component({
  selector: 'app-edit-suppliers',
  templateUrl: './edit-suppliers.component.html',
  styleUrls: ['./edit-suppliers.component.css']
})
export class EditSuppliersComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  editSuppliersSubscription?:  Subscription;
  supplier?: supplier;
  
  constructor(private route: ActivatedRoute,
    private supplerService: SupplierService,
    private router: Router
  ) {

   }
   
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if(this.id){
          this.supplerService.getSupplierById(this.id)
          .subscribe({ 
            next: (data) => {
             this.supplier = data;
            }
          });
        }
      }
    });
  }

  onFormSubmit(): void {
    //console.log(this.drug);
    const updateSupplierRequest: UpdateSupplierRequest = {
      supplierId: this.supplier?.supplierId ?? 0,
      name: this.supplier?.name ?? '',
      contact: this.supplier?.contact ?? '',
      email: this.supplier?.email ?? ''
    };

    if(this.id){
      this.editSuppliersSubscription = this.supplerService.updateSupplier(this.id, updateSupplierRequest)
      .subscribe({
        next: (data) => {
          this.router.navigate(['/admin/suppliers']);
        },
        error:(error) =>{
          console.log('Unable to Edit',error);
        }
      });
    }
  }

  onDelete(): void {
    if(this.id){
      this.supplerService.deleteSupplier(this.id)
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('/admin/suppliers');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editSuppliersSubscription?.unsubscribe();
  }
}
