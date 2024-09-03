import { Component, OnDestroy } from '@angular/core';
import { AddOrderRequest } from '../models/add-order-request.model';
import { OrderService } from '../services/order.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { OrderItem } from '../models/orderItem.model';
import { DrugService } from '../../drugsInventory/services/drug.service';

@Component({
  selector: 'app-add-orders',
  templateUrl: '../add-order/add-order.component.html',
  styleUrls: ['../add-order/add-order.component.css']
})
export class AddOrdersComponent implements OnDestroy {

  model: AddOrderRequest ={
    orderDetails: []
  };
  private addOrderSubscription?: Subscription;
  errorMessage: string | null = null;

  constructor(private orderService: OrderService, private router: Router, private drugService: DrugService) {
    this.model = {
      orderDetails: []
    };
  }

  // addOrderItem() {
  //   this.model.orderItems.push({ orderItemId:0 ,drugId: 0, drugName:'', quantity: 0, price:0,totalAmount:0});
  // }
  addOrderItem() {
    this.model.orderDetails.push({  drugId: 0, quantity: 0});
  }

  onFormSubmit() {
    this.addOrderSubscription = this.orderService.addOrder(this.model)
      .subscribe({
        next: (data) => {
          this.router.navigateByUrl('/orders');
        },
        // error: (error) => {
        //   console.log("Failed to Add Order");
        // }
        error: (error) => {
          console.log("Failed to Add Order",error);
          alert(`Failed to Add Order: ${error}`);
        }
      });
  }

  ngOnDestroy(): void {
    this.addOrderSubscription?.unsubscribe();
  }
}

