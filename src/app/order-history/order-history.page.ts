import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-history',
  templateUrl: 'order-history.page.html',
  styleUrls: ['order-history.page.scss'],
})
export class OrderHistoryPage implements OnInit {
  orderHistory: any[] = [];

  constructor(private cartService: CartService, private alertController: AlertController ) {}

  ngOnInit() {
    // Retrieve order history from CartService
    this.orderHistory = this.cartService.getOrderHistory();
  }
  
  async clearOrderHistory() {
    this.orderHistory = [];
    localStorage.removeItem('orderHistory'); // Optional: Remove from localStorage if you save it there

    // Show confirmation alert
    const alert = await this.alertController.create({
      header: 'Success',
      message: 'Order history cleared.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
