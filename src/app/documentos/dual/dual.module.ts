import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'; 4

import { IonicModule } from '@ionic/angular';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

import { DualPage } from './dual.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

const routes: Routes = [
  {
    path: '',
    component: DualPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    FileOpener
  ],
  declarations: [DualPage]
})
export class DualPageModule { }
