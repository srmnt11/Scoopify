import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.page.html',
  styleUrls: ['checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartItems: { product: Product, quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(
    private cartService: CartService, 
    private navCtrl: NavController,
    private alertController: AlertController  // Inject AlertController
  ) {}

  ngOnInit() {
    // Subscribe to cart updates
    this.cartService.cart$.subscribe(cart => {
      this.cartItems = cart;
      this.totalPrice = this.cartService.getTotalPrice();  // Update total price
    });
  }

  // Confirm the checkout and process the order
  async confirmCheckout() {
    // Save the order to history
    const order = {
      date: new Date().toISOString(),
      total: this.totalPrice,
      items: this.cartItems.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    // Add to order history
    this.cartService.addOrderToHistory(order);

    // Clear the cart after the order is placed
    this.cartService.clearCart();

    // Show success alert
    const alert = await this.alertController.create({
      header: 'Order Successful',
      message: 'Your order has been placed successfully!',
      buttons: ['OK']
    });

    // Present the alert
    await alert.present();

    // Navigate back to the home page after closing the alert
    await alert.onDidDismiss();
    this.navCtrl.navigateBack('/tabs/home');
  }

  // Cancel the checkout process (e.g., go back to the cart)
  cancelCheckout() {
    this.navCtrl.navigateBack('/tabs/cart');  // Go back to the cart page
  }
}
