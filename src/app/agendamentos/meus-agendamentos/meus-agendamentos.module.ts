import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MeusAgendamentosPage } from './meus-agendamentos.page';

const routes: Routes = [
  {
    path: '',
    component: MeusAgendamentosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MeusAgendamentosPage]
})
export class MeusAgendamentosPageModule {}
