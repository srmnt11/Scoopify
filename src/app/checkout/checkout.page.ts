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
  deliveryCharge: number = 20; // Example delivery charge
  selectedPaymentMethod: string = ''; // Store selected payment method
  userInfo = { name: '', address: '', contactNumber: '' }; // Store user info
  creditCardDetails = { 
    cardholderName: '', 
    cardNumber: '', 
    expirationDate: '', 
    cvc2: '' 
  }; 

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

  // Handle payment method change
  onPaymentMethodChange() {
    // Reset credit card details when payment method changes
    if (this.selectedPaymentMethod !== 'creditCard') {
      this.creditCardDetails = { 
        cardholderName: '', 
        cardNumber: '', 
        expirationDate: '', 
        cvc2: '' 
      };
    }
  }

  // Confirm the checkout and process the order
  async confirmCheckout() {
    // Validate user information and payment method
    if (!this.userInfo.name || !this.userInfo.address || !this.userInfo.contactNumber) {
      const alert = await this.alertController.create({
        header: 'Missing Information',
        message: 'Please fill in all required fields.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!this.selectedPaymentMethod) {
      const alert = await this.alertController.create({
        header: 'Payment Method Required',
        message: 'Please select a payment method.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.selectedPaymentMethod === 'creditCard') {
      if (!this.creditCardDetails.cardholderName || 
          !this.creditCardDetails.cardNumber || 
          !this.creditCardDetails.expirationDate || 
          !this.creditCardDetails.cvc2) {
        const alert = await this.alertController.create({
          header: 'Credit Card Information Required',
          message: 'Please fill in all credit card details.',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }
    }

    // Calculate the final price (including delivery charge)
    const finalTotal = this.totalPrice + this.deliveryCharge;

    // Save the order to history
    const order = {
      date: new Date().toISOString(),
      total: finalTotal,
      items: this.cartItems.map(item => ({
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      paymentMethod: this.selectedPaymentMethod,
      userInfo: this.userInfo, // Include user details
      deliveryCharge: this.deliveryCharge,
      creditCardDetails: this.selectedPaymentMethod === 'creditCard' ? this.creditCardDetails : null,
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
