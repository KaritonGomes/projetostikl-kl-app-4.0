import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { GrupoApiService } from 'src/app/api/service/grupo-api.service';
import { StorageService } from 'src/app/api/service/storage.service';

@Component({
  selector: 'app-detalhes-carro',
  templateUrl: './detalhes-carro.component.html',
  styleUrls: ['./detalhes-carro.component.scss'],
})
export class DetalhesCarroComponent implements OnInit {
  lista = {
    img: '', cor: '', combustivel: '', direcao: '',
    portas_car: '', cambio: '', opcionais_car: ''
  };
  constructor(
    public apiGrupo: GrupoApiService,
    private storageService: StorageService,
    public popover: PopoverController) { }

  ngOnInit() {
    this.storageService.get('detalhes-carro').then(dados => {
      // console.log(JSON.stringify(dados));
      this.lista.img = dados.link_image;
      this.lista.cor = dados.cor_car;
      this.lista.combustivel = dados.combustivel_car;
      this.lista.direcao = dados.direcao_car;
      this.lista.portas_car = dados.portas_car;
      this.lista.cambio = dados.cambio_car;
      this.lista.opcionais_car = dados.opcionais_car;

    });
  }
  close() {
    this.popover.dismiss();
  }
}
