import { Component, OnInit } from '@angular/core';

import { LoadingController, NavController, AlertController } from '@ionic/angular';
//import { Broadcaster } from '@awesome-cordova-plugins/broadcaster/ngx';
import { finalize } from 'rxjs/operators';
import { ClienteService } from './../../api/service/cliente.service';
import { StorageService } from './../../api/service/storage.service';
import { NotificacaoService } from '../../api/service/notificacao.service';
import { ToastService } from './../../api/service/toast.service';
import { Cliente } from '../../model/shared/cliente';
import { Locacao } from '../../model/shared/locacao';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-lista-notificacao',
  templateUrl: './lista-notificacao.page.html',
  styleUrls: ['./lista-notificacao.page.scss'],
})
export class ListaNotificacaoPage implements OnInit {

  cliente = new Cliente();
  locacao = new Array<Locacao>();
  lista = [];
  results = [];
  numeroNotificacao: any;
  limit: number = 10;
  offset: number = 0;
  url = 'https://www.youtube.com/embed/3h7hyYvfEB8';
  trustedVideoUrl: SafeResourceUrl;
  // tslint:disable-next-line: variable-name
  videos = [
    { vid_link: 'https://www.youtube.com/embed/3h7hyYvfEB8' },
    { vid_link: 'https://www.youtube.com/embed/3h7hyYvfEB8' }];
  public parametros = { start: 0, limit: 20 };
  constructor(
    private dom: DomSanitizer,
    public nav: NavController, public toast: ToastService,
    public apiNot: NotificacaoService, public clienteService: ClienteService,
    public storageService: StorageService,
    public loadingCtrl: LoadingController
  ) {

  }

  lidas(item) {
    this.storageService.set('notificacao', item);
    this.nav.navigateBack('tabs/notificacao/lidas');
    // this.nav.navigateBack(['tabs/notificacao/lidas', { dados: item, src: img, titulo: title, msg: msg }]);
  }
  ngOnInit() {
    this.storageService.get('clientekl').then((val) => {
      this.cliente = val;
      this.receberNotificao(this.cliente.id);
    });

    //  return this.dom.bypassSecurityTrustResourceUrl(this.url);

  }



  async receberNotificao(id, hideLoad = false) {
    if (hideLoad) {
      this.apiNot.receberNotificacao(id).pipe(
        finalize(() => {
          // Your code Here

        })
      ).subscribe((data: any) => {

        this.lista = data;
        if (data.status !== false) {
          //  this.lista = data;
          console.log(this.lista);
        } else {
          this.lista = [];
        }

      }, erro => {
        console.log(erro);
      });
    } else {
      const loader = await this.loadingCtrl.create({
        message: ' Notificações. Aguarde ...',
        spinner: 'crescent',
        duration: 2000,
        showBackdrop: true,
      });
      await loader.present();
      this.apiNot.receberNotificacao(id).subscribe((data: any) => {
        console.log(data);
        if (data.status !== false) {
          this.lista = data;
          loader.dismiss();
        } else {
          loader.dismiss();
          this.lista = [];
        }

      }, erro => {
        console.log(erro);
      });
    }
  }


  async arquivar(item) {
    const loader = await this.loadingCtrl.create({
      message: ' Arquivando, Aguarde ...',
      spinner: 'crescent',
      duration: 900,
      showBackdrop: true,
    });
    await loader.present();
    this.storageService.get('clientekl').then((val) => {
      this.cliente = val;
      this.cliente.id = val.id;
      const params = { id_notif: item, id_cliente: this.cliente.id, arquivo: '1' };
      this.apiNot.notificacaoArquivada(params).subscribe((data: any) => {
        if (data.status !== false) {
          this.receberNotificao(this.cliente.id, true);
          // Send event to Native
          this.toast.showSucess(data.message);
          loader.dismiss();
        } else {
          loader.dismiss();
          this.lista = [];
        }

      }, erro => {
        console.log('Erro: ' + erro.message);
      });
    });

  }


  // metodo para atualiza
  doRefresh(event) {
    this.receberNotificao(this.cliente.id);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
