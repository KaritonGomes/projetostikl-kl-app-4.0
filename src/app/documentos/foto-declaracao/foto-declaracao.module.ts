import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FotoDeclaracaoPage } from './foto-declaracao.page';

const routes: Routes = [
  {
    path: '',
    component: FotoDeclaracaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FotoDeclaracaoPage]
})
export class FotoDeclaracaoPageModule {}
