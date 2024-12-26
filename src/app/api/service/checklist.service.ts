import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  url: string = "https://klrentacar.com.br/sistema/api/";

  constructor(public api: ApiService, public storage: Storage, public http: HttpClient) {

  }

  pesquisarLocacao(placa_car: any) {
    return this.http.get<any>(this.url + 'checklist/pesquisar_locacao?placa_car=' + placa_car, httpOptions);
  }

  locacaoDia() {
    return this.http.get<any>(this.url + 'checklist/locacao_dia', httpOptions);
  }

  pesquisarCondutores(numero_loc: any) {
    return this.http.get<any>(this.url + 'checklist/pesquisar_condutores?numero_loc=' + numero_loc, httpOptions);
  }

  enviarImagen(data: any) {
    return this.http.post<any>(this.url + 'arquivos/upload', data, httpOptions);
  }

  salvarChecklist(data: any) {
    return this.http.post<any>(this.url + 'checklist/salvar_checklist', data, httpOptions);
  }

  login(data: any): Observable<any> {
    return this.api.post('checklist/login', data, httpOptions);
  }

  enviarEmail(data: any) {
    return this.http.post<any>(this.url + 'checklist/enviar_email', data, httpOptions);
  }

  pesquisaChecklist(id_loc: number, id_car: number, tipo_check: string) {
    return this.http.get<any>(this.url + 'checklist/pesquisa_checklist?id_loc=' + id_loc + '&id_car=' + id_car + '&tipo_check=' + tipo_check, httpOptions);
  }

  atualizarChecklist(data: any) {
    return this.http.post<any>(this.url + 'checklist/atualizar_checklist', data, httpOptions);
  }

  atualizarStatusChecklist(data: any) {
    return this.http.post<any>(this.url + 'checklist/atualiza_status_checklist', data, httpOptions);
  }

  historico_checklist(data: any) {
    return this.http.post<any>(this.url + 'checklist/historico_checklist', data, httpOptions);
  }
  buscar_avaria(id_modelo: any) {
    return this.http.get<any>(this.url + 'checklist/buscar_avarias?id_modelo=' + id_modelo, httpOptions);
  }
  salvaAtendimento(data: any): Observable<any> {
    return this.api.post('atendimento/salvar_atendimento', data, httpOptions);
  }
}
