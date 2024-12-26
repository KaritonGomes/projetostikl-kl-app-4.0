import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

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
export class RegrasService {

  constructor(public api: ApiService) { }

  fonePlantao() {
    return this.api.get('regras/fone_plantao', false, httpOptions);
  }
  regrasLocacao() {
    return this.api.get('regras/regras_locacao', false, httpOptions);
  }
  confirmaCadastro() {
    return this.api.get('regras/confirma_cadastro', false, httpOptions);
  }
  confirmaOpiniao() {
    return this.api.get('regras/confirma_opiniao', false, httpOptions);
  }
  confirmaServico() {
    return this.api.get('regras/confirma_servico', false, httpOptions);
  }
  confirmaReserva() {
    return this.api.get('regras/confirma_reserva', false, httpOptions);
  }
  confirmaSos() {
    return this.api.get('regras/app_sos', false, httpOptions);
  }

}


