import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: any[] = [];

  constructor(
    private cartService: CartService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cartService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  async confirmOrderReceived(order: any) {
    // Show confirmation alert
    const alert = await this.alertController.create({
      header: 'Confirm Order Receipt',
      message: 'Are you sure you received your order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Order receipt canceled');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            // Ensure the order and items exist before updating
            if (order && order.items && Array.isArray(order.items)) {
              order.isReceived = true; // Mark the order as received
              this.cartService.updateOrderStatus(order); // Update order status in the service
              console.log('Order received confirmed');
            } else {
              console.error('Invalid order structure:', order);
            }
          }
        }
      ],
    });

    await alert.present();
  }
}
