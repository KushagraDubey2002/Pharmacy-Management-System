
//================================================================
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { DrugService } from '../services/drug.service';
import { OrderService } from '../../Orders/services/order.service';
import { AuthService } from '../../auth/auth.service';
import { drug } from '../models/drug.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: drug[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private drugService: DrugService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  increaseQuantity(drug: drug) {
    this.cartService.updateQuantity(drug.drugId, drug.quantity + 1);
    
  }

  decreaseQuantity(drug: drug) {
    if (drug.quantity <= 1) {
      alert('Quantity cannot be less than 1.');
      return;
    }
    this.cartService.updateQuantity(drug.drugId, drug.quantity - 1);
  }

  removeItem(drugId: number) {
    this.cartService.removeFromCart(drugId);
  }

  proceedToPayment() {
    if (!this.authService.isLoggedIn()) {
      alert('Log in Required');
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/payment']);
  }

  placeOrder() {
    if (!this.authService.isLoggedIn()) {
      alert('Log in Required');
      this.router.navigate(['/login']);
      return;
    }

    const orderDetails = this.cartItems.map(item => ({
      drugId: item.drugId,
      quantity: item.quantity
    }));

    this.orderService.addOrder({ orderDetails }).subscribe(
      () => {
        this.cartService.clearCart();
        alert('Order placed successfully!');
        this.router.navigate(['admin/orders']);
      },
      error => {
        console.error('Error placing order', error);
      }
    );
  }

  private handleError(error: any): void {
    console.error('Error response:', error);
    if (error.status === 400) {
      alert(error.error);
    } else {
      alert('Insufficient stock');
    }
  }
}
