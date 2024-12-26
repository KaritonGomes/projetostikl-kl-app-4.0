import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';
import { LojasService } from 'src/app/api/service/lojas.service';
import { StorageService } from 'src/app/api/service/storage.service';

declare var google;

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage {
  @ViewChild('map') mapElement: ElementRef;
  lojas: any;
  map: any;
  device: any;
  lat: any;
  long: any;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  currentMapTrack = null;

  constructor(
    public lojasService: LojasService,
    private storageService: StorageService,
    public geolocation: Geolocation,
    private launchNavigator: LaunchNavigator) {



  }

  ionViewDidEnter() {
    this.storageService.get('item-loja').then((dados: any) => {
      this.lojas = dados.titulo_loj_app;
      this.lat = dados.latitude;
      this.long = dados.longitude;
      const position = new google.maps.LatLng(this.lat, this.long);
      const mapOptions = {
        zoom: 14,
        center: position,
        disableDefaultUI: true
      };
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      const marker = new google.maps.Marker({
        title: 'Nossa Loja',
        position: position,
        map: this.map,
        animation: google.maps.Animation.DROP, // BOUNCE
        icon: 'assets/imgs/market.png',
      });

      async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        this.lat = coordinates.coords.latitude;
        this.long = coordinates.coords.longitude;
        // aqui vai entrar o tracker router
        this.isTracking = true;
        this.trackedRoute = [];
      }

    });
  }


  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }

    if (path.length > 1) {
      this.currentMapTrack = new google.maps.Polyline({
        path,
        geodesic: true,
        strokeColor: '#ff00ff',
        strokeOpacity: 1.0,
        strokeWeight: 3
      });
      this.currentMapTrack.setMap(this.map);
    }
  }
  rotas() {
    const options: LaunchNavigatorOptions = {
      // start:[ this.latitude,this.longitude],
      app: this.launchNavigator.APP.GOOGLE_MAPS
    };
    this.launchNavigator.navigate([this.lat, this.long], options)
      .then(success => {
        console.log(success);
      }, error => {
        console.log('erro ao pegar localização', error);
      });
  }
}
