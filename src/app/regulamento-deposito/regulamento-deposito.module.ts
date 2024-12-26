import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegulamentoDepositoPage } from './regulamento-deposito.page';

const routes: Routes = [
  {
    path: '',
    component: RegulamentoDepositoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegulamentoDepositoPage]
})
export class RegulamentoDepositoPageModule {}
