import { RegrasService } from './../../api/service/regras.service';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regras-locacao',
  templateUrl: './regras-locacao.page.html',
  styleUrls: ['./regras-locacao.page.scss'],
})
export class RegrasLocacaoPage implements OnInit {

  regras = {status: true , regras: '' };
  cliente: any;

  constructor(public loadingController: LoadingController, public api: RegrasService) { }

   ngOnInit() {
    this.resgrasLocacao(this.regras);
  }
  async resgrasLocacao(regras) {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 500,
      showBackdrop: true,
    });
    await loader.present();

    this.api.regrasLocacao().subscribe((data: any) => {
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
