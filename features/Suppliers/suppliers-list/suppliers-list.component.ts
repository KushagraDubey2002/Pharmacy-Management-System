import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { supplier } from '../models/supplier.model';
import { SupplierService } from '../services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.css']
})
export class SuppliersListComponent implements OnInit{

  suppliers$?: Observable<supplier[]>; 
  id: string | null = null;

  constructor(private supplierservice:SupplierService,
    private route: ActivatedRoute,
    private supplerService: SupplierService,
    private router: Router
  ){

  }

  ngOnInit(): void {

    this.suppliers$ = this.supplierservice.getAllSuppliers();
    console.log(this.suppliers$);

  }

}
