import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, Platform } from '@ionic/angular';

import { AmortizacaoService } from './../../api/service/amortizacao.service';
import { ClienteService } from './../../api/service/cliente.service';
import { StorageService } from './../../api/service/storage.service';
import { LocacaoService } from '../../api/service/locacao.service';
import { Locacao } from '../../model/shared/locacao';
import { Cliente } from 'src/app/model/shared/cliente';
import { ServicosService } from '../../api/service/servicos.service'



@Component({
  selector: 'app-locacao',
  templateUrl: './locacao.page.html',
  styleUrls: ['./locacao.page.scss'],
})
export class LocacaoPage {
  listaLocacoes = new Array<Locacao>();
  locacao = new Locacao();
  avisos = new Array();
  loading: any;
  lista = new Array();
  locacaoAberta = false;
  public cliente = new Cliente();
  servicosAgendados = [];



  teste = { id: 0 };
  constructor(
    public plt: Platform, private loadingController: LoadingController,
    public nav: NavController, private alertController: AlertController,
    private apiLoc: LocacaoService, private clienteService: ClienteService,
    private storageService: StorageService, private servicoService: ServicosService,
    private apiAmort: AmortizacaoService) { }


  ionViewWillEnter() {
    this.getLocacacao();
    console.log(this.cliente.id);
    
  }
  async ngOnInit() {
    this.cliente = await this.storageService.get('clientekl');
  this.getServicosAgendados();
  console.log(this.cliente);
    
 

  }

  detalhes(loca: Locacao) {
    this.nav.navigateBack(['/tabs/locacao/detalhes', { loc: loca }]);
    this.storageService.set('loc', loca);
  }
  async getLocacacao() {
    const loader = await this.loadingController.create({
      message: 'Buscando locação. Aguarde ...',
      cssClass: 'my-custom-class',
      spinner: 'crescent',
      showBackdrop: true,
    });
    this.storageService.get('clientekl').then(async cliente => {
      if (cliente.id !== null) {
        await loader.present();
        this.apiLoc.buscarLocacao(cliente).subscribe((data: any) => {
          if (data.status !== false) {
            this.lista = data;
            console.log('locacao buscada', this.lista)
            this.locacaoAberta = true;
            loader.dismiss();
          } else {
            loader.dismiss();
            this.lista = [];
            this.locacaoAberta = false;
          }
        });
      }
    });
    this.locacaoAberta = false;
  }
  getServicosAgendados() {
    const params = { id: this.cliente.id };
    this.servicoService.agendamentos(params).subscribe((data: any) => {
      if (data.status === false) {
        //alert(data.message);
      } else {
        this.servicosAgendados = data;
        console.log('minha locacao', this.servicosAgendados);
      }
    }, error => {
      console.log(error);
    });
  }
  

  // teste
  async verificarDependencias(idLocacao, loc) {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      showBackdrop: true,
    });
    await loader.present();
    this.apiAmort.verificarPendencias(idLocacao).subscribe(async (data: any) => {
      console.log('dados locacao', data);


   

      if (data.status !== false) {
        this.storageService.set('locacao', loc);
    
        
        this.tipoPagamento();
        loader.dismiss();
      } else {
        loader.dismiss();
        const alert = await this.alertController.create({
          // header: 'Confirm!',
          message: data.message,
          buttons: [
            {
              text: 'OK',
              role: 'cancel',
              cssClass: 'alertDanger',
              handler: (blah) => {
                console.log('Confirm Cancel: blah');
              }
            }
          ]
        });
        await alert.present();
      }
    });
  }

  async tipoPagamentoFreedom() {
    const alerts = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tipo de pagamento',
      // tslint:disable-next-line: max-line-length
      message: '<strong>Lembramos que todos os depósito bancário terão que ser feito 2(dois) dias antes do vencimento do contrato de locação.</strong>',
      buttons: [
        {
          text: 'Depósito',
          handler: (blah) => {
            console.log('Confirm Okay');
            let tipo = 'deposito';
            localStorage.setItem('tipo_pag', tipo);
            this.nav.navigateBack('tabs/cartao/tipo-pagamento-fotos');
          }
        }
      ]
    });

    await alerts.present();
  }





  async tipoPagamento() {
    const alerts = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tipo de pagamento',
      // tslint:disable-next-line: max-line-length
      message: '<strong>Lembramos que todos os depósito bancário terão que ser feito 2(dois) dias antes do vencimento do contrato de locação.</strong>',
      buttons: [
        {
          text: 'Cartão Crédito',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
            this.nav.navigateBack('tabs/cartao/tipo-pagamento-credito');
          }
        }, {
          text: 'Depósito',
          handler: (blah) => {
            console.log('Confirm Okay');
            let tipo = 'deposito';
            localStorage.setItem('tipo_pag', tipo);
            this.nav.navigateBack('tabs/cartao/tipo-pagamento-fotos');
          }
        }
      ]
    });

    await alerts.present();
  }

  // metodo para atualiza
  atualiza(refresher: { complete: () => void; }) {
    this.getLocacacao();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  // metodo para atualiza
  doRefresh(event) {
    this.getLocacacao();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
