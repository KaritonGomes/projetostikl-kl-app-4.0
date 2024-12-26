import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { IonicModule } from '@ionic/angular';

import { NotificacaoBoletosPageRoutingModule } from './notificacao-boletos-routing.module';

import { NotificacaoBoletosPage } from './notificacao-boletos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    NotificacaoBoletosPageRoutingModule,
  ],
  providers: [
    Clipboard
  ],
  declarations: [NotificacaoBoletosPage]
})
export class NotificacaoBoletosPageModule { }
