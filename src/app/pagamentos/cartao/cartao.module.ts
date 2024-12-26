import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CartaoPage } from './cartao.page';
import { BrMaskerModule, BrMaskDirective } from 'br-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { SignaturePadModule } from 'angular2-signaturepad';

const routes: Routes = [
  {
    path: '',
    component: CartaoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    BrMaskerModule,
    NgxCurrencyModule,
    SignaturePadModule,
  ],
  providers: [
    BrMaskDirective
  ],
  declarations: [CartaoPage]
})
export class CartaoPageModule {}
