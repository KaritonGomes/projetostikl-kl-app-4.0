import { ToastService } from './../../api/service/toast.service';
import { StorageService } from './../../api/service/storage.service';
import { ClienteService } from './../../api/service/cliente.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../model/shared/cliente';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.page.html',
  styleUrls: ['./endereco.page.scss'],
})
export class EnderecoPage implements OnInit {
  @ViewChild('form') form: NgForm;
  key: any;
  fonte: string;
  cli = new Cliente();

  constructor(public storageService: StorageService,
    public clienteService: ClienteService,
    public loadingController: LoadingController,
    public toast: ToastService) { }

  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 1000,
      showBackdrop: true,
    });
    await loader.present();
    this.storageService.get('clientekl').then(valor => {
      if (valor) {
        valor.cep = valor.cep;
        this.cli.logradouro = valor.logradouro;
        this.cli.numero = valor.numero;
        this.cli.complemento = valor.complemento;
        this.cli.bairro = valor.bairro;
        this.cli.localidade = valor.localidade;
        this.cli.uf = valor.uf;
        this.cli.nacionalidade = valor.nacionalidade;
        this.cli = valor;
        console.log(this.cli);
      }
    });
  }
  /**metodo para atualizar o endereco**/
  async atualizarEnd() {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 1000,
      showBackdrop: true,
    });
    await loader.present();
    if (this.cli) {
      this.clienteService.atualizar_end(this.cli).subscribe((data: any) => {
        try {
          if (data.status === true) {
            this.storageService.set('clientekl', this.cli);
            this.toast.showSucess(data.message);
            loader.dismiss();
          } else {
            loader.dismiss();
            this.toast.showError(data.message);
          }
        } catch (error) {
          loader.dismiss();
          console.log(error);
          this.toast.showError('Aconteceu algum erro ao atualizar!');
        }
      });
    } else {
      loader.dismiss();
      this.toast.showError(' preencha os campos!');
    }
  }
}
