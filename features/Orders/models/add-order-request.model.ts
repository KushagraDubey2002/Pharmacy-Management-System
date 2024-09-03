import { OrderItemDto } from "./order-dto.model";
import { OrderItem } from "./orderItem.model";

export interface AddOrderRequest {
    orderDetails: OrderItem[];
  }

  // export interface OrderItem {
  //   drugId: number;
  //   quantity: number;
  // }


