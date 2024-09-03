export interface AddDrugRequest {
    name: string;
    price: number;
    quantity: number;
    supplierId: number;
}

import { OrderItem } from "../../Orders/models/orderItem.model";


export interface AddOrderRequest {
    drugs: OrderItem[]
  }
  
  export interface DrugOrderItem {
    drugId: string;
    quantity: number;
  }