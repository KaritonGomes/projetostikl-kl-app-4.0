import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetalhesAgendamentoPage } from './detalhes-agendamento.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesAgendamentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetalhesAgendamentoPage]
})
export class DetalhesAgendamentoPageModule {}
