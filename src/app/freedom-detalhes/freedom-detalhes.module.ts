import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FreedomDetalhesPageRoutingModule } from './freedom-detalhes-routing.module';

import { FreedomDetalhesPage } from './freedom-detalhes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FreedomDetalhesPageRoutingModule
  ],
  declarations: [FreedomDetalhesPage]
})
export class FreedomDetalhesPageModule {}
