// src/app/models/order.model.ts
export interface OrderItem {
    productId: number;
    name: string;
    price: number;
    quantity: number;
  }
  
  export interface Order {
    orderId: number;
    date: string;
    totalAmount: number;
    items: OrderItem[];
  }
  