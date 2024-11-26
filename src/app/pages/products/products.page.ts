import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';  // Importing AuthService
import { Router } from '@angular/router'; 
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  menuTitle ='/assets/img/scoopify-logo.png';
  menuContent = '';
  pageTitle = '/assets/img/scoopify-logo.png';
  pageContent = 'Welcome to the home page.';

  products: Product[] = [
    { id: 1, name: 'Caramel', price: 120, image: 'assets/img/saltedcaramel.jpg', description: 'A rich, creamy caramel ice cream with a hint of sea salt.'},
    { id: 2, name: 'Strawberry', price: 110, image: 'assets/img/strawberry.jpg', description: 'Fresh, fruity strawberry ice cream made with real strawberries.'},
    { id: 3, name: 'Chocolate', price: 100, image: 'assets/img/chocolate.jpg', description: 'Classic chocolate ice cream for chocolate lovers.'},
    { id: 4, name: 'Vanilla', price: 90, image: 'assets/img/vanilla.jpg', description: 'A smooth and creamy classic with rich vanilla bean flavor, perfect for any occasion.'},
    { id: 5, name: 'Coffee Almond', price: 150, image: 'assets/img/coffeealmondfudge.jpg', description: 'Bold coffee ice cream paired with crunchy almond pieces for a delightful texture and taste combination.'},
    { id: 6, name: 'Cookie n Cream', price: 140, image: 'assets/img/chocolatechipcookiedough.jpg', description: 'Creamy vanilla ice cream filled with chunks of chocolate cookie, delivering the perfect blend of crunch and creaminess.'},
    { id: 7, name: 'Rocky Road', price: 130, image: 'assets/img/rockyroad.jpg', description: 'Decadent chocolate ice cream loaded with marshmallows and almonds, a classic combination for a satisfying treat.'},
    { id: 8, name: 'Cheese', price: 160, image: 'assets/img/cheese.jpg', description: 'A sweet and savory fusion that blends the smoothness of ice cream with the distinct taste of real cheese.'},
    { id: 9, name: 'Avocado', price: 170, image: 'assets/img/avocado.jpg', description: 'Rich and buttery, this ice cream brings the natural creaminess of ripe avocados to a refreshing, unique dessert'},
    { id: 10, name: 'Blueberry', price: 180, image: 'assets/img/blueberrycheesecake.jpg', description: 'A luxurious mix of blueberry and cheesecake flavors in one, capturing the essence of a classic dessert.' },
  ];

  // Store the IDs of products already added to the cart
  addedToCart: Set<number> = new Set();

  constructor(
    private cartService: CartService,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController  
  ) {}

  openProductDetails(product: Product) {
    this.navCtrl.navigateForward(['/product-details', product.id]);
  }

  ngOnInit() {
    // Subscribe to cart updates to ensure the button state is updated when the cart changes
    this.cartService.cart$.subscribe(cart => {
      // Reset the addedToCart set whenever the cart is updated
      this.addedToCart.clear();
      cart.forEach(item => {
        this.addedToCart.add(item.product.id);
      });
    });
  }

  async addToCart(product: Product) {
    // Check if the user is authenticated before adding the product to the cart
    if (!this.authService.isAuthenticated()) {
      // Show alert if the user is not logged in
      const alert = await this.alertController.create({
        header: 'Not Logged In',
        message: 'You must be logged in to add products to the cart. Please log in or register.',
        buttons: [
          {
            text: 'Log In',
            handler: () => {
              this.goToLoginPage();  // Navigate to the login page
            }
          },
          {
            text: 'Cancel',
            role: 'cancel'
          }
        ]
      });
      await alert.present();
      return;  // Prevent adding product to the cart
    }

    // Prevent adding the product again if it's already in the cart
    if (this.addedToCart.has(product.id)) {
      return;
    }

    console.log('Adding product to cart', product);
    this.cartService.addToCart(product);
    this.addedToCart.add(product.id);  // Mark the product as added

    // Create and show success alert
    const alert = await this.alertController.create({
      header: 'Product Added',
      message: `${product.name} has been added to your cart.`,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Navigate to the login page (you can modify this to your route for login)
  goToLoginPage() {
    this.router.navigate(['/login']);  
  }

  // Check if the product is already in the cart
  isAddedToCart(product: Product): boolean {
    return this.addedToCart.has(product.id);
  }

  
}
