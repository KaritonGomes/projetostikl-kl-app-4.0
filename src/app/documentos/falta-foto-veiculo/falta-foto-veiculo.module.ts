import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FaltaFotoVeiculoPage } from './falta-foto-veiculo.page';

const routes: Routes = [
  {
    path: '',
    component: FaltaFotoVeiculoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    
  ],
  declarations: [FaltaFotoVeiculoPage]
})
export class FaltaFotoVeiculoPageModule {}
