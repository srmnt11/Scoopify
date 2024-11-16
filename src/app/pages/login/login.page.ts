import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  name = '';
  email = '';
  password = '';
  message = '';
  passwordVisible = false;  // Flag for toggling password visibility

  constructor(private authService: AuthService, private router: Router) {}

  // Toggle password visibility
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Login user
  login() {
    if (!this.email || !this.password) {
      this.message = 'Both email and password are required!';
      return;
    }

    const response = this.authService.loginUser(this.name, this.email, this.password);  // Assuming loginUser is a method in AuthService
    this.message = response;

    if (response === 'Login successful!') {
      setTimeout(() => {
        this.router.navigate(['/tabs/home']); // Redirect to home page or dashboard
      }, 1000); // Delay for user to see the message
    }
  }
}
