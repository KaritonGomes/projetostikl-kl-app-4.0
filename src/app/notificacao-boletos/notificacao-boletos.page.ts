import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';

import { StorageService } from './../api/service/storage.service';
import { Cliente } from '../model/shared/cliente';
import { LocacaoService } from '../api/service/locacao.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-notificacao-boletos',
  templateUrl: './notificacao-boletos.page.html',
  styleUrls: ['./notificacao-boletos.page.scss'],
})

export class NotificacaoBoletosPage implements OnInit {
  public cliente = new Cliente();

  public list: Cliente[] = [];
  listaBoletos = [];
  constructor(
    public loadingCtrl: LoadingController,
    private storageService: StorageService, private locacaoService: LocacaoService,
    public alertController: AlertController, public menuCtrl: MenuController,
    public clipboard: Clipboard

  ) {

  }
  ionViewDidEnter() {

    this.menuCtrl.enable(false, 'externo');
    this.menuCtrl.enable(true, 'interno');
    this.storageService.get('clientekl').then((data: any) => {
      if (data) {
        this.cliente.id = data.id;
        this.getBoleto();


      }
    });

    // this.getIndicados();

  }

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      message: ' Aguarde ...',
      spinner: 'crescent',
      duration: 500,
      //showBackdrop: true,
    });
    await loader.present();

    this.cliente = await this.storageService.get('clientekl');
  }


  getBoleto() {
    const params = { id: this.cliente.id };
    this.locacaoService.listaBoleto(params).subscribe((data: any) => {
      if (data.status === false) {
        console.log(data.message);
      } else {
        this.listaBoletos = data;
        console.log('boletos', this.listaBoletos);
      }
    }, error => {
      console.log(error);
    });
  }

  async copyData(boleto: any) {
    this.clipboard.copy(boleto);
    console.log(boleto);

    const alert = await this.loadingCtrl.create({
      message: 'Codigo de Barras Copiado com Sucesso',
      spinner: 'crescent',
      duration: 1000,
      //showBackdrop: true,
    });

    await alert.present();

  }

}
