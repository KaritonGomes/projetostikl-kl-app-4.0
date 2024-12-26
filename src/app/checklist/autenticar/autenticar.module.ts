import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AutenticarPage } from './autenticar.page';

const routes: Routes = [
  {
    path: '',
    component: AutenticarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, // Para trabalhar com Reactive Forms Rapha 
    RouterModule.forChild(routes)
  ],
  declarations: [AutenticarPage]
})
export class AutenticarPageModule {}
