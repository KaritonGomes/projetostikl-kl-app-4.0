import { Injectable, NgZone } from '@angular/core';
import { NotificacaoService } from './notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public numeroNotificacao: any;
  public numeroBoleto: any;

  constructor(private ngZone: NgZone,
    private apiNot: NotificacaoService) { }

  buscarTotalNotificacoes(idCliente: any) {
    this.ngZone.run(() => {
      this.apiNot.notificacaoAberta(idCliente).subscribe((data: any) => {
        if (data.status !== false) {
          this.numeroNotificacao = data;
          console.log(data);
        } else {
          console.log(data.message);
        }
      });
    });
  }
  buscarBoleto(idCliente: any) {
    this.ngZone.run(() => {
      this.apiNot.boletoAberta(idCliente).subscribe((data: any) => {
        if (data.status !== false) {
          this.numeroBoleto = data;
          console.log(data);
        } else {
          console.log(data.message);
        }
      });
    });
  }

  atualizarTotalNotificacoes(qtdNotificacao) {
    this.ngZone.run(() => {
      this.numeroNotificacao = qtdNotificacao;
    });
  }
}
