import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
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
export class GrupoApiService {

  // tslint:disable-next-line: deprecation
  constructor(public api: ApiService, public plt: Platform, public storage: Storage) {

  }


  buscarPlano(mostra_app = 0) {
    if (mostra_app) {
      return this.api.get('grupo_veiculo/getPlanos', false, httpOptions);
    } else {
      return this.api.get('grupo_veiculo/getPlanos', false, httpOptions);
    }

  }

  getGrupos(data?: any) {
    return this.api.get('grupo_veiculo/getGrupos', data, httpOptions);
  }

  upgrade(data?: any) {
    return this.api.get('grupo_veiculo/getUpgrade', data, httpOptions);
  }

  grupo() {
    return this.api.get('grupo_veiculo/lista_grupos', false, httpOptions);
  }

  acessorios() {
    return this.api.get('grupo_veiculo/getAcessorios', false, httpOptions);
  }

  descontos(idPram: any) {
    const params = { id: idPram };
    return this.api.get('grupo_veiculo/getDesconto', params, httpOptions);
  }
}
