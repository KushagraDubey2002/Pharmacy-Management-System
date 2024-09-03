export interface OrderDto {
    // orderId: number;
    // userId: number;
    // orderDate: Date;
    // status: string;
    // totalAmount: number;
    orderItems: OrderItemDto[];
  }
  
  export interface OrderItemDto {
    orderItemId: number;
    drugId: number;
    drugName: string;
    quantity: number;
    price: number;
    totalAmount: number;
  }
  