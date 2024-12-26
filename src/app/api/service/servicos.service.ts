import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage-angular';

import { AgendamentoServicos } from '../../model/shared/agendamento-servicos';

import { ApiService } from './api.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServicosService {

  constructor(public api: ApiService, public storage: Storage) { }


  buscarServicos(id: any) {
    const params = { id_loja: id };
    return this.api.get('servicos/tipos_servicos', params, httpOptions);
  }
  agendarServicos(data: AgendamentoServicos) {
    return this.api.post('servicos/agendar_servico', data, httpOptions);
  }

  diasDisponiveisServicos(id: string | number, idSer: any) {
    const params = { id_loja: id, id_servico: idSer };
    return this.api.get('servicos/dias_disponiveis', params, httpOptions);
  }

  horasDisponiveisServicos(id: any, data: any, idSer: any) {
    const params = { id_loja: id, data_dia: data, id_servico: idSer };
    return this.api.get('servicos/horas_disponiveis', params, httpOptions);
  }
  lojasServicos() {
    return this.api.get('servicos/lojas_servicos', false, httpOptions);
  }
  agendamentos(data?: any) {
    return this.api.get('servicos/agendamentos', data, httpOptions);
  }
  cancelarServico(data?: any) {
    return this.api.post('servicos/cancelar', data, httpOptions);
  }
  comunicado_servico() {
    return this.api.get('configuracoes/comunicado_servico_app', false, httpOptions);
  }

}

