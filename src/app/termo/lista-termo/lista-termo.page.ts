import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';

import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-lista-termo',
  templateUrl: './lista-termo.page.html',
  styleUrls: ['./lista-termo.page.scss'],
})
export class ListaTermoPage {

  constructor(public nav: NavController) { }

  ionViewDidEnter() { }

  async manaulUsuario() {
    // tslint:disable-next-line:max-line-length
    await Browser.open({ url: 'https://klrentacar.com.br/sistema/assets/manual.pdf', windowName: '_system' });
  }
  async adesao() {
    // tslint:disable-next-line:max-line-length
    await Browser.open({ url: 'https://klrentacar.com.br/sistema/assets/contrato_adesao.pdf', windowName: '_system' });
  }
  async privacidade() {
    // tslint:disable-next-line:max-line-length
    await Browser.open({ url: 'https://klrentacar.com.br/sistema/assets/politicakl.pdf', windowName: '_system' });
  }
  async termoUsuario() {
    await Browser.open({ url: 'https://klrentacar.com.br/sistema/assets/termokl.pdf', windowName: '_system' });
  }

  fidelidade() {
    this.nav.navigateRoot('/fidelidade-externo');
  }
}
