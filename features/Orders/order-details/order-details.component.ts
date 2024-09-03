import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: string | null = null;
  order?: Order;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');

    if (this.orderId) {
      if (!this.authService.isLoggedIn()) {
       
        this.router.navigate(['/login']);
        alert('For this, you have to login');
      }
      this.orderService.getOrderById(this.orderId).subscribe({
        next: (data) => {
          this.order = data;
        },
        error: (error) => {
          console.log('Error fetching order details', error);
        }
      });
    }
  }
}

