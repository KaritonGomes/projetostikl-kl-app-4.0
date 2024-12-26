import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { LocacaoService } from './../../api/service/locacao.service';
import { Locacao } from '../../model/shared/locacao';
import { StorageService } from 'src/app/api/service/storage.service';

@Component({
  selector: 'app-detalhes-locacao',
  templateUrl: './detalhes-locacao.page.html',
  styleUrls: ['./detalhes-locacao.page.scss'],
})
export class DetalhesLocacaoPage implements OnInit {
  contrato: any;
  locacao = new Locacao();
  id_car: any;
  constructor(
    public loadingController: LoadingController,
    private storageService: StorageService,
    public apiLoc: LocacaoService) {

  }

  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Detalhes. Aguarde ...',
      spinner: 'crescent',
      translucent: true,
      showBackdrop: true,
      duration: 500
    });
    await loader.present();
    this.storageService.get('loc').then(valor => {
      loader.dismiss();
      this.locacao.id_Loc = valor.id_Loc;
      this.id_car = valor.id_car;
      // alert(this.id_car);
      this.locacao.modelo_car = valor.modelo_car;
      this.locacao.ano_car = valor.ano_car;
      this.locacao.placa_car = valor.placa_car;
      this.locacao.dataLoc = valor.dataLoc;
      this.locacao.dataPrev = valor.dataPrev;
      this.locacao.carroDiaria = valor.carroDiaria;
      this.locacao.kmInicial = valor.kmInicial;
      this.locacao.kmFinal = valor.kmFinal;
      this.locacao.valorAmortizado = valor.valorAmortizado;
      // console.log('ok' + JSON.stringify(valor));
    });

  }
  async dual() {
    const loading = await this.loadingController.create({
      message: 'Carregando...',
      duration: 3000
    });
    await loading.present();
    let id = this.id_car;
    this.apiLoc.buscar_dual(id).subscribe((data: any) => {
      if (data.status === false) {
        alert('Em breve o documento do carro estará disponível');
      } else {
        console.log(data);
        // tslint:disable-next-line: max-line-length
        Browser.open({ url: data, windowName: '_system' });
      }
    });
  }
}

