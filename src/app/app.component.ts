import { Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Platform } from '@ionic/angular';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {

  constructor(
    private loadingService: LoadingService,
    private platform: Platform
  ) {}

  async ngOnInit() {
    this.platform.ready().then(async () => {
      // Show the loading screen after the splash screen
      await this.loadingService.showLoading();
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
