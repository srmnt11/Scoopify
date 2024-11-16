import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router'; 
import { AlertController, NavController } from '@ionic/angular';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  featuredProducts: Product[] = [
    { id: 2, name: 'Strawberry', price: 110, image: 'assets/img/strawberry.jpg', description: 'Fresh, fruity strawberry ice cream made with real strawberries.'},
  ];

  categories = [
    { name: 'About Us', image: 'assets/about.jpg' },
    { name: 'Team', image: 'assets/team.jpg' },
    { name: 'FAQs', image: 'assets/faqs.jpg' },
    { name: 'Privacy', image: 'assets/privacy.jpg' },
  ];

  offers = [
    { title: 'Buy 1 Get 1 Free!', description: 'Get a free ice cream on every purchase of a large size!' },
    { title: '20% off on all flavors', description: 'Get 20% off on all your favorite ice cream flavors this week!' },
  ];

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController, 
  ) {}

  goToProductsPage() {
    // Navigate to the Products tab or page
    this.navCtrl.navigateForward('/tabs/products');  // Assuming the 'products' tab is part of your Ionic tabs
  }

  viewCategory(category: any) {
    switch (category.name) {
      case 'About Us':
        this.navCtrl.navigateForward('/about-us');
        break;
      case 'Team':
        this.navCtrl.navigateForward('/team');
        break;
      case 'FAQs':
        this.navCtrl.navigateForward('/faqs');
        break;
      case 'Privacy':
        this.navCtrl.navigateForward('/privacy');
        break;
      default:
        console.log('Unknown category');
    }
  }
  

  async viewOffer(offer: any) {
    const alert = await this.alertController.create({
      header: 'Offer Unavailable',
      message: 'This offer is not available anymore.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
