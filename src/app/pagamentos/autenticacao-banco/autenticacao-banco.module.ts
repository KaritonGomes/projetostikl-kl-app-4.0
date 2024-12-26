import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AutenticacaoBancoPage } from './autenticacao-banco.page';

const routes: Routes = [
  {
    path: '',
    component: AutenticacaoBancoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AutenticacaoBancoPage]
})
export class AutenticacaoBancoPageModule {}
