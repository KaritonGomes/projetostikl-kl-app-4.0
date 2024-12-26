import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { IonicModule } from '@ionic/angular';

import { FormCadPage } from './form-cad.page';
import { BrMaskerModule, BrMaskDirective } from 'br-mask';

const routes: Routes = [
  {
    path: '',
    component: FormCadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BrMaskerModule,
    Ionic4DatepickerModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    BrMaskDirective
  ],
  declarations: [FormCadPage]
})
export class FormCadPageModule {}
