import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FormsModule } from '@angular/forms';  
@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [ToolbarComponent],
})
export class SharedModule {}
