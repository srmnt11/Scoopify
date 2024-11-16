import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  cartCount = 0;  // Initialize cart count

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to cart observable to track changes
    this.cartService.cart$.subscribe(cart => {
      // Update cart count by summing the quantity of all products in the cart
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    });
  }
}

