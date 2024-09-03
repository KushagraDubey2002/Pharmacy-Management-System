import { OrderItemDto } from "./order-dto.model";
import { OrderItem } from "./orderItem.model";

export interface Order {
    orderId: number;
    userId: number;
    orderDate: Date;
    status: string;
    totalAmount: number;
    orderItems: OrderItemDto[];
  }
  
  