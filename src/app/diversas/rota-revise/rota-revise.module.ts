import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RotaRevisePage } from './rota-revise.page';

const routes: Routes = [
  {
    path: '',
    component: RotaRevisePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RotaRevisePage]
})
export class RotaRevisePageModule {}
