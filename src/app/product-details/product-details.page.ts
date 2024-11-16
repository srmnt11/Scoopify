import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { AlertController } from '@ionic/angular';  
import { AuthService } from 'src/app/services/auth.service';  
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product: Product | undefined;
  addedToCart: Set<number> = new Set();  // To track added products

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router  // Inject Router
  ) {}

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.getProductById(productId);

    // Subscribe to cart updates to track added items
    this.cartService.cart$.subscribe(cart => {
      this.addedToCart.clear();  // Clear existing set
      cart.forEach(item => this.addedToCart.add(item.product.id));
    });
  }

  // Function to get the product by ID
  getProductById(id: number): Product | undefined {
    const products: Product[] = [
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
    return products.find(product => product.id === id);
  }

  async addToCart() {
    // Check if the product and product ID are defined
    if (this.product && typeof this.product.id === 'number') {
      // Proceed with adding the product to the cart
      if (!this.authService.isAuthenticated()) {
        const alert = await this.alertController.create({
          header: 'Not Logged In',
          message: 'You must be logged in to add products to the cart. Please log in or register.',
          buttons: [
            {
              text: 'Log In',
              handler: () => {
                this.goToLoginPage();
              }
            },
            {
              text: 'Cancel',
              role: 'cancel'
            }
          ]
        });
        await alert.present();
        return;
      }
  
      // Prevent adding the product again if it's already in the cart
      if (this.addedToCart.has(this.product.id)) {
        const alert = await this.alertController.create({
          header: 'Already in Cart',
          message: `${this.product.name} is already in your cart.`,
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
  
      this.cartService.addToCart(this.product);
      this.addedToCart.add(this.product.id);  // Mark the product as added
  
      // Show success alert
      const alert = await this.alertController.create({
        header: 'Product Added',
        message: `${this.product.name} has been added to your cart.`,
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      console.error('Product or product ID is undefined');
    }
  }  
  // Check if the product is added to the cart
isAddedToCart(): boolean {
  return typeof this.product?.id === 'number' && this.addedToCart.has(this.product.id);
}
  // Navigate to the login page
  goToLoginPage() {
    this.router.navigate(['/login']);  // Navigate using the Router
  }
}
