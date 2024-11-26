import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
})
export class CartPage implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, 
              private navCtrl: NavController, 
              private alertController: AlertController) {}

  ngOnInit() {
    // Subscribe to cart updates
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.totalPrice = this.cartService.getTotalPrice();  // Update total price
    });
  }

  // Navigate to the Checkout Page
  goToCheckout() {
    this.navCtrl.navigateForward('/checkout');
  }

   // Show alert before removing item
   async removeItemAlert(productId: number) {
    const alert = await this.alertController.create({
      header: 'Remove Product',
      message: 'Are you sure you want to remove this product from your cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Remove action cancelled');
          },
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeItem(productId);
          },
        },
      ],
    });
    await alert.present();
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);

    // Also remove it from localStorage (if used for persisted state)
  let addedToCart = JSON.parse(localStorage.getItem('addedToCart') || '[]');
  addedToCart = addedToCart.filter((id: number) => id !== productId);  
  localStorage.setItem('addedToCart', JSON.stringify(addedToCart));  
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

   // Show alert before clearing cart
   async clearCartAlert() {
    const alert = await this.alertController.create({
      header: 'Clear Cart',
      message: 'Are you sure you want to clear your entire cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Clear cart action cancelled');
          },
        },
        {
          text: 'Clear Cart',
          handler: () => {
            this.clearCart();
          },
        },
      ],
    });
    await alert.present();
  }
  goToProducts() {
    this.navCtrl.navigateForward('/tabs/products');
  }
}
