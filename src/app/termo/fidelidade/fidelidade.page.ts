import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fidelidade',
  templateUrl: './fidelidade.page.html',
  styleUrls: ['./fidelidade.page.scss'],
})
export class FidelidadePage implements OnInit {

  constructor(public loadingController: LoadingController) { }

 async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 1000,
      showBackdrop: true,
    });
    await loader.present();
  }

}
