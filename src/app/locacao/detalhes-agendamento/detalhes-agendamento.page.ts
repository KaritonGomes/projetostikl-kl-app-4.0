import { Component, OnInit } from '@angular/core';
import { LocacaoService } from 'src/app/api/service/locacao.service';
import { StorageService } from 'src/app/api/service/storage.service';

@Component({
  selector: 'app-detalhes-agendamento',
  templateUrl: './detalhes-agendamento.page.html',
  styleUrls: ['./detalhes-agendamento.page.scss'],
})
export class DetalhesAgendamentoPage {
  loja: any;
  id: any;
  placa: any;
  data_agen: any;
  desc_grupo_car: any;
  seguro_escolhido: any;
  cor: any;
  grupo: any;
  motivo_cancel: any;
  categoria: any;
  hora: any;
  status: any;
  nome_cli: any;
  constructor(
    private locacaoService: LocacaoService,
    private storageService: StorageService
  ) { }

  ionViewDidEnter() {
    this.storageService.get('agendamento-item').then((dados: any) => {

      this.grupo = dados.nome_grupo_car;
      this.data_agen = dados.data_retirada;
      this.loja = dados.titulo_loj;
      this.desc_grupo_car = dados.desc_grupo_car;
      this.seguro_escolhido = dados.seguro_escolhido;
      this.categoria = dados.categoria;
      this.hora = dados.hora_retirada;
      this.motivo_cancel = dados.motivo_cancelamento;
      this.status = dados.status;
      this.nome_cli = dados.nome_cli;
      // console.log(this.status);
      console.log(dados);
    });
  }

}
