import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regras',
  templateUrl: './regras.page.html',
  styleUrls: ['./regras.page.scss'],
})
export class RegrasPage implements OnInit {

  constructor(private loadingController: LoadingController) { }

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
