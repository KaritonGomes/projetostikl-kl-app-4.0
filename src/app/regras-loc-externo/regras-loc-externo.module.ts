import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RegrasLocExternoPage } from './regras-loc-externo.page';

const routes: Routes = [
  {
    path: '',
    component: RegrasLocExternoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegrasLocExternoPage]
})
export class RegrasLocExternoPageModule {}
