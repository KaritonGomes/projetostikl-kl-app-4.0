import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

//import { FileUploadModule } from 'ng2-file-upload';

import { FotoPerfilPage } from './foto-perfil.page';


const routes: Routes = [
  {
    path: '',
    component: FotoPerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //FileUploadModule,
    HttpClientModule,
    RouterModule.forChild(routes),

  ],
  declarations: [FotoPerfilPage]
})
export class FotoPerfilPageModule { }
