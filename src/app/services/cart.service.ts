import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  isReceived?: boolean;  // Optional field to track the received status
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { product: Product; quantity: number }[] = []; // Store cart items with quantity
  cart$ = new BehaviorSubject<{ product: Product; quantity: number }[]>(this.cart); // Observable for cart items

  private orderHistory: any[] = JSON.parse(localStorage.getItem('orderHistory') || '[]'); // Retrieve order history from local storage
  private orderHistorySubject = new BehaviorSubject<any[]>(this.orderHistory); // Observable for order history
  orderHistory$ = this.orderHistorySubject.asObservable(); // Expose as observable
  orders$: any;

  constructor() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = storedCart;
    this.cart$.next(this.cart); // Emit the initial cart state to subscribers
  }

  // Add product to the cart
  addToCart(product: Product) {
    const existingProduct = this.cart.find((item) => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if product exists
    } else {
      this.cart.push({ product, quantity: 1 }); // Add new product with quantity 1
    }

    this.saveCart(); // Save the updated cart to localStorage
    this.cart$.next(this.cart); // Emit updated cart state
  }

  // Remove product from the cart
  removeFromCart(productId: number) {
    this.cart = this.cart.filter((item) => item.product.id !== productId);
    this.saveCart(); // Save the updated cart to localStorage
    this.cart$.next(this.cart); // Emit updated cart state
  }

  // Decrease quantity of product in the cart
  decreaseQuantity(productId: number) {
    const product = this.cart.find((item) => item.product.id === productId);

    if (product && product.quantity > 1) {
      product.quantity -= 1; // Decrease quantity
      this.saveCart(); // Save the updated cart to localStorage
      this.cart$.next(this.cart); // Emit updated cart state
    }
  }

  // Increase quantity of product in the cart
  increaseQuantity(productId: number) {
    const product = this.cart.find((item) => item.product.id === productId);

    if (product) {
      product.quantity += 1; // Increase quantity
      this.saveCart(); // Save the updated cart to localStorage
      this.cart$.next(this.cart); // Emit updated cart state
    }
  }

  // Clear the cart
  clearCart() {
    this.cart = []; // Clear the cart
    this.saveCart(); // Save empty cart to localStorage
    this.cart$.next(this.cart); // Emit updated cart state
  }

  // Get the total price of the products in the cart
  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  // Save order to the order history
  addOrderToHistory(order: any) {
    this.orderHistory.push(order); // Add new order to history
    localStorage.setItem('orderHistory', JSON.stringify(this.orderHistory)); // Save to local storage
    this.orderHistorySubject.next(this.orderHistory); // Emit updated order history
  }

  // Get all orders from the order history
  getOrderHistory() {
    return this.orderHistory;
  }

  getOrders() {
    return this.orderHistory$; // Return the order history observable
  }
  
  updateOrderStatus(updatedOrder: any) {
    if (updatedOrder && updatedOrder.items && Array.isArray(updatedOrder.items)) {
      updatedOrder.items.forEach((item: OrderItem) => {  // Explicitly typing 'item' here
        if (item.productName && item.quantity && item.price) {
          // Find the order in orderHistory using the productName as a unique identifier
          const orderIndex = this.orderHistory.findIndex(order =>
            order.items.some((i: { productName: string; }) => i.productName === item.productName)
          );
  
          if (orderIndex > -1) {
            // Update the order status for this item
            const order = this.orderHistory[orderIndex];
            const itemIndex = order.items.findIndex((i: { productName: string; }) => i.productName === item.productName);
            if (itemIndex > -1) {
              order.items[itemIndex].isReceived = updatedOrder.isReceived;
            }
            this.saveOrderHistory();  // Save the updated order history to localStorage
          } else {
            console.error('Order not found in history:', updatedOrder);
          }
        } else {
          console.error('Invalid item data:', item);
        }
      });
    } else {
      console.error('Invalid order structure:', updatedOrder);
    }
  }
  

  private saveOrderHistory() {
    localStorage.setItem('orderHistory', JSON.stringify(this.orderHistory));
  }

  // Process the checkout: Move cart items to order history and clear the cart
  checkout() {
    const orderDate = new Date().toISOString();
    const order = {
      items: this.cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      total: this.getTotalPrice(),
      date: orderDate,
    };

    this.addOrderToHistory(order); // Add the full cart as one order to the order history
    this.clearCart(); // Clear the cart after checkout
  }

  // Helper method to save the current cart state to localStorage
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart)); // Save the current cart to localStorage
  }
}
