import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController, MenuController, NavController, AlertController } from '@ionic/angular';
import { ClienteService } from '../api/service/cliente.service';
import { StorageService } from '../api/service/storage.service';
import { ToastService } from '../api/service/toast.service';
import { Storage } from '@ionic/storage-angular';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  credenciais: FormGroup;

  constructor(
    private fb: FormBuilder,
    public nav: NavController,
    public toast: ToastService,
    public clienteService: ClienteService,
    public storageService: StorageService,
    public loadingCtrl: LoadingController,
    private menuCtrl: MenuController,
    public alertController: AlertController,
    private storage: Storage // Adicione o Ionic Storage aqui

  ) {

  }

  async ngOnInit() {
    this.credenciais = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.menuCtrl.enable(false, 'interno');
    this.menuCtrl.enable(true, 'externo');
    await this.storage.create(); // Inicialize o Storage

  }

  ngOnDestroy() {
    // this.menuCtrl.enable(true);
  }
  intro() {
    this.nav.navigateForward('intro');
  }

  reservar() {
    this.nav.navigateBack('/intro');
  }

  criarConta() {
    this.nav.navigateForward('form-cad');
  }
  freedom() {
    this.nav.navigateForward('freedom');
  }
  async entrar() {
    const consentido = await this.storage.get('consentimento');

    if (!consentido) {
      const alert = await this.alertController.create({
        header: 'Consentimento de Dados',
        message: 'Para habilitar o recurso de Renovação pelo App, precisamos coletar e armazenar imagens que você fizer upload. Você pode gerenciar seus dados em minhas locações em Renovar Locação ',
        buttons: [
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {
              console.log('Usuário não consentiu.');
            }
          },
          {
            text: 'Sim',
            handler: async () => {
              await this.storage.set('consentimento', true);
              console.log('Consentimento aceito.');
              this.navegarParaProximaPagina();
            }
          }
        ]
      });

      await alert.present();
    } else {
      // Se o usuário já consentiu
      this.navegarParaProximaPagina();
    }
  }

  navegarParaProximaPagina() {
    this.nav.navigateForward('page-logar');
  
    /* this.faio.isAvailable().then(()=>{
       this.faio.show({
         title: 'Autenticacao Biométrica',
         subtitle: 'Kl Rent a Car',
         fallbackButtonTitle: 'Cancelar',
         description:' use a impressao',
         disableBackup: true, 
       }).then( async ()=>{
         alert('biometria habilitada');
         const loader = await this.loadingCtrl.create({
           message: 'Aguarde ...',
           spinner: 'crescent',
           duration: 2000,
           showBackdrop: true,
         });
         await loader.present();
         this.clienteService.loginCliente(this.credenciais.value).subscribe(
           async (sucess: any) => {
             if (sucess.status !== false) {
               this.toast.showSucess(sucess.message);
               this.storageService.set('clientekl', sucess.cliente);
               console.log(sucess.cliente);
               this.nav.navigateRoot('/tabs/home');
               await loader.dismiss();
             } else {
               await loader.dismiss();
               this.toast.showError(sucess.message);
             }
           }, error => {
             console.log(error);
           }
         );
 
       });
     }).catch((error)=>{
       alert('biometria nnao habilitada');
       this.nav.navigateForward('page-logar');
 
     })*/
    /*this.faio.show({
      title: 'Autenticacao Biométrica',
      subtitle: 'Kl Rent a Car',
      fallbackButtonTitle: 'Cancelar',
      description:' use a impressao',
      disableBackup: true

    }).then(async ()=>{
      const loader = await this.loadingCtrl.create({
        message: 'Aguarde ...',
        spinner: 'crescent',
        duration: 2000,
        showBackdrop: true,
      });
      await loader.present();
      this.clienteService.loginCliente(this.credenciais.value).subscribe(
        async (sucess: any) => {
          if (sucess.status !== false) {
            this.toast.showSucess(sucess.message);
            this.storageService.set('clientekl', sucess.cliente);
            this.nav.navigateRoot('/tabs/home');
            await loader.dismiss();
          } else {
            await loader.dismiss();
            this.toast.showError(sucess.message);
          }
        }
      );
    }).catch((error: any)=>{
      console.log("biometria nao habtilidade")
      this.nav.navigateForward('page-logar');

    })*/

  }

  goToLista() {
    this.nav.navigateRoot('/lista-termo');
  }

  goChecklist() {
    this.nav.navigateRoot('/autenticar');
  }
}
