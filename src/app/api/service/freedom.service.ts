import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
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

  export class FreedomService{

    constructor( public api: ApiService, public storage: Storage){}
    DadosCarro() {
      return this.api.post('freedom/buscarcarro',false, httpOptions);
    }
    carrosFreedom() {
        return this.api.get('freedom/buscarcarro',false, httpOptions);
      }
    buscaAno(id: any){
      return this.api.get('freedom/buscaroano', id, httpOptions);

    }
    buscaKm(){
      return this.api.get('freedom/buscarcarrokm', false, httpOptions);
    }

  }