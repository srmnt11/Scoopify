import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() menuTitle: string = '';
  @Input() menuContent: string = '';
  @Input() pageTitle: string = '';
  @Input() pageContent: string = '';

  isEditing: boolean = false;
  userProfile = {
    name: 'User',
    email: '',
    profilePicture: 'assets/user.png'  // Placeholder for profile picture
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController // Inject AlertController
  ) {}

  ngOnInit() {
    if (this.isAuthenticated()) {
      const user = this.authService.getCurrentUser();
      if (user) {
        this.userProfile.email = user.email;
        this.userProfile.name = user.name || 'User';
      }
    }
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();  // Check if user is logged in
  }

  // Toggle edit mode
  editProfile() {
    this.isEditing = !this.isEditing;
  }

  async saveProfile() {
    const alert = await this.alertController.create({
      header: 'Confirm Save',
      message: `Are you sure you want to save changes to your profile?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Save profile canceled');
          }
        },
        {
          text: 'Save',
          handler: () => {
            this.authService.updateUserProfile(this.userProfile); // Call your service to save data
            this.isEditing = false; // Exit editing mode
          }
        }
      ]
    });
  
    await alert.present();
  }

  // Navigate to order history page
  viewOrderHistory() {
    this.router.navigate(['/order-history']);
  }

  // Present alert when user clicks log out
  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Logout canceled');
          }
        },
        {
          text: 'Log Out',
          handler: () => {
            this.logOut(); // Call the logOut method if confirmed
          }
        }
      ]
    });

    await alert.present();
  }

  // Log out the user
  logOut() {
    // Call the AuthService to clear user data
    this.authService.logoutUser();  // Clears user authentication data

    // Optional: Clear additional user-related data from local storage or session storage
    localStorage.removeItem('userData');  // Example of clearing local storage data
    sessionStorage.removeItem('userData'); // Example for session storage

    // Optionally, redirect the user to a "Goodbye" page or a home page after logout
    this.router.navigate(['/login']); // Navigate to the login page
  }

  // Navigate to login page (for users who are not logged in)
  goToLoginPage() {
    this.router.navigate(['/login']);
  }
  
  goToContactUs() {
    this.router.navigate(['/contact-us']);
  }
}

