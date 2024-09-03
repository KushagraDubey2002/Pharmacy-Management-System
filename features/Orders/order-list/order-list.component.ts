import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order.model';
import { map, Observable } from 'rxjs';
import { OrderService } from '../services/order.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders$?: Observable<Order[]>;
  userRole: string='';

  constructor(private orderService: OrderService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  //  this.orders$ = this.orderService.getAllOrders();
  this.userRole = this.authService.getRole();
  console.log(this.userRole);
  this.loadOrders();
  }

  // loadOrders(): void {
  //   if (!this.authService.isLoggedIn()) {
  //     alert('For this, you have to login');
  //     this.router.navigate(['/login']);
  //   }
  //   if(this.userRole == 'Admin'){      
  //     this.orders$ = this.orderService.getAllOrders();
  //     console.log(this.orders$);
      
  //   }
  //   else {
  //     this.orders$ = this.orderService.getOrderByUserId();
  //   }
  // }
  loadOrders(): void {
    if (!this.authService.isLoggedIn()) {
      alert('For this, you have to login');
      this.router.navigate(['/login']);
    }
    
    if (this.userRole === 'Admin') {
      this.orders$ = this.orderService.getAllOrders().pipe(
        map((orders: Order[]) => {
          return orders.sort((a: Order, b: Order) => {
            if (a.status === b.status) {
              return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
            }
            return a.status ? -1 : 1;
          });
        })
      );
      console.log(this.orders$);
    } 
    // else {
    //   this.orders$ = this.orderService.getOrderByUserId();
    // }
    else {
      this.orders$ = this.orderService.getOrderByUserId().pipe(
        map((orders: Order[]) => {
          return orders.sort((a: Order, b: Order) => {
            // Sort by order date
            return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
          });
        })
      );
    }
  }

  onApproveOrder(orderId: number): void {
    this.orderService.validateOrder(orderId).subscribe({
      next: () => {
        this.loadOrders(); // Reload orders after approval
        alert('"Order status Updated"');
      },
      error: (error) => {
        console.log('Unable to approve order', error);
        
      }
    });
  }

  //--------------------------------

  onCancelOrder(orderId: number): void {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          this.loadOrders(); // Reload orders after cancellation
          alert('Order cancelled successfully');
        },
        error: (error) => {
          console.log('Unable to cancel order', error);
        }
      });
    }
  }
  

  //--------------------------------

  
}
