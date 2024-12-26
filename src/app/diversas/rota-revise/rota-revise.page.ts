import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@awesome-cordova-plugins/launch-navigator/ngx';

declare var google;

@Component({
  selector: 'app-rota-revise',
  templateUrl: './rota-revise.page.html',
  styleUrls: ['./rota-revise.page.scss'],
})
export class RotaRevisePage implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  device: any;
  APP: any;
  lista: any;
  latitude: number;
  longitude: number;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  currentMapTrack = null;

  constructor(
     private launchNavigator: LaunchNavigator,) {
  }

  //
  ngOnInit() {
    const position = new google.maps.LatLng(-3.105597, -60.044375);
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
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.isTracking = true;
      this.trackedRoute = [];
    }
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
}
