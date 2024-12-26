import { ToastService } from './../../api/service/toast.service';
import { Cliente } from './../../model/shared/cliente';
import { ClienteService } from './../../api/service/cliente.service';
import { StorageService } from './../../api/service/storage.service';
import { AmortizacaoService } from './../../api/service/amortizacao.service';
import { Component, } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

import * as moment from 'moment';


@Component({
  selector: 'app-lista-pagamentos',
  templateUrl: './lista-pagamentos.page.html',
  styleUrls: ['./lista-pagamentos.page.scss'],
})
export class ListaPagamentosPage {
  listaPag: any = [];
  cliente = new Cliente();
  tempoRestante: any;
  duracao: any;
  expirado = false;
  cancelado = false;
  contagemRegressiva: any;

  idLoc: any;
  idPed: any;
  constructor(
    public toastService: ToastService,
    public loadingCtrl: LoadingController,
    public clienteService: ClienteService,
    public storageService: StorageService,
    public amortizacaoProv: AmortizacaoService,
    public navCtrl: NavController) {
  }

  segmentButtonClicked(ev: any) {
    console.log('Segment button clicked', ev);
  }
  irLocacao() {
    this.navCtrl.navigateRoot('tabs/locacao');
  }
  listaPagamento() {
    this.navCtrl.navigateRoot('tabs/home');
  }
  faltaFotoVeiculo(item) {
    this.navCtrl.navigateBack(['tabs/documentos/veiculo/:idPedido', { idPedido: item }]);
  }
  faltaDeclaracao(pedido: any, loc: any) {
    this.navCtrl.navigateBack(['tabs/documentos/fotoDeclare/:idPedido', { idPedido: pedido, idLoc: loc }]);
  }

  ionViewDidEnter() {
    this.storageService.get('clientekl').then(val => {
      this.cliente = val;
      this.cliente.id = val.id;
      this.todosPagementos(this.cliente.id);
    });
  }

  async todosPagementos(id_cliente) {
    this.amortizacaoProv.todosPagamento(id_cliente).subscribe((data: any) => {
      try {
        if (data.status !== false) {
          this.listaPag = data;
          //console.log( this.listaPag);
          // this.finalizarTempo(data[1].days, data[1].h, data[1].m, data[1].s);
        } else {
          this.listaPag = [];
        }
      } catch (error) {
        console.log('error: ' + error);
      }
    });
  }

  finalizarTempo(dias, horas, minutos, segundos) {
    const x = setInterval(() => {
      this.tempoRestante = (dias + 'd ' + horas + 'h ' + minutos + 'm ' + segundos + 's ');
      console.log(this.tempoRestante);

      if (this.tempoRestante < 0) {
        clearInterval(x);
        this.expirado = true;
      }
    }, 1000);
  }



  finalizarPag(id_locacao, pedido) {
    this.idLoc = id_locacao;
    const params = { id_locacao: this.idLoc, id_pedido: pedido, id_cliente: this.cliente.id };
    this.amortizacaoProv.continuar_deposito(params).subscribe((data: any) => {
      if (data.status !== false) {
        this.navCtrl.navigateForward(['tabs/pagamento/cartao', { id: id_locacao, id_pedido: pedido, cartao: 'debito' }]);
      } else {
        this.toastService.showError(data.message);
      }
    }, error => {
      console.log(error);
    });
  }
  substr = function (size, value) {
    if (value && value.length > size) {
      return value.substr(0, value.indexOf(' '));
    }
    return value;
  };

  pad(numero: any, length: number) {
    let myString = '' + numero;
    while (myString.length < length) {
      myString = '0' + myString;
    }
    return myString;
  }

  formartarHora(data) {
    return moment(data).format('YYYYMMDD');
  }
  atualiza(event) {
    this.storageService.get('clientekl').then(val => {
      this.cliente = val;
      this.cliente.id = val.id;
      this.todosPagementos(this.cliente.id);
    });
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 500);
  }
}
/*
   // metodo gerado para contar o tempo de duração da avaliação
  tempozizador(dataEncerramento: any, timeAtual: any) {
    const countDownDate = new Date(dataEncerramento).getTime();
    let horaLocal = timeAtual;
    // Update the count down every 1 second
    const x = setInterval(() => {
      const nowTime = new Date(horaLocal);
      const now = nowTime.getTime();
      const hora =  moment(nowTime).add(1, 'seconds');

      // Find the distance between now and the count down date
      const distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const tempo =  this.pad(days, 1) + 'd:' + this.pad(hours, 2) + ':' + this.pad(minutes, 2) + ':' + this.pad(seconds, 2);
      this.tempoRestante = tempo;
      horaLocal = hora.toDate();
      if (this.tempoRestante === '00:00:00' || this.tempoRestante < '00:00:00') {
       // this.nav.navigateRoot('/lances');
        //alert('FINALIZADO PARA DAR LANCE');
      }
      // If the count down is over, write some texto
      if (distance < 0) {
        clearInterval(x);
        this.expirado = true;
      }
      console.log(this.expirado);
    }, 1000);
  }

*/