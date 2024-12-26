import { Component, OnInit, ViewChild, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Platform, NavController, MenuController, AlertController, IonRouterOutlet } from '@ionic/angular';

import { SplashScreen, SplashScreenPlugin } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { IsDebug } from '@awesome-cordova-plugins/is-debug/ngx';

import { ClienteService } from './api/service/cliente.service';
import { StorageService } from './api/service/storage.service';
import { NotificacaoService } from './api/service/notificacao.service';
import { Cliente } from './model/shared/cliente';
import { ThemeService } from './api/service/theme.service';

import { Geolocation } from '@capacitor/geolocation';
import { FCM } from "@capacitor-community/fcm";
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public pages = [
    { title: 'Início', url: '/tabs/home', icon: 'home-outline' },
    { title: 'Nova Locação', url: '/tabs/nova-locacao/reserva', icon: 'add-circle-outline' },
    { title: 'KL Freedom - (Novo)', url: '/freedom', icon: 'create-outline' },
    { title: 'Locação', url: '/tabs/locacao', icon: 'car-sport-outline' },
    { title: 'Agendar Serviços', url: '/tabs/servico/agendar', icon: 'build-outline' },
    { title: 'Documento do Carro', url: '/tabs/documentos/dual', icon: 'folder-outline' },
    { title: 'Meu Pedido Pagamento', url: '/tabs/pagamento', icon: 'card-outline' },
    { title: 'Boletos', url: '/tabs/boletos', icon: 'barcode-outline' },
    { title: 'Perfil', url: '/tabs/perfil', icon: 'person-outline' },
    { title: 'Contratos e Termos', url: '/tabs/termo/tabs-termo', icon: 'book-outline' },
    { title: 'Forma de Pagamento', url: '/tabs/regulamento-deposito', icon: 'wallet-outline' },
    { title: 'Contatos', url: '/tabs/contatos', icon: 'call-outline' },
    { title: 'Rota até a Revise', url: '/tabs/diversos/rota', icon: 'location-outline' },

  ];

  public externoPages = [];

  public imagems = '';
  public imagem: string;
  public key: any;
  public cliente = new Cliente();
  loginMenu = { email: '', senha: '', token_fb: '', token_cli: '' };
  public alertShown = false;
  // set up hardware back button event.
  public lastTimeBackPress = 0;
  public timePeriodToExit = 2000;
  public numberVersion: any;
  public numeroNotificacao = 0;
  public versao: any = 17760;
  lastBack: any;
  backButtonSubscription;
  cli: any;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;



  constructor(
    public theme: ThemeService,
    private platform: Platform,
    private router: Router,
    private menu: MenuController,
    private clienteService: ClienteService,
    private apiNot: NotificacaoService,
    private appVersion: AppVersion,
    public alertController: AlertController,
    public nav: NavController,
    public storageService: StorageService,
    private isDebug: IsDebug,
  ) {
    this.initializeApp();
  }


  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.pages.map(p => {
          return p['active'] = (event.url === p.url);
        });
      }
    });

  }

  carregaCliente() {
    this.storageService.get('clientekl').then(cli => {
      this.cliente.nome = cli.nome_cli;
    });
  }

  ngOnDestroy() { }

  async initializeApp() {
    console.log('logado inicial')
    await this.storageService.criarArmazenamento();


    this.platform.ready().then(() => {

      this.theme.tema_app().subscribe((data: any) => {
        this.theme.setTheme(data);
      });

      const setStatusBarStyleLight = async () => {
        await StatusBar.setStyle({ style: Style.Default });
      };

      async () => {
        await SplashScreen.hide();
      }
      try {
        this.verificaVersao();
      } catch (error) {
        console.log(error);
      }

      this.carregarApp();

      this.storageService.get('clientekl').then(async usuario => {
        if (usuario) {
          this.cliente = usuario;
          console.log(this.cliente);
          this.cliente.id = usuario.id;
          this.cliente.nome = usuario.nome;
          this.loginMenu.email = usuario.email;
          this.loginMenu.token_cli = usuario.token;
          await this.buscarFoto(this.cliente.id);
          await this.buscarNotificacoes(this.cliente.id);
        }
      });
    });
    try {
     this.tokenFcm();
    } catch (error) {
      alert(error);
    }
    // });
  }

  async verificaVersao() {
    await this.appVersion.getVersionCode().then(async data => {
      this.versao = data;
      await this.clienteService.verificaVersao().subscribe(async (sucess: any) => {

        if (data < sucess) {
          this.nav.navigateRoot('/versao-app');

        }
      });
    }, error => console.log(error)
    );

  }

  // metodo para verficicar a versao do app
  async carregarApp() {


    let user = await this.storageService.get('clientekl')
    if (user) {
      console.log('logado');
      this.cliente = user;
      this.cliente.id = user.id;
      this.cliente.nome = user.nome;
      this.loginMenu.email = user.email;
      this.loginMenu.token_cli = user.token;
      this.nav.navigateRoot('tabs/home');
      this.buscarNotificacoes(this.cliente.id);
      this.buscarFoto(this.cliente.id);
      //this.pegaLocalizacao(this.cliente.id);
      this.nav.navigateRoot('tabs/home');
      this.menu.enable(true, 'interno');
      this.menu.enable(false, 'externo');
    } else {
      console.log(' nao logado', user);

      this.menu.enable(false, 'interno');
      this.menu.enable(true, 'externo');
      this.nav.navigateRoot('/login');
    }



  }

  async onMenuOpen() {
    await this.storageService.get('clientekl').then(user => {
      this.cliente = user;
      this.cliente.id = user.id;
      this.cliente.nome = user.nome;
      this.loginMenu.email = user.email;
      this.loginMenu.token_cli = user.token;
    });
  }


  // metodo de adiciona so alguns carcteres
  substr = function (size, value) {
    if (value && value.length > size) {
      return value.substr(0, value.indexOf(' '));
    }
    return value;
  };

  login() {
    this.clienteService.loginCliente(this.loginMenu).subscribe((data: any) => {
      if (data.status === false) {
        this.storageService.remove('clientekl');
        this.nav.navigateForward('/login');
        this.menu.close('interno');
      }
    });
  }




  tokenFcm() {
    PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    PushNotifications.addListener('registration', async (token: Token) => {
      this.storageService.set('token', token.value);
      let user = await this.storageService.get('clientekl');
      console.log('token recuperado: ' + JSON.stringify(token.value));

      this.clienteService.cadastroToken(token.value, this.versao).subscribe((result: any) => {
        if (result.status !== false) {
          console.log(result);
          console.log(user);

          if (user !== undefined) {

            this.clienteService.atualizaToken({ id_cliente: user.id, token: token.value }).subscribe((data: any) => {
              console.log(data);
            });
          }
        } else {
          console.log(result.message);
          // this.toast.showError(result.message);
        }
      }, error => {
        console.log(error);
      });
    });

    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Notificação Recebida: ' + notification.body);
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Notificação Recebida: ' + notification.notification.body);
      },
    );



    FCM.getToken().then(async (token: any) => {

    })


    this.subscribeToPushNotifications();
  }

  subscribeToPushNotifications() {

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log(notification);
        this.storageService.get('clientekl').then(cliente => {
          this.buscarNotificacoes(cliente.id);
        });
      }).catch(
        error => {
          //console.log(error)
        }
      );

    FCM.subscribeTo({ topic: 'marketing' }).then(Response => {
      console.log(Response);
    }).catch(error => {
      //console.log(error)
    }
    );
    FCM.subscribeTo({ topic: 'avisos' }).then(Response => {
      console.log(Response);
    }).catch(error => {
      // console.log(error)
    }
    );
    this.isDebug.getIsDebug().then(isDebug => {
      FCM.subscribeTo({ topic: 'testepush' }).then(Response => {
        console.log(Response);
      }).catch(error => {
        console.log(error)
      }
      );
    });
  }


  logout() {

    this.storageService.remove('clientekl').then(() => {
      this.nav.navigateRoot('/login');
      this.menu.close();
      this.menu.close('interno');
    });

  }
  perfil() {
    this.nav.navigateRoot('tabs/perfil');
    this.menu.close();
  }
  async buscarFoto(idDliente: any) {
    await this.clienteService.buscarFotoPerfil(idDliente).subscribe((data: any) => {
      this.imagem = data;
      console.log(this.imagem);
    });
  }
  // metodo para decrementar uma nototificacao
  buscarNotificacoes(idCliente: any) {
    this.apiNot.notificacaoAberta(idCliente).subscribe((data: any) => {
      if (data.status !== false) {
        this.numeroNotificacao = data;
      } else {
        console.log(data.message);
      }
    });
  }

  async pegaLocalizacao(idCli) {

    const coordenadas = await Geolocation.getCurrentPosition();

    const localizacao = {
      id_cli: idCli,
      latitude: coordenadas.coords.latitude,
      longitude: coordenadas.coords.longitude
    };

    console.log(localizacao);
    this.clienteService.salvaLocalizacao(localizacao).subscribe(data => {
      console.log(data);
    });

  }


  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
          this.routerOutlet.pop();
        } else if (this.router.url === '/tabs/home') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
            navigator['app'].exitApp(); // work for ionic 4
          } else {
            this.presentAlertConfirm();
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }

  // message
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar Saida!',
      message: 'Message <strong>Você quer sair do aplicativo?</strong>!!!',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'sim',
          handler: () => {
            console.log('Confirm Okay');
            // this.platform.exitApp();
            navigator['app'].exitApp(); // work for ionic 4
          }
        }
      ]
    });

    await alert.present();
  }

}
