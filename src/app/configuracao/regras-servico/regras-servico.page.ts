import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regras-servico',
  templateUrl: './regras-servico.page.html',
  styleUrls: ['./regras-servico.page.scss'],
})
export class RegrasServicoPage implements OnInit {

  constructor(public loadingController: LoadingController) { }

  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 500,
      showBackdrop: true,
    });
    await loader.present();
  }

}
