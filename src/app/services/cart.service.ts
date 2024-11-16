import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { product: Product, quantity: number }[] = [];  // Store cart items with quantity
  cart$ = new BehaviorSubject<{ product: Product, quantity: number }[]>(this.cart);  // Observable for cart items
  private orderHistory: any[] = JSON.parse(localStorage.getItem('orderHistory') || '[]');  // Retrieve order history from local storage

  constructor() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cart = storedCart;
    this.cart$.next(this.cart);  // Emit the initial cart state to subscribers
  }

  // Add product to the cart
  addToCart(product: Product) {
    const existingProduct = this.cart.find(item => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;  // Increase quantity if product exists
    } else {
      this.cart.push({ product, quantity: 1 });  // Add new product with quantity 1
    }

    this.saveCart();  // Save the updated cart to localStorage
    this.cart$.next(this.cart);  // Emit updated cart state
  }

  // Remove product from the cart
  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    this.saveCart();  // Save the updated cart to localStorage
    this.cart$.next(this.cart);  // Emit updated cart state
  }

  // Decrease quantity of product in the cart
  decreaseQuantity(productId: number) {
    const product = this.cart.find(item => item.product.id === productId);
    
    if (product && product.quantity > 1) {
      product.quantity -= 1;  // Decrease quantity
      this.saveCart();  // Save the updated cart to localStorage
      this.cart$.next(this.cart);  // Emit updated cart state
    }
  }

  // Increase quantity of product in the cart
  increaseQuantity(productId: number) {
    const product = this.cart.find(item => item.product.id === productId);
    
    if (product) {
      product.quantity += 1;  // Increase quantity
      this.saveCart();  // Save the updated cart to localStorage
      this.cart$.next(this.cart);  // Emit updated cart state
    }
  }

  // Clear the cart
  clearCart() {
    this.cart = [];  // Clear the cart
    this.saveCart();  // Save empty cart to localStorage
    this.cart$.next(this.cart);  // Emit updated cart state
  }

  // Get the total price of the products in the cart
  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  // Save order to the order history
  addOrderToHistory(order: any) {
    this.orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(this.orderHistory));  // Save to local storage
  }

  // Get all orders from the order history
  getOrderHistory() {
    return this.orderHistory;
  }

  // Process the checkout: Move cart items to order history and clear the cart
  checkout() {
    const orderDate = new Date().toISOString();
    this.cart.forEach(item => {
      const order = {
        product: item.product,
        quantity: item.quantity,
        date: orderDate
      };
      this.addOrderToHistory(order); // Add each item to order history
    });

    // After processing checkout, clear the cart
    this.clearCart();
  }

  // Helper method to save the current cart state to localStorage
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));  // Save the current cart to localStorage
  }
}
