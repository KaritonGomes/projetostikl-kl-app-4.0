import { ToastService } from './../api/service/toast.service';
import { Component } from '@angular/core';
import { MenuController, AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { Cliente } from '../model/shared/cliente';
import { Locacao } from '../model/shared/locacao';
import { ServicosService } from '../api/service/servicos.service';
import { AmortizacaoService } from '../api/service/amortizacao.service';
import { LocacaoService } from '../api/service/locacao.service';
import { ThemeService } from '../api/service/theme.service';
import { StorageService } from './../api/service/storage.service';
import { ApiFreedom } from '../service-freedom/api-freedom';
import { ClienteService } from 'src/app/api/service/cliente.service';
import { Alert } from 'selenium-webdriver';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public cliente = new Cliente();
  public list: Cliente[] = [];
  public badgeNumber: number;
  public numeroNotificacao: any;
  servicosAgendados = [];
  locacoesReservadas = [];
  listaBoletos = [];
  listaLocacoes = [];
  listaFreedom: any = [];
  listaPagamento = [];
  listaServico: any;
  lojasServicos: any;
  dataSelecionada: Date;
  locacao = new Locacao();
  listaIndicados = [];
  AmigoIndicado = [];

  slideOpts = {
    slidesPerView: 3,
    freeMode: true,
    spaceBetween: 10,
  };



  listaMenu: Array<any> = [
    { icon: "car-outline", text: "Teste 1" },
    { icon: "card-outline", text: "Teste 2" },
    { icon: "time-outline", text: "Teste 3" },
    { icon: "briefcase-outline", text: "Teste 4" }
  ]


  dados = { id_cliente: 0, id_locacao: '', id_servico: '' };

  constructor(
    public nav: NavController, public theme: ThemeService,
    public alertController: AlertController, public menuCtrl: MenuController,
    private storageService: StorageService, private servicoService: ServicosService,
    private locacaoService: LocacaoService, private amortizacaoService: AmortizacaoService,
    public toastService: ToastService, private provider: ApiFreedom,
    public loadingCtrl: LoadingController,
    private clienteService: ClienteService, private toast: ToastController,
    public clipboard: Clipboard


  ) {


  }


  ionViewDidEnter() {

    this.menuCtrl.enable(false, 'externo');
    this.menuCtrl.enable(true, 'interno');
    this.storageService.get('clientekl').then((data: any) => {
      if (data) {
        this.cliente.id = data.id;
        this.getServicosAgendados();
        this.getLocacoesReservadas();
        this.getBoleto();
        this.getLocacoes();
        this.pagamentoAprovado(this.cliente.id);
        this.theme.tema_app().subscribe((data: any) => {
          this.theme.setTheme(data);
          //  console.log('cor',JSON.parse(data));
          console.log(data);
          this.buscaFreedom();
        });
      }
    });

    // this.getIndicados();

  }

  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      message: ' Aguarde ...',
      spinner: 'crescent',
      duration: 500,
      //showBackdrop: true,
    });
    await loader.present();

    this.cliente = await this.storageService.get('clientekl');

    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      (token: Token) => {
        // alert('Push registration success, token: ' + token.value);
        console.log(token.value);
      }
    );

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      }
    );

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

    // Method called when tapping on a notification
    PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );



  }




  // PROMOCÃO INDIQUE E GANHE

  async indicarAmigo() {
    const alert = await this.alertController.create({
      message: `<img src=../../assets/imgs/indicou.png>`,
      cssClass: 'alert-wrapper',
      header: 'INDIQUE UM AMIGO!',

      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Digite o Email',

        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data: any) => {
            console.log('Confirm Cancel', data);
          },
        },
        {
          text: 'Indicar',
          handler: async (data) => {
            const loading = await this.loadingCtrl.create({
              message: 'Por favor, espere...',
              duration: 2000,
              backdropDismiss: true
            });
            await loading.present();
            console.log('dado sendo enviado', data);
            console.log('id usuarios sendo enviado', this.cliente.id);

            this.clienteService.indicacao(this.cliente.id, data.email).subscribe((data: any) => {

              try {
                if (data.status === true) {
                  console.log(data.message);
                  this.toastService.showSucess(data.message);
                  this.AmigoIndicado = data;
                } else {
                  this.toastService.showError(data.message);
                }

              } catch (error) {
                console.log('error: ' + error);
              }
            });

          },
        },
      ],
    });

    await alert.present();


  }

  // Busca o amigo indicado

  async getIndicados() {
    const loader = await this.loadingCtrl.create({
      message: ' Aguarde ...',
      spinner: 'crescent',
      duration: 500,
      //showBackdrop: true,

    });
    console.log('id do indicador', this.cliente.id);
    await loader.present();
    this.clienteService.indicados(this.cliente.id).subscribe((data: any) => {
      if (data.status === false) {
        console.log(data.message);
      } else {
        this.listaIndicados = data.dados_acesso;
        console.log('lista dos indicados', this.listaIndicados);
      }
    }, error => {
      console.log(error)
    });

    this.ionViewDidEnter();
  }




  getLocacoes() {
    const params = { id: this.cliente.id };
    this.locacaoService.buscarLocacao(params).subscribe((data: any) => {
      console.log('locacao', data);
      if (data.status === false) {
        console.log(data.message);
      } else {
        this.listaLocacoes = data;
        //console.log(this.listaLocacoes);
      }
    }, error => {
      console.log(error);
    });
  }
  buscaFreedom() {
    return new Promise(resolve => {
      let dados = {
        id: this.cliente.id
      }
      console.log(dados);
      this.provider.dadosApi(dados, 'freedom/buscarreserva').subscribe((data) => {
        console.log(data);
        this.listaFreedom = data;
        if (this.listaFreedom.status === 0) {
          console.log('status', this.listaFreedom.status);
        }

      });
    });

  }


  getServicosAgendados() {
    const params = { id: this.cliente.id };
    this.servicoService.agendamentos(params).subscribe((data: any) => {
      if (data.status === false) {
        //alert(data.message);
      } else {
        this.servicosAgendados = data;
        console.log('meus servicos', this.servicosAgendados);
      }
    }, error => {
      console.log(error);
    });
  }

  getLocacoesReservadas() {
    const params = { id: this.cliente.id };
    this.locacaoService.listaLocacao(params).subscribe((data: any) => {
      if (data.status === false) {
        console.log(data.message);
      } else {
        this.locacoesReservadas = data;
        console.log('reservas', this.locacoesReservadas);
      }
    }, error => {
      console.log(error);
    });
  }
  getBoleto() {
    const params = { id: this.cliente.id };
    this.locacaoService.listaBoleto(params).subscribe((data: any) => {
      if (data.status === false) {
        console.log(data.message);
      } else {
        this.listaBoletos = data;
        console.log('boletos', this.listaBoletos);
      }
    }, error => {
      console.log(error);
    });
  }


  pagamentoAprovado(id_cliente) {
    this.amortizacaoService.pagamento_aprovado(id_cliente).subscribe((data: any) => {
      try {
        if (data.status !== false) {
          this.listaPagamento = data;
          // console.log(this.listaPagamento);
        } else {
          this.listaPagamento = [];
        }
      } catch (error) {
        console.log('error: ' + error);
      }
    });
  }
  async cancelarLocacao(id) {
    this.dados.id_cliente = this.cliente.id;
    this.dados.id_locacao = id;
    const forgot = await this.alertController.create({
      subHeader: 'Deseja Cancelar sua locação?',
      buttons: [
        {
          text: 'Não',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: data => {
            this.dados.id_cliente = this.cliente.id;
            this.dados.id_locacao = id;
            // logged in!
            this.locacaoService.cancelarLocacao(this.dados).subscribe((data: any) => {
              if (data.status === true) {
                this.toastService.showSucess(data.message);
                this.ionViewDidEnter();
              } else {
                this.toastService.showError(data.message);
              }
            });
            console.log('Send clicked');
          }
        }
      ]
    });
    forgot.present();
  }
  async cancelarServico(id) {
    this.dados.id_cliente = this.cliente.id;
    this.dados.id_servico = id;
    const forgot = await this.alertController.create({
      subHeader: 'Deseja cancelar agendamento de serviço?',
      buttons: [
        {
          text: 'Não',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: data => {
            this.dados.id_cliente = this.cliente.id;
            this.dados.id_servico = id;
            this.servicoService.cancelarServico(this.dados).subscribe((data: any) => {
              if (data.status === true) {
                this.ionViewDidEnter();
              } else {
                this.toastService.showSucess(data.message);
              }
            });
            this.mensagem();
            console.log('Send clicked');

          }
        }
      ]
    });
    await forgot.present();
  }
  async mensagem() {
    const alert = await this.loadingCtrl.create({
      message: 'Foi Cancelado com Sucesso',
      spinner: 'crescent',
      duration: 1000,
      //showBackdrop: true,
    });

    await alert.present();

  }

  detalheServico(item) {
    this.nav.navigateBack('/tabs/servico/detalhes');
    this.storageService.set('item', item);
  }
  detalheLocacao(item) {
    this.nav.navigateBack('/tabs/locacao/detalhes-agendamento');
    this.storageService.set('agendamento-item', item);
  }
  doRefresh(event) {
    this.ionViewDidEnter();
    setTimeout(() => {
      this.theme.tema_app().subscribe((data: any) => {
        this.theme.setTheme(data);
        //  console.log('cor',JSON.parse(data));
        console.log(data);
      });
      event.target.complete();
    }, 2000);
  }
  async copyData(boleto: any) {
    this.clipboard.copy(boleto);
    console.log(boleto);

    const alert = await this.loadingCtrl.create({
      message: 'Codigo de Barras Copiado com Sucesso',
      spinner: 'crescent',
      duration: 1000,
      //showBackdrop: true,
    });

    await alert.present();

  }
}
