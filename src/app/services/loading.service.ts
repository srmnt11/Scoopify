// src/app/services/loading.service.ts
import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: any;

  constructor(private loadingController: LoadingController) {}

  async showLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'custom-splash-loading', // Apply custom class
      spinner: null, // Remove spinner
      duration: 3000, // Adjust duration if needed
    });

    // Present the loading screen
    await this.loading.present();

    // Set custom HTML with your logo
    this.loading.innerHTML = `
      <div class="splash-container">
        <img src="assets/img/scoopify-logo.png" alt="Logo" class="splash-logo">
         <ion-spinner name="crescent" class="splash-spinner"></ion-spinner>
      </div>
    `;
  }

  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}
