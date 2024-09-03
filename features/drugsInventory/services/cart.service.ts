import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { drug } from '../models/drug.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<drug[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private cartItems: drug[] = [];
  public totalItemms = 0;

  addToCart(drug: drug, quantity: number = 1) {
    const existingItem = this.cartItems.find(item => item.drugId === drug.drugId);
    this.totalItemms++;
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ ...drug, quantity });
    }
    this.cartItemsSubject.next(this.cartItems);
  }

  removeFromCart(drugId: number) {
    const existingItem = this.cartItems.find(item => item.drugId === drugId);
    if (existingItem) {
      this.totalItemms -= existingItem.quantity;
      this.cartItems = this.cartItems.filter(item => item.drugId !== drugId);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  updateQuantity(drugId: number, quantity: number) {
    const item = this.cartItems.find(item => item.drugId === drugId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeFromCart(drugId);
      }
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  clearCart() {
    this.cartItems = [];
    this.totalItemms = 0;
    this.cartItemsSubject.next(this.cartItems);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
