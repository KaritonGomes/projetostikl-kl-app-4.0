import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/api/service/storage.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage {

  loja: any;
  id: any;
  placa: any;
  data_agen: any;
  modelo: any;
  cor: any;
  grupo: any;
  motivo_cancel: any;
  status: any;
  hora: any;
  constructor(
    private storageService: StorageService
  ) { }

  ionViewDidEnter() {

    this.storageService.get('item').then((dados: any) => {
      this.id = dados.id_agen_ser;
      this.placa = dados.placa_car;
      this.data_agen = dados.data_agendamento;
      this.grupo = dados.nome_grupo_car;
      this.modelo = dados.modelo_car;
      this.cor = dados.cor_car;
      this.loja = dados.titulo_loj_app;
      this.motivo_cancel = dados.motivo_cancelamento;
      this.status = dados.status_agen_serv;
      this.hora = dados.hora_agendamento;
      console.log(this.hora);
    });

  }

}
