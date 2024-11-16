import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';  // Assuming you have a Product model
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';  // Import the Router to navigate

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
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

  filteredProducts: Product[] = [];
  searchQuery: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.filteredProducts = this.products;  // Initially, show all products
  }

  // Search functionality for filtering products
  searchProducts() {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = this.products;  // Show all if search query is empty
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())  // Case insensitive search
      );
    }
  }

  // Method to view product details
  viewProductDetails(productId: number) {
    this.router.navigate(['/product-details', productId]);  // Navigate to product-details.page with the product ID
  }
}
