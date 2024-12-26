import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreedomPageRoutingModule } from './freedom-routing.module';

import { FreedomPage } from './freedom.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreedomPageRoutingModule
  ],
  declarations: [FreedomPage]
})
export class FreedomPageModule {}
