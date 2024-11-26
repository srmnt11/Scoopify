import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Platform } from '@ionic/angular';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  showToolbar: boolean = true;

  constructor(
    private loadingService: LoadingService,
    private platform: Platform,
    private router: Router
  ) {}

  async ngOnInit() {
    this.platform.ready().then(async () => {
      // Show the loading screen after the splash screen
      await this.loadingService.showLoading();
    });

    // Subscribe to route changes to update toolbar visibility
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateToolbarVisibility(event.url);
      }
    });
  }

  updateToolbarVisibility(url: string) {
    // Define routes or patterns where the toolbar should be hidden
    const hideToolbarRegexes = [
      /^\/product-details\/\d+$/,
      /^\/order-history$/,  
      /^\/about-us$/,
      /^\/team$/,
      /^\/faqs$/,
      /^\/privacy$/,
      /^\/checkout$/,
      /^\/login$/,
      /^\/register$/,
      /^\/contact-us$/,
    ];

    // Update toolbar visibility based on the current URL
    this.showToolbar = !hideToolbarRegexes.some((regex) => regex.test(url));
    console.log('Current URL:', url, 'Show Toolbar:', this.showToolbar); // Debugging log
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
