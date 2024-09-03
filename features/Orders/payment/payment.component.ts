import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../Orders/services/order.service';
import { CartService } from '../../drugsInventory/services/cart.service';
import { OrderItem } from '../../Orders/models/orderItem.model';
import { AddOrderRequest } from '../../Orders/models/add-order-request.model';
import { drug } from '../../drugsInventory/models/drug.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartItems: drug[] = [];
  totalPrice: number = 0;
  private cartSubscription?: Subscription;
  errorMessage: string | null = null;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }


  placeOrder(): void {
    const orderDetails: OrderItem[] = this.cartItems.map(item => ({
      drugId: item.drugId,
      quantity: item.quantity
    }));
  
    const orderRequest: AddOrderRequest = {
      orderDetails: orderDetails
    };
  
    this.orderService.addOrder(orderRequest).subscribe(
      () => {
        this.cartService.clearCart();
        this.router.navigate(['admin/orders']);
        alert('Order Placed Successfully');
      },
      (error: any) => {
        console.log("Failed to Add Order", error);
  
        // Extract the error message
        let errorMessage = 'Failed to Add Order';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else if (error.error && typeof error.error === 'string') {
          // Backend returned a string error message
          errorMessage = `Server error: ${error.error}`;
        } else if (error.error && typeof error.error === 'object') {
          // Backend returned an object error message
          errorMessage = `Server error: ${error.error.message || JSON.stringify(error.error)}`;
        } else {
          // Default to the status text or status code
          errorMessage = `Error: ${error.status} - ${error.statusText}`;
        }
  
        alert(errorMessage);
        this.cancelPayment();
      }
    );
  }
  
  cancelPayment(): void {
    this.router.navigate(['/cart']);
  }
}
