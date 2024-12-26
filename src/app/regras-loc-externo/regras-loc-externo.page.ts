import { MenuController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RegrasService } from '../api/service/regras.service';

@Component({
  selector: 'app-regras-loc-externo',
  templateUrl: './regras-loc-externo.page.html',
  styleUrls: ['./regras-loc-externo.page.scss'],
})
export class RegrasLocExternoPage implements OnInit {
  regras = {status: true , regras: ''};
  cliente: any;

  constructor(public menuCtrl: MenuController, public apiRegra: RegrasService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.resgrasLocacao(this.regras);
    this.menuCtrl.enable(false, 'interno');
    this.menuCtrl.enable(true, 'externo');
  }
 async resgrasLocacao(regras) {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 1000,
      showBackdrop: true,
    });
    await loader.present();
    this.apiRegra.regrasLocacao().subscribe((data: any) => {
       this.regras = data;
      if (data.status === true) {
        loader.dismiss();
        console.log(data);
      }
    });
    error => {
      loader.dismiss();
      console.log(error);
    };
  }
}