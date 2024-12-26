import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

import { Observable } from 'rxjs';

import { ApiService } from './api.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor(public api: ApiService, public storageService: Storage) { }


  buscarAvisos(idPram: any) {
    const params = { id: idPram };
    return this.api.get('aviso/avisos', params, httpOptions);
  }

  receberNotificacao(idPram: any): Observable<any> {
    const params = { id: idPram };
    return this.api.get('aviso/notificacoes', params, httpOptions);
  }

  notificacaoAberta(idPram: any) {
    const params = { id: idPram };
    return this.api.get('aviso/abertas', params, httpOptions);
  }
  boletoAberta(idPram: any) {
    const params = { id: idPram };
    return this.api.get('Boleto/buscamultacont', params, httpOptions);
  }

  notificacaoLida(data: any) {
    return this.api.post('aviso/lidas', data, httpOptions);
  }
  notificacaoArquivada(data: any) {
    return this.api.post('aviso/arquiva', data, httpOptions);
  }

}
