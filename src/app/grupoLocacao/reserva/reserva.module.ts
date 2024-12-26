import { PipesModule } from 'src/app/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Ionic4DatepickerModule } from '@logisticinfotech/ionic4-datepicker';

import { ReservaPage } from './reserva.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaPage
  }
];

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    Ionic4DatepickerModule,
    RouterModule.forChild(routes),
    PipesModule,
  ],
  declarations: [ReservaPage]
})
export class ReservaPageModule { }
