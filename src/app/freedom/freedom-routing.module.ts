import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FreedomPage } from './freedom.page';

const routes: Routes = [
  {
    path: '',
    component: FreedomPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FreedomPageRoutingModule {}
