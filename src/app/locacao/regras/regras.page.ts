import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RegrasService } from '../../api/service/regras.service';

@Component({
  selector: 'app-regras',
  templateUrl: './regras.page.html',
  styleUrls: ['./regras.page.scss'],
})
export class RegrasPage implements OnInit {
   regras = {status: true , regras: ''};
   cliente: any;

  constructor(public apiRegra: RegrasService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.resgrasLocacao(this.regras);
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
    });
  }
}
