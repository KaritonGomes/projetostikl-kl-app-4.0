import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-tipo-pagamento-credito',
  templateUrl: './tipo-pagamento-credito.page.html',
  styleUrls: ['./tipo-pagamento-credito.page.scss'],
})
export class TipoPagamentoCreditoPage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }
  async baixarDeclaracao() {
    await Browser.open({
      url: 'http://klrentacar.com.br/sistema/assets/carta_de_autorizacao_cartao.pdf',
      windowName: '_system'
    });
  }

  prosseguir(tipo) {
    localStorage.setItem('tipo_pag', tipo);
    this.nav.navigateBack('tabs/cartao/tipo-pagamento-fotos');
  }
}

