import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { ClienteService } from '../api/service/cliente.service';
import { StorageService } from '../api/service/storage.service';
import { ToastService } from '../api/service/toast.service';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


interface ToggleChangeEventDetail<T = any> {
  value: T;
  checked: boolean;
}

interface ToggleCustomEvent<T = any> extends CustomEvent {
  detail: ToggleChangeEventDetail<T>;
  target: HTMLIonToggleElement;
}

@Component({
  selector: 'app-page-logar',
  templateUrl: './page-logar.page.html',
  styleUrls: ['./page-logar.page.scss'],
})


export class PageLogarPage implements OnInit {
  credenciais: FormGroup;
  passwordtype = 'password';
  cnfpasswordtype = 'password';
  cnfpasseye = 'eye';
  passeye = 'eye';

  manterLogin: boolean = true;


  constructor(
    private fb: FormBuilder,
    public alertController: AlertController,
    public nav: NavController,
    public toast: ToastService,
    public clienteService: ClienteService,
    public storageService: StorageService,
    public loadingCtrl: LoadingController) {


  }

  async ngOnInit() {

    this.credenciais = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.storageService.criarArmazenamento();

    //let verificaLogin = JSON.stringify(await this.storageService.get('lembrarLogin'));
    //this.manterLogin = (verificaLogin === 'true');
    // mantem toogle false //
    console.log(this.manterLogin);
    let emailCliente = this.manterLogin ? await this.storageService.get('emailCliente') : "";
    let senhaCliente = this.manterLogin ? await this.storageService.get('senhaCliente') : "";

    this.credenciais.setValue({
      email: emailCliente,
      senha: senhaCliente,

    })

    console.log(emailCliente, senhaCliente);


  }

  
  managePassword() {
    if (this.passwordtype === 'password') {
      this.passwordtype = 'text';
      this.passeye = 'eye-off';
    } else {
      this.passwordtype = 'password';
      this.passeye = 'eye';
    }
  }
  managecnfPassword() {
    if (this.cnfpasswordtype === 'password') {
      this.cnfpasswordtype = 'text';
      this.cnfpasseye = 'eye-off';
    } else {
      this.cnfpasswordtype = 'password';
      this.cnfpasseye = 'eye';
    }
  }
  async acessar() {
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
          await this.storageService.set('clientekl', sucess.cliente);
          let tokenFirebase: string = await this.storageService.get('token');
          
        //  alert("atualiza token" + parseInt(sucess.cliente.id) + JSON.stringify(tokenFirebase));

          if (sucess.cliente.id && tokenFirebase) {
            this.clienteService.atualizaToken({ id_cliente: parseInt(sucess.cliente.id), token: tokenFirebase }).subscribe((data: any) => {
              console.log(data);
            });
          }

          if (this.manterLogin) {
            await this.storageService.set('lembrarLogin', this.manterLogin);
            await this.storageService.set('emailCliente', this.credenciais.controls['email'].value)
            await this.storageService.set('senhaCliente', this.credenciais.controls['senha'].value);
          } else {
            await this.storageService.remove('lembrarLogin');
            await this.storageService.remove('emailCliente')
            await this.storageService.remove('senhaCliente');

          }
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
  }

  salvarSenha(evento: ToggleCustomEvent) {
    console.log(evento.detail.checked);
    this.manterLogin = evento.detail.checked

  }



  async recuperarSenha() {
    const alert = await this.alertController.create({
      header: 'Esqueceu a senha!',

      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Digite seu email',
          value: this.email.value
        }
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'alertCancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          cssClass: 'alertSuccess',
          text: 'ENVIAR',
          handler: async data => {
            const loader = await this.loadingCtrl.create({
              message: 'Aguarde ...',
              spinner: 'crescent',
              duration: 2000,
              showBackdrop: true,
            });
            await loader.present();

            if (data.email) {
              this.clienteService.recuperarSenha(data).subscribe((sucess: any) => {
                if (sucess.status !== false) {
                  this.toast.showSucess(sucess.message);
                  loader.dismiss();
                } else {
                  loader.dismiss();
                  this.toast.showError(sucess.message);
                }
              });

            } else {
              this.toast.showError(' E-mail não cadastrado !');
            }
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  criarConta() {
    this.nav.navigateForward('form-cad');
  }

  // Easy access for form fields
  get email() {
    return this.credenciais.get('email');
  }

  get senha() {
    return this.credenciais.get('senha');
  }

}
