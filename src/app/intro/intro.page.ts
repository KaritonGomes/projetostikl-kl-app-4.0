import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(public nav: NavController) { }

  ngOnInit() {
  }

  reservar() {
    this.nav.navigateBack('/reserva');
  }
  freedom() {
    this.nav.navigateForward('freedom');
   // this.nav.navigateForward('freedom');
  }

  criarConta() {
    this.nav.navigateForward('form-cad');
  }

  goToLista() {
    this.nav.navigateRoot('/lista-termo');
  }


}
