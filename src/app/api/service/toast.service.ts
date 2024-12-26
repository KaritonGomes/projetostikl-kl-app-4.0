import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastController) { }
  showSucess(message: string) {
     this.show(message, 'success', 'sucesso');
  }

  showError(message: string) {
    this.show(message, 'danger', 'erro');
    }

  private async show(message: string, color: string, header: string ) {
    const toast = await this.toast.create({
      // header: header,
       message: message,
       color: color,
       position: 'middle',
       duration: 3000,
    });
    toast.present();
  }

 async showServico(message: string, color: string, header: string ) {
    const toast = await this.toast.create({
      // header: header,
       message: message,
       color: color,
       position: 'middle',
       duration: 3000,
    });
    toast.present();
  }
  async presentErro() {
    const toast = await this.toast.create({
      message: 'Algum erro aconteceu.',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
  async presentSenha() {
    const toast = await this.toast.create({
      message: 'Senha não confere com a confirmação!.',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
  async presentCampo() {
    const toast = await this.toast.create({
      message: 'Por favor preencher todos os campos para fazer a reserva de locação',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
  async Erroinesperado() {
    const toast = await this.toast.create({
      message: 'Erro inesperado',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }
}

