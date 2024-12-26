import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { BrMaskerModule, BrMaskDirective } from 'br-mask';

import { SeguroExternoPage } from './seguro-externo.page';



const routes: Routes = [
  {
    path: '',
    component: SeguroExternoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ionic4DatepickerModule,
    BrMaskerModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [ BrMaskDirective ],
  declarations: [SeguroExternoPage]
})
export class SeguroExternoPageModule {}
