import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DrugService } from '../services/drug.service';
import { drug } from '../models/drug.model';
import { UpdateDrugRequest } from '../models/update-drug-request.model';

@Component({
  selector: 'app-edit-drug',
  templateUrl: './edit-drug.component.html',
  styleUrls: ['./edit-drug.component.css']
})
export class EditDrugComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  editDrugsSubscription?:  Subscription;
  drug?: drug;

  constructor(private route: ActivatedRoute,
    private drugService: DrugService,
    private router: Router
  ) {

   }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
       this.id =  params.get('id');

       if(this.id){
        this.drugService.getDrugById(this.id)
        .subscribe({
          next: (data) => {
            this.drug = data;
          }
        });
       }
      }
    });
  }

  onFormSubmit(): void {
    //console.log(this.drug);
    const updateDrugRequest: UpdateDrugRequest = {
      name: this.drug?.name ?? '',
      price: this.drug?.price ?? 0,
      quantity: this.drug?.quantity ?? 0,
      supplierId: this.drug?.supplierId ?? 0,
      expiryDate: this.drug?.expiryDate  ?? new Date() 
    };

    if(this.id){
      this.editDrugsSubscription = this.drugService.updateDrug(this.id, updateDrugRequest)
      .subscribe({
        next: (data) => {
          this.router.navigate(['/admin/drugsInventory']);
        },
        error:(error) =>{
          console.log('Unable to Edit',error);
        }
      });
    }
  }

  onDelete(): void {
    if(this.id){
      this.drugService.deleteDrug(this.id)
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('/admin/drugsInventory');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editDrugsSubscription?.unsubscribe();
  }
}
