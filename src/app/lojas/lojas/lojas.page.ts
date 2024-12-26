import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Geolocation, Position } from '@capacitor/geolocation';
import { LojasService } from './../../api/service/lojas.service';
import { StorageService } from 'src/app/api/service/storage.service';

declare var google;

interface Marker {
  position: {
    lat: any;
    lng: number;
  };
  title: string;
}
@Component({
  selector: 'app-lojas',
  templateUrl: './lojas.page.html',
  styleUrls: ['./lojas.page.scss'],
})
export class LojasPage {

  public lista: any;
  public cliente: any;
  mapRef = null;
  destino: any;
  markers: Marker[] = [
    {
      position: {
        lat: -3.1231337,
        lng: -60.012337
      },
      title: 'kl praça 14',
    },
    {
      position: {
        lat: -3.1044403,
        lng: -60.0286301,
      },
      title: 'kl constantino',
    },
    {
      position: {
        lat: -3.0577656,
        lng: -60.0255571,
      },
      title: 'kl torquato',
    },
    {
      position: {
        lat: 2.8329867,
        lng: -60.7185925,
      },
      title: 'Boa vista - RR',
    },
  ];

  constructor(
    public apiLoja: LojasService,
    public loadingCtrl: LoadingController,
    private storageService: StorageService,
    public navCtrl: NavController) { }

  ionViewDidEnter() {
    this.buscarLoja();
    this.loadMap();
  }
  //metodo para atualiza
  doRefresh(event) {
    this.buscarLoja();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  async buscarLoja() {
    const loader = await this.loadingCtrl.create({
      message: ' Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();
    this.apiLoja.buscarLojas().subscribe(data => {
      this.lista = data;
      console.log(JSON.stringify(this.lista));
      loader.dismiss();
      if (this.lista.status === false) {
        loader.dismiss();
        this.lista = [];
      }
      // console.log(data);
    });
  }
  detalhesLojas(item) {
    this.navCtrl.navigateBack('tabs/lojas/detalhes');
    this.storageService.set('item-loja', item);
  }
  async loadMap() {
    // const loading = await this.loadingCtrl.create();
    // loading.present();
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 10
    });
    google.maps.event.addListenerOnce(this.mapRef, 'idle', () => {
      // loading.dismiss();
      this.renderMarker();
    });
  }

  renderMarker() {
    this.markers.forEach(marker => {
      this.addMaker(marker);
    });
  }

  addMaker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.mapRef,
      title: marker.title
    });
  }

  private async getLocation() {

    const coordinates = await Geolocation.getCurrentPosition();

    return {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };
  }
}
