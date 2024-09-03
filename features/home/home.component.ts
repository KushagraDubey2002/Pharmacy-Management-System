import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router){}
  userRole: string='';
  adminCards = [
    { title: 'Drug Inventory', text: 'Manage drugs inventory.', link: '/admin/drugsInventory', button: 'Go to Inventory' },
    { title: 'Orders', text: 'View and manage orders.', link: '/admin/orders', button: 'Go to Orders' },
    { title: 'Suppliers', text: 'Manage suppliers.', link: '/admin/suppliers', button: 'Go to Suppliers' },
    { title: 'Sales Report', text: 'View sales reports.', link: '/admin/sales-report', button: 'View Sales Report' }
  ];
  ngOnInit(): void {
    this.userRole = this.authService.getRole();
  
}

searchDrug(): void{
  this.router.navigateByUrl('admin/drugsInventory')
}
}
