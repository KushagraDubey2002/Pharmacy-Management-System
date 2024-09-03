import { Component, OnInit } from '@angular/core';
import { DrugService } from '../services/drug.service';
import { drug } from '../models/drug.model';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.css']
})
export class DrugListComponent implements OnInit {

  drugs$?: Observable<drug[]>;
  drugs: drug[] = [];
  filteredDrugs: drug[] = [];
  userRole: string = '';
  searchQuery: string = '';

  constructor(private drugService: DrugService, private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.drugs$ = this.drugService.getAllDrugs();
    this.drugs$.subscribe(drugs => {
      this.drugs = drugs;
      this.filteredDrugs = drugs;
    });
    this.userRole = this.authService.getRole();
  }

  filterDrugs(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredDrugs = this.drugs;
    } else {
      this.filteredDrugs = this.drugs.filter(drug =>
        drug.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        drug.drugId.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }


  addToCart(drug: drug): void {
    this.cartService.addToCart(drug);
  }
}
