import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
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

  // Register user
  register() {
    if (!this.name || !this.email || !this.password) {
      this.message = 'Both email and password are required!';
      return;
    }

    const response = this.authService.registerUser(this.name, this.email, this.password);
    this.message = response;

    if (response === 'Registration successful!') {
      setTimeout(() => {
        this.router.navigate(['/login']); // Redirect to login page
      }, 1000); // Delay for user to see the message
    }
  }
}
