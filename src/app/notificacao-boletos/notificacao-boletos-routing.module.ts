import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacaoBoletosPage } from './notificacao-boletos.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacaoBoletosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacaoBoletosPageRoutingModule {}
