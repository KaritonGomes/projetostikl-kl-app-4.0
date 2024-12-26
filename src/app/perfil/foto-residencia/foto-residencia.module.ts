import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FotoResidenciaPage } from './foto-residencia.page';


const routes: Routes = [
  {
    path: '',
    component: FotoResidenciaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FotoResidenciaPage],
  providers: [],
})
export class FotoResidenciaPageModule { }
