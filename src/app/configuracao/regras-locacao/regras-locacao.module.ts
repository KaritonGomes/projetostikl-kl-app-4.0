import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegrasLocacaoPage } from './regras-locacao.page';

const routes: Routes = [
  {
    path: '',
    component: RegrasLocacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegrasLocacaoPage]
})
export class RegrasLocacaoPageModule {}
