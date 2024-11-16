import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: { name: string, email: string; password: string }[] = [];
  private currentUser: any = null;

  constructor() {
    // Load users and current user from localStorage if available
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser) {
      this.currentUser = JSON.parse(storedCurrentUser);
    }
  }

  // Register a new user and save to localStorage
  registerUser(name: string, email: string, password: string): string {
    // Check if the email is already registered
    const userExists = this.users.some(user => user.email === email);
    if (userExists) {
      return 'User already exists!';
    }

    // Register the new user
    this.users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(this.users)); // Save users to localStorage

    return 'Registration successful!';
  }

  // Login user and save the current user to localStorage
  loginUser(name: string, email: string, password: string): string {
    // Validate credentials
    const user = this.users.find(user => user.email === email && user.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser)); // Save current user to localStorage
      return 'Login successful!';
    }
    return 'Invalid credentials!';
  }

  // Logout user and remove current user from localStorage
  logoutUser() {
    this.currentUser = null;
    localStorage.removeItem('currentUser'); // Remove current user from localStorage
  }

  // Check if the user is authenticated by checking the currentUser
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Get the current logged-in user's details
  getCurrentUser(): any {
    return this.currentUser || null;
  }

  updateUserProfile(userProfile: any) {
    // Here, you can update the profile in localStorage or make an API call
    this.currentUser = { ...userProfile }; // Example: update the current user object
    // You can also store it in localStorage if required
    localStorage.setItem('userProfile', JSON.stringify(this.currentUser));
  }

  // Clear all users (useful for testing or resetting)
  clearAllUsers() {
    this.users = [];
    localStorage.removeItem('users');
  }
}
