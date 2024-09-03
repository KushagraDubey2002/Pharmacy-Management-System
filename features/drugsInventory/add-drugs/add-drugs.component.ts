import { Component, OnDestroy } from '@angular/core';
import { AddDrugRequest } from '../models/add-drug-request.model';
import { DrugService } from '../services/drug.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-drugs',
  templateUrl: './add-drugs.component.html',
  styleUrls: ['./add-drugs.component.css']
})
export class AddDrugsComponent implements OnDestroy {

  model: AddDrugRequest;
  private addDrugSubscription?: Subscription;

  constructor(private drugService: DrugService,
    private router: Router
  ) { 
    this.model = {
      name:'',
      price:0,
      quantity:0,
      supplierId:0
    }
  }
  

  onFormSubmit(){
    this.addDrugSubscription = this.drugService.addDrug(this.model)
    .subscribe({
      next: (data) => {
        this.router.navigateByUrl('/admin/drugsInventory');
        
      },
      error: (error) => {
        console.log("Failed to Add Drugs",error);
        
      }
    });
  }
  ngOnDestroy(): void {
    this.addDrugSubscription?.unsubscribe( );
  }
}
