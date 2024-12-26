import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhesLocacaoPage } from './detalhes-locacao.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesLocacaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalhesLocacaoPage]
})
export class DetalhesLocacaoPageModule {}
