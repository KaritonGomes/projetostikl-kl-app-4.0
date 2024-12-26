import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LockedpagePage } from './lockedpage.page';

const routes: Routes = [
  {
    path: '',
    component: LockedpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LockedpagePageRoutingModule {}
