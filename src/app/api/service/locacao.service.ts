import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LocacaoService {

  constructor(public api: ApiService, public storage: Storage) { }

  buscarLocacao(id: any) {
    return this.api.post('locacao/locacao', id, httpOptions);
  }
  reservaFreedom(id: any) {
    const params = { id: id };
    return this.api.post('freedom/buscarreserva', params, httpOptions);
  }
  salvarLocacao(data: any) {
    return this.api.post('locacao/reserva_locacao', data, httpOptions);
  }
  cancelarLocacao(data: any) {
    return this.api.post('locacao/cancelar', data, httpOptions);
  }
  listaLocacao(data: any) {
    return this.api.post('locacao/locacoes_reservadas', data, httpOptions);
  }
  listaBoleto(data: any) {
    return this.api.get('Boleto/buscaboleto', data, httpOptions);
  }
  listaPIX(data: any) {
    return this.api.get('Boleto/buscapix', data, httpOptions);
  }
  qtdBoleto(data: any) {
    return this.api.get('Boleto/buscamultacont', data, httpOptions);
  }
  listaBoletocont(data: any) {
    return this.api.get('Boleto/buscaboleto', data, httpOptions);
  }

  diasIvalidos(id: string) {
    const params = { id_loja: id };
    return this.api.get('locacao/dias_invalidos', params, httpOptions);
  }

  horaMaxima(id: string | number, dataSelecionada: string) {
    const params = { id_loja: id, data_selecionada: dataSelecionada };
    return this.api.get('locacao/lista_horas', params, httpOptions);
  }
  codigoAtivo(data: any) {
    return this.api.post('locacao/codigo_ativo', data, httpOptions);
  }

  buscar_dual(idPram: any) {
    const params = { id: idPram, novo: 'sim' };
    return this.api.get('locacao/docs', params, httpOptions);
  }
  buscar_dual_novo(idPram: any) {
    const params = { id: idPram };
    return this.api.get('locacao/docs', params, httpOptions);
  }
  buscar_Loc_Doc(idPram: any) {
    const params = { id: idPram };
    return this.api.get('locacao/docs_carro_loc', params, httpOptions);
  }
}

