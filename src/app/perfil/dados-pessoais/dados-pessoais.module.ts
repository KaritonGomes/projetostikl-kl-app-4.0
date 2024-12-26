import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DadosPessoaisPage } from './dados-pessoais.page';

const routes: Routes = [
  {
    path: '',
    component: DadosPessoaisPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DadosPessoaisPage]
})
export class DadosPessoaisPageModule {}
