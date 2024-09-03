import { OrderItem } from "./orderItem.model";

export interface UpdateOrderRequest {
    userId: number;
    orderItems: OrderItem[];
  }
  