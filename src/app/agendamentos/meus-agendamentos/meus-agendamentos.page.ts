import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController, AlertController, LoadingController } from '@ionic/angular';

import { Geolocation } from '@capacitor/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';

import { StorageService } from 'src/app/api/service/storage.service';
import { ClienteService } from 'src/app/api/service/cliente.service';
import { Locacao } from 'src/app/model/shared/locacao';
import { LocacaoService } from 'src/app/api/service/locacao.service';
import { ToastService } from 'src/app/api/service/toast.service';

import { Subscription } from 'rxjs';

import { ServicosService } from 'src/app/api/service/servicos.service';

declare var google;
@Component({
  selector: 'app-meus-agendamentos',
  templateUrl: './meus-agendamentos.page.html',
  styleUrls: ['./meus-agendamentos.page.scss'],
})
export class MeusAgendamentosPage {
  segmento = 'lista';
  locacao = new Locacao();
  listAgenda: any;
  id: any;
  // tslint:disable-next-line:variable-name
  tipo_cliente: any;
  dados = { id_cliente: '', id_locacao: '' };

  //serviço
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  listaServico: any;
  cliente: any;
  latitude: number;
  longitude: number;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  currentMapTrack = null;
  positionSubscription: Subscription;
  dado = { id_cliente: '', id_servico: '' };
  constructor(
    private loadingController: LoadingController,
    public geolocation: Geolocation, private launchNavigator: LaunchNavigator,
    public toast: ToastService, private apiServico: ServicosService,
    private apiLoc: LocacaoService, private alertController: AlertController,
    public nav: NavController, private clienteService: ClienteService,
    private storageService: StorageService) { }

  ionViewDidEnter() {

    this.storageService.get('clientekl').then((val) => {
      this.id = val.id;
      this.tipo_cliente = val.cliente_real;
      this.buscar();
    });

    this.segmento = 'locacao';
    const position = new google.maps.LatLng(-3.105597, -60.044375);
    const mapOptions = {
      zoom: 14,
      center: position,
    };

    async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.isTracking = true;
      this.trackedRoute = [];
    };
  }

  async buscar() {
    const params = { id: this.id, tipo_cliente: this.tipo_cliente };
    this.apiLoc.listaLocacao(params).subscribe(async (data: any) => {
      if (data.status !== false) {
        this.listAgenda = data;
        console.log('lista: ' + JSON.stringify(this.listAgenda));
        // loader.dismiss();
      } else {
        this.listAgenda = [];
        // loader.dismiss();
        const alert = await this.alertController.create({
          message: 'Você não possui agendamento de locação realizados',
          buttons: ['OK']
        });
        await alert.present();
      }
    }, erro => {
      console.log('Erro: ' + erro.message);
    });
  }

  //metodo para cancelar a locacao
  async cancelarLocacao(id) {
    this.dados.id_cliente = this.id;
    this.dados.id_locacao = id;
    const forgot = await this.alertController.create({
      subHeader: 'Deseja Cancelar sua locação?',
      buttons: [
        {
          text: 'Não',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: data => {
            this.dados.id_cliente = this.id;
            this.dados.id_locacao = id;
            // logged in!
            this.apiLoc.cancelarLocacao(this.dados).subscribe((data: any) => {
              if (data.status === true) {
                this.buscar();
                this.toast.showSucess(data.message);
              } else {
                this.toast.showError(data.message);
              }
            });
            console.log('Send clicked');
          }
        }
      ]
    });
    forgot.present();
  }
  /*Metodo para serviços*/
  rotas() {
    const options: LaunchNavigatorOptions = {

      app: this.launchNavigator.APP.GOOGLE_MAPS
    };

    this.launchNavigator.navigate([-3.105597, -60.044375], options)
      .then(success => {
        console.log(success);
      }, error => {
        console.log('erro ao pegar localização', error);
      });

  }
  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }

    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }
  //metodo cancelar locação
  async cancelarServico(id) {
    this.dado.id_cliente = this.id;
    this.dado.id_servico = id;
    const forgot = await this.alertController.create({
      subHeader: 'Deseja cancelar agendamento de serviço?',
      buttons: [
        {
          text: 'Não',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: data => {
            this.dado.id_cliente = this.id;
            this.dado.id_servico = id;
            this.apiServico.cancelarServico(this.dado).subscribe((data: any) => {
              if (data.status === true) {
                this.servicosAgendados();
              } else {
                this.toast.showSucess(data.message);
              }
            });

            console.log('Send clicked');
          }
        }
      ]
    });
    await forgot.present();
  }

  async servicosAgendados() {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();
    const params = { id: this.id };
    this.apiServico.agendamentos(params).subscribe(
      async (data: any) => {
        if (data.status !== false) {
          this.listaServico = data;
          console.log(JSON.stringify(data));
          loader.dismiss();
        } else {
          this.listaServico = [];
          loader.dismiss();
          const forgot = await this.alertController.create({
            // title: 'Falha na conexão',
            buttons: [{ text: 'OK' }],
            subHeader: 'Você não possui agendamento de serviço realizados'
          });
          await forgot.present();
        }
      },
      erro => {
        console.log('Erro: ' + erro.message);
      }
    );
  }
}
