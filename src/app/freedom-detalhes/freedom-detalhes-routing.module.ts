import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreedomDetalhesPage } from './freedom-detalhes.page';

const routes: Routes = [
  {
    path: '',
    component: FreedomDetalhesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreedomDetalhesPageRoutingModule {}
