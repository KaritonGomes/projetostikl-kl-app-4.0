import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController) { }

  async  presentCpf() {
    const alert = await this.alertController.create({
     // header: '',
      message: `<img src="assets/imgs/logokl.gif" /> <br /><b>Seu CPF já está em uso ou inválido entre e contato conosco.</b>
      <strong>Junto a KL Rent a Car.</strong>`,
      buttons: ['OK']
    });
    return await alert.present();
  }

  async  showAlert() {
    const alert = await this.alertController.create({
     message: `<img src="assets/imgs/logokl.gif" /> <br /><strong>Preencher o cpf válido.</strong>`,
      buttons: ['OK']
    });
    return await alert.present();
  }

  async  presentEmail() {
    const alert = await this.alertController.create({
     message: `<img src="assets/imgs/logokl.gif" /> <br /><strong>Seu E-mail já está cadastrado vá em recuperar senha.</strong>`,
      buttons: ['OK']
    });
    return await alert.present();
  }

  async presentEmailSenha() {
    const alert = await this.alertController.create({
     message: `<img src="assets/imgs/logokl.gif" /> <br /><strong>As senhas não confere. Tente novamente !</strong>`,
      buttons: ['OK']
    });
    return await alert.present();
  }
  async presentEmailNot() {
    const alert = await this.alertController.create({
      message: `<img src="assets/imgs/logokl.gif" /> <br /><strong>Os e-mail não confere. Tente novamente !</strong>`,
      buttons: ['OK']
    });
    return await alert.present();
  }

  async  presentAlert() {
    const alert = await this.alertController.create({
      header: 'Agendamento de Serviço',
      subHeader: 'Para fazer um agendamento de serviço você precisa ter uma locação em aberto.',
     // message: 'This is an alert message.',
      buttons: ['OK']
    });
    return await alert.present();
  }


  async  showErro() {
    const alert = await this.alertController.create({
     // header: 'Hora',
     // subHeader: 'Para fazer um agendamento de serviço você precisa ter uma locação em aberto.',
      message: 'Não foi possível solicitar serviço de locação. Tente novamente.',
      buttons: ['OK']
    });
    return await alert.present();
  }

  async  showServico() {
    const alert = await this.alertController.create({
     // header: 'Hora',
     // subHeader: 'Para fazer um agendamento de serviço você precisa ter uma locação em aberto.',
      message: 'Você não possui agendamento de serviço realizados.',
      buttons: ['OK']
    });
    return await alert.present();
  }

  async showKm() {
    const alert = await this.alertController.create({
     header: 'QUILOMETRAGEM',
        message: ' <b>Insira a quilometragem atual</b>',
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

  async showFotos() {
    const alert = await this.alertController.create({
      header: 'Pôr favor!',
      message: 'Preencher todas as fotos.',
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
}

