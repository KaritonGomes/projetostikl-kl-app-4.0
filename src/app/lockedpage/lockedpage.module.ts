import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LockedpagePageRoutingModule } from './lockedpage-routing.module';

import { LockedpagePage } from './lockedpage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LockedpagePageRoutingModule
  ],
  declarations: [LockedpagePage]
})
export class LockedpagePageModule {}
