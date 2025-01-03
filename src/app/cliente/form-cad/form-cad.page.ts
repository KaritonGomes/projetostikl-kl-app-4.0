import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { LoadingController, AlertController, NavController, MenuController } from '@ionic/angular';

import { Browser } from '@capacitor/browser';

import { existingCpfValidator } from 'src/app/validators/assicronous-validator';
import { existingEmailValidator } from 'src/app/validators/assicronous-validator';

import { PasswordValidator } from '../../validators/password-validator';
import { ValidatorPadrao } from '../../validators/validator-padrao';
import { AlertService } from '../../api/service/alert.service';
import { ClienteService } from '../../api/service/cliente.service';
import { ToastService } from '../../api/service/toast.service';
import { StorageService } from '../../api/service/storage.service';
import { Cliente } from '../../model/shared/cliente';
@Component({
  selector: 'app-form-cad',
  templateUrl: './form-cad.page.html',
  styleUrls: ['./form-cad.page.scss'],
})
export class FormCadPage implements OnInit {

  segmentModel = 'sim';

  public cliente = new Cliente();

  confirmarSenha: any;
  passwordtype = 'password';
  cnfpasswordtype = 'password';
  cnfpasseye = 'eye';
  passeye = 'eye';
  matchingPasswordsGroup: FormGroup;
  msgCpf = '';

  dataAtual = new Date();
  dataMaxima: Date;
  dataMinima: Date;
  maxDat: any;
  minDate: any;
  desabilita = false;

  @ViewChild('signupSlider') signupSlider;
  primeiroSlide: FormGroup;
  segundoSlide: FormGroup;
  terceiroSlide: FormGroup;
  slideAtual = 0;

  sexualidade = ['masculino', 'femenino', 'outros'];
  estadoCivil = ['solteiro(a)', 'casado(a)', 'divorciado(a)', 'separado(a)', 'viúvo(a)'];

