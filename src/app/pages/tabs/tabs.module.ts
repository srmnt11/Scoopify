// src/app/pages/tabs/tabs.module.ts
import { IonicModule } from '@ionic/angular';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { TabsPage } from './tabs.page';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    TabsPageRoutingModule  // Make sure this is here
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
