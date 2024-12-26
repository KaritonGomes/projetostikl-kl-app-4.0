import { StorageService } from './../../api/service/storage.service';
import { Component } from '@angular/core';
import { Cliente } from '../../model/shared/cliente';
import { Locacao } from '../../model/shared/locacao';
import { NotificacaoService } from '../../api/service/notificacao.service';
import { GlobalService } from 'src/app/api/service/global.service';
//import { Broadcaster } from '@awesome-cordova-plugins/broadcaster/ngx';

@Component({
  selector: 'app-notificacao-lidas',
  templateUrl: './notificacao-lidas.page.html',
  styleUrls: ['./notificacao-lidas.page.scss'],
})
export class NotificacaoLidasPage {
  public id_notif: any;
  public img: any;
  public titulo: any;
  public msg: any;
  public cliente = new Cliente();
  public locacao = new Array<Locacao>();
  public numeroNotificacao = 0;

  constructor(
    public apiNot: NotificacaoService,
    private globalService: GlobalService,
    private storageService: StorageService) {

  }

  ionViewWillEnter() {
    this.storageService.get('notificacao').then(sucess => {
      this.id_notif = sucess.id_notif;
      this.msg = sucess.mensagem;
      this.img = sucess.url_img_noti;
      this.titulo = sucess.titulo_notif;
    });

    this.storageService.get('clientekl').then((val) => {
      this.cliente = val;
      this.cliente.id = val.id;
      const params = { id_notif: this.id_notif, id_cliente: this.cliente.id, lido: '1' };
      this.apiNot.notificacaoLida(params).subscribe((data: any) => {
        if (data.status !== false) {
          console.log(data);
          this.globalService.atualizarTotalNotificacoes(data.totalAbertas);
        } else {
          console.log(data.message);
        }
      }, error => {
        console.log(error);
      });
    });
  }

}
