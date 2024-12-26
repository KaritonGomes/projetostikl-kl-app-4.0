import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-versao-app',
  templateUrl: './versao-app.page.html',
  styleUrls: ['./versao-app.page.scss'],
})
export class VersaoAppPage implements OnInit {

  constructor(public platform: Platform) { }

  ngOnInit() {
  }

  atualizar() {
    if (this.platform.is('android')) {
      window.open('https://play.google.com/store/apps/details?id=br.com.econe.kl' , '_system', 'location=yes');
    } else {
      window.open('https://itunes.apple.com/br/app/kl-rent-a-car/id1447421013?l=pt&amp;ls=1&amp;mt=8' , '_system', 'location=yes');
    }
  }
}