  constructor(
    private storageService: StorageService,
    public loadingCtrl: LoadingController, public toast: ToastService,
    public alertController: AlertController, public apiAlert: AlertService,
    public nav: NavController, public clienteService: ClienteService,
    private menuCtrl: MenuController, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.menuCtrl.enable(false, 'interno');
    this.menuCtrl.enable(true, 'externo');

    this.matchingPasswordsGroup = new FormGroup({
      Password: new FormControl('', Validators.compose([
        Validators.minLength(8),
        Validators.required
      ])),
      ConfirmPassword: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.primeiroSlide = this.fb.group({
      UserNome: new FormControl('', [Validators.required]),
      UserCpf: new FormControl('', [Validators.required, ValidatorPadrao.validarCpf], [existingCpfValidator(this.clienteService)]),
      UserEmail: new FormControl('', [Validators.required, Validators.email], [existingEmailValidator(this.clienteService)]),
      matching_passwords: this.matchingPasswordsGroup
    });

    this.segundoSlide = this.fb.group({
      NomeMae: new FormControl(''),
      NumeroRg: new FormControl(''),
      OrgaoExpRg: new FormControl(''),
      sex: new FormControl(''),
      civil: new FormControl(''),
      NumeroHab: new FormControl(''),
      ValidadeHab: new FormControl(''),
      UfCnh: new FormControl(''),
      DataNasc: new FormControl(''),
      Profissao: new FormControl('')
    });

    this.terceiroSlide = this.fb.group({
      CepCli: new FormControl(''),
      RuaCli: new FormControl(''),
      NumeroCasa: new FormControl(''),
      Complemento: new FormControl(''),
      Bairro: new FormControl(''),
      Cidade: new FormControl(''),
      Estado: new FormControl(''),
      Nacionalidade: new FormControl(''),
      UserTermo: new FormControl('')
    });

    this.dataMaxima = new Date();
    this.maxDat = this.formatDate(this.dataMaxima);
    this.maxDat = this.niverDate(this.dataMaxima);
    this.dataMinima = new Date();
    this.minDate = this.dataMinimaFormatada(this.dataMinima);
    this.minDate = this.dataniverFormatada(this.dataMinima);

    this.signupSlider?.getActiveIndex().then((data: number) => { this.slideAtual = data; });

  }



  buscarCep() {
    this.clienteService.buscarCep(this.cliente.cep.replace(/\.|\-/g, '')).subscribe((data: any) => {
      this.cliente.cep = data.cep;
      this.cliente.logradouro = data.logradouro;
      this.cliente.localidade = data.localidade;
      this.cliente.uf = data.uf;
      this.cliente.bairro = data.bairro;
    });
  }

  async openTermosDeUso() {
    await Browser.open({ url: 'https://klrentacar.com.br/Home/politica_app1', windowName: '_system' });
  }
  
  async openPoliticaDePrivacidade() {
    await Browser.open({ url: 'https://klrentacar.com.br/Home/politica_app', windowName: '_system' });
  }
  
  async contratodelocacao() {
    await Browser.open({ url: 'https://klrentacar.com.br/sistema/assets/contrato_locacao.pdf', windowName: '_system' });
  }
  
  async termoUso() {
    this.desabilita = true;
    if (this.primeiroSlide.invalid) {
      this.signupSlider.slideTo(0);
      this.signupSlider.getActiveIndex().then((data: number) => { this.slideAtual = data; });
    } else if (this.segundoSlide.invalid) {
      this.signupSlider.slideTo(1);
      this.signupSlider.getActiveIndex().then((data: number) => { this.slideAtual = data; });
    } else if (this.terceiroSlide.invalid) {
      this.signupSlider.slideTo(2);
      this.signupSlider.getActiveIndex().then((data: number) => { this.slideAtual = data; });
    } else {
      this.desabilita = true;
      const forgot = await this.alertController.create({
        header: 'Termos de uso',
        message: ' <br /><strong>Antes de concluir o registro, você precisa aceitar os Termos de uso da KL Rent  a car..</strong>',


        buttons: [
          {
            text: 'CANCELAR',
            cssClass: 'alertUso',
            handler: data => {
              // this.navCtrl.push("ModalTermoUsoPage")
              console.log('Cancel clicked');
            }
          },
          {
            text: 'CONCORDO',
            cssClass: 'alertEnviar',
            handler: async data => {
              //  this.desabilitarButao = true;
              const loader = await this.loadingCtrl.create({
                message: ' Aguarde ...',
                spinner: 'crescent',
                duration: 300,
                showBackdrop: true,
              });
              await loader.present();
              this.desabilita = true;
              //alert(JSON.stringify(this.cliente));
              // tslint:disable-next-line: no-shadowed-variable
              this.clienteService.cadastro(this.cliente).subscribe((data: any) => {
                if (data.status !== false) {
                  this.toast.showSucess(data.message);
                  this.nav.navigateRoot('/login');
                  this.desabilita = false;
                  loader.dismiss();
                } else {
                  loader.dismiss();
                  this.toast.showError(data.message + ': ' + data.erros);
                  this.desabilita = false;
                }
              }, error => {
                console.log(error);
                console.error(error);

              });

              console.log('Send clicked');
            }
          }
        ]
      });

      forgot.present();
    }
  }

  next() {
    if (this.slideAtual === 0 && !this.primeiroSlide.invalid) {
      this.primeiroSlide.markAsTouched();
      this.primeiroSlide.markAsPristine();
      this.signupSlider.slideNext();
      this.signupSlider.getActiveIndex().then((data: number) => { this.slideAtual = data; });
    } else if (this.slideAtual === 1 && !this.segundoSlide.invalid) {
      this.segundoSlide.markAsTouched();
      this.segundoSlide.markAsPristine();
      this.signupSlider.slideNext();
      this.signupSlider.getActiveIndex().then((data: number) => { this.slideAtual = data; });
    }
  }

  prev() {
    this.signupSlider.slidePrev();
    this.signupSlider.getActiveIndex().then((data: number) => { this.slideAtual = data; });
  }

  ionSlideDidChange() {
    this.signupSlider.getActiveIndex().then((data: number) => { this.slideAtual = data; });
  }
  async openPdf() {
    await Browser.open({ url: 'https://klrentacar.com.br/sistema/assets/contrato_locacao.pdf', windowName: '_system' });

  }
  // metodo de verificar senha
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
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Senha',
      // subHeader: 'Subtitle',
      message: 'As senhas não conferem.',
      cssClass: 'secondary',
      buttons: ['OK']
    });

    await alert.present();
  }

  /*metodo para aumentar o dia para o da validade da habilitacao*/
  formatDate(dataMaxima) {
    let d = new Date(dataMaxima),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear() + 10;
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }
  dataMinimaFormatada(dataMinima) {
    let d = new Date(dataMinima),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }

  /*metodo para data de nascimento*/
  public niverDate(dataMaxima) {
    let d = new Date(dataMaxima),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear() - 20;
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }
  dataniverFormatada(dataMinima) {
    let d = new Date(dataMinima),
      day = '' + d.getDate(),
      month = '' + (d.getMonth() + 1),
      year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }

}


