import { NavController } from '@ionic/angular';
import { ToastService } from './../../api/service/toast.service';
import { ClienteService } from './../../api/service/cliente.service';
import { StorageService } from './../../api/service/storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../model/shared/cliente';


@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage implements OnInit {

  @ViewChild('form') form: NgForm;
  public confirmarSenha: any;
  cliente = new Cliente();
  passwordtype: string = 'password';
  cnfpasswordtype: string = 'password';
  atualpasswordtype: string = "password";

  cnfpasseye: string = 'eye';
  passeye: string = 'eye';
  atualpasseye: string = "eye";

  constructor(public clienteService: ClienteService,
    public toast: ToastService, public storageService: StorageService,
    public nav: NavController) {

  }

  ngOnInit() {
    this.storageService.get('clientekl').then(valor => {
      if (valor) {
        this.cliente.email = valor.email;
        this.cliente.senha = valor.senha;
        this.cliente = valor;
        console.log(JSON.stringify(this.cliente));
      }
    });
  }
  atualizarSenha() {
    if (this.cliente) {
      this.clienteService.alterarSenha(this.cliente).subscribe((data: any) => {
        this.cliente = data;
        try {
          if (data.status === true) {
            this.toast.showSucess(data.message);
            this.nav.navigateRoot('login');
            this.storageService.remove('clientekl');
          } else {
            this.toast.showError('Senha não foi atualizado, insira os dados corretamente!');
          }
        } catch (error) {
          console.log(error);
        }

      });
    } else {
      this.toast.presentSenha();
    }
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
  manageatualPassword() {
    if (this.atualpasswordtype === 'password') {
      this.atualpasswordtype = 'text';
      this.atualpasseye = 'eye-off';
    } else {
      this.atualpasswordtype = 'password';
      this.atualpasseye = 'eye';
    }
  }


}
