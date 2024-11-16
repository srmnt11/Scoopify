// src/app/services/order-history.service.ts
import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderHistoryService {
  private orders: Order[] = []; // You would normally fetch this data from an API
  orderHistory$ = new BehaviorSubject<Order[]>(this.orders);

  constructor() {}

  // Mock method to fetch order history (replace with actual API call)
  getOrderHistory() {
    // Example data
    this.orders = [
      {
        orderId: 1,
        date: '2024-11-10',
        totalAmount: 500,
        items: [
          { productId: 1, name: 'Caramel', price: 120, quantity: 2 },
          { productId: 5, name: 'Coffee Almond', price: 150, quantity: 1 },
        ],
      },
      {
        orderId: 2,
        date: '2024-10-15',
        totalAmount: 300,
        items: [
          { productId: 2, name: 'Strawberry', price: 110, quantity: 2 },
        ],
      },
    ];
    this.orderHistory$.next(this.orders);
  }
}
