import { LoadingController } from '@ionic/angular';
import { RegrasService } from './../../api/service/regras.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage  {
  fone = { fone: '', status: true };
  mensagem: any;

  constructor(public apiRegras: RegrasService, public loadingController: LoadingController) { }

 async ionViewDidEnter() {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 1000,
      showBackdrop: true,
    });
    await loader.present();
    this.resgrasLocacao(this.fone);
    this.apiRegras.confirmaSos().subscribe(data => {
      this.mensagem = data;
      console.log('regras cadastro' + data);
      loader.dismiss();
    });
  }

  resgrasLocacao(fone) {
    this.apiRegras.fonePlantao().subscribe((data: any) => {
      this.fone = data;
      try {
        if (data.status === true) {
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
}


