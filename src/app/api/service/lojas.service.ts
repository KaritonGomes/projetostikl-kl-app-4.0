import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LojasService {

  constructor(public storage: Storage, public api: ApiService) { }
  //lojas/buscar


  buscarLojas(novo = false) {
    if (novo) {
      return this.api.get('lojas/buscar_novas', false, httpOptions);
    } else {
      return this.api.get('lojas/buscar', false, httpOptions);
    }

  }

  buscarPlano() {
    return this.api.get('grupo_veiculo/getPlanos', false, httpOptions);
  }
  buscarLoja() {
    return this.api.get('grupo_veiculo/getLojas', false, httpOptions);
  }
}
