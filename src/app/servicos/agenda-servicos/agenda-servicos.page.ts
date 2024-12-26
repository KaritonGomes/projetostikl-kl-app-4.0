import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { AlertService } from '../../api/service/alert.service';
import { ClienteService } from '../../api/service/cliente.service';
import { StorageService } from '../../api/service/storage.service';
import { LocacaoService } from '../../api/service/locacao.service';
import { ServicosService } from '../../api/service/servicos.service';
import { ToastService } from '../../api/service/toast.service';
import { AgendamentoServicos } from '../../model/shared/agendamento-servicos';
import { Locacao } from '../../model/shared/locacao';
import { Lojas } from '../../model/shared/lojas';
import { Servico } from '../../model/shared/servico';

@Component({
  selector: 'app-agenda-servicos',
  templateUrl: './agenda-servicos.page.html',
  styleUrls: ['./agenda-servicos.page.scss'],
})
export class AgendaServicosPage implements OnInit {

  @ViewChild('form') form: NgForm;
  public agendarServicos = new AgendamentoServicos();
  tipoServ = new Servico();
  loja = new Lojas();
  locacao = new Locacao();
  cliente: any;
  horaSelecionada: any;
  dataSelecionada: Date;
  kilometragem: any;
  outroServico: any;
  dias: any;
  horas: any;
  lojasServicos: any;
  carregar: any;
  listaServico: any;
  placa: any;
  plano: any;
  listaLoc: any;
  msg: any;
  myIndex = 0;
  formulario: FormGroup;
  desabilita = false;

  aviso: any;

  constructor(
    public toast: ToastService, public nav: NavController, private fb: FormBuilder,
    public apiLoc: LocacaoService, public apiAlert: AlertService,
    public apiServico: ServicosService, public storageService: StorageService,
    public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.presentLoading();
    this.ionViewDidLoad();

    this.formulario = this.fb.group({
      Locacao: new FormControl('', [Validators.required]),
      TipoServico: new FormControl('', [Validators.required]),
      Outros: new FormControl(''),
      LojaServico: new FormControl('', [Validators.required]),
      DiaServico: new FormControl('', [Validators.required]),
      HoraServico: new FormControl('', [Validators.required]),
      Quilometragem: new FormControl('', [Validators.required])
    });

  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
      duration: 2000
    });
    await loading.present();

  }
  ionViewDidLoad() {
    this.storageService.get('clientekl').then(valor => {
      this.cliente = valor;
      this.buscarLoc(this.cliente.id);
      // console.log('id: ', this.cliente.id);
    });
    this.comunicado();
  }

  comunicado() {
    this.apiServico.comunicado_servico().subscribe((data: any) => {
      if (data.status === false) {
        this.aviso = null;
        console.log(this.aviso);
      } else {
        this.aviso = data;
        console.log(this.aviso);
      }

    });
  }
  onSelectChange(event: any) {
    const index = this.myIndex;
  }
  // comeca os metodos
  async buscarLoc(param) {
    const loader = await this.loadingCtrl.create({
      message: ' Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();
    const dado = { id: param };
    this.apiLoc.buscarLocacao(dado).subscribe((data: any) => {
      try {
        if (data.status !== false) {
          this.listaLoc = data;
          loader.dismiss();
        } else {
          loader.dismiss();
          this.apiAlert.presentAlert();
          this.listaLoc = [];
        }
      } catch (error) {
        loader.dismiss();
        console.log('error da locação: ', JSON.stringify(error));
      }

    });
    this.lojaServices();
  }
  // metodo pesquisar 
  async pesquisar() {
    const loader = await this.loadingCtrl.create({
      message: 'Buscando dia , Aguarde ...',
      spinner: 'crescent',
      duration: 8500,
      showBackdrop: true,
    });
    await loader.present();
    this.apiServico.diasDisponiveisServicos(this.loja.id_loj, this.tipoServ.id_cat).subscribe((data: any) => {
      try {
        if (data.status != null) {
          this.toast.showSucess(data.message);
          //console.log('dias disponiveis' + this.dias);
          loader.dismiss();
        } else {
          loader.dismiss();
          this.dias = data;
          this.locacao = this.locacao;
          console.log('dias disponiveis' + JSON.stringify(this.dias));
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  buscarServico(id_locacao) {
    if (id_locacao != undefined) {
      //var id = 51412;
      this.apiServico.buscarServicos(id_locacao).subscribe(res => {
        this.listaServico = res;
        console.log('lista', JSON.stringify(this.listaServico));
      },
        erro => {
          console.log('Erro1: ' + JSON.stringify(erro));
        }
      );
    }
  }
  async hora() {
    const loader = await this.loadingCtrl.create({
      message: 'Buscando Horas , Aguarde ...',
      spinner: 'crescent',
      duration: 8500,
      showBackdrop: true,
    });
    await loader.present();

    // tslint:disable-next-line: max-line-length
    this.apiServico.horasDisponiveisServicos(this.loja.id_loj, this.dataSelecionada, this.tipoServ.id_cat).subscribe((data: any) => {
      this.horas = data;
      console.log('dias disponiveis' + JSON.stringify(this.horas));
    }, error => {
      console.log(error);
    });
  }
  // metodo para buscar lojas 
  lojaServices() {
    this.apiServico.lojasServicos().subscribe((data: any) => {
      this.lojasServicos = data;
      // console.log('foi longe: ' + JSON.stringify(this.lojasServicos));
    });
  }
  async salvarServico() {
    this.desabilita = true;
    if (!this.formulario.invalid) {
      const loader = await this.loadingCtrl.create({
        message: 'Pedido serviço de locação. Aguarde...',
        spinner: 'crescent',
        // duration: 1000,
        showBackdrop: true,
      });
      await loader.present();
      this.agendarServicos.id_cliente = this.cliente.id;
      this.agendarServicos.id_locacao = this.locacao.id_Loc;
      this.agendarServicos.hora_agendamento = this.horaSelecionada;
      this.agendarServicos.data_agendamento = this.dataSelecionada;
      this.agendarServicos.servico = this.tipoServ.id_cat;
      this.agendarServicos.id_loja = this.loja.id_loj;
      this.agendarServicos.km_car_serv = this.kilometragem;
      this.agendarServicos.obs_servico = this.outroServico;
      this.apiServico.agendarServicos(this.agendarServicos).subscribe((data: any) => {
        try {
          if (data == null) {
            this.apiAlert.showAlert();
            loader.dismiss();
          } else {
            if (data.status === true) {
              loader.dismiss();
              this.toast.showSucess(data.message);
              this.nav.navigateRoot('tabs/home');
              console.log(JSON.stringify(data));
              // this.viewCtrl.dismiss();
            } else {
              loader.dismiss();
              this.desabilita = false;
              // alert(data.message);
              this.toast.showError(data.message);
            }
          }
        } catch (error) {
          console.log(error);
          loader.dismiss();
          this.desabilita = false;
        }
      });
    } else {
      console.log(this.formulario);
      this.toast.showError('Alguns campos não foram preenchidos corretamente');
    }
  }
  limparDados() {
    this.horaSelecionada = '';
    this.dataSelecionada = null;
  }
  // metodo de carregamento da tela
  loading() {
    this.carregar = this.loadingCtrl.create({ message: 'Carregando...' });
    this.carregar.present();
    setInterval(() => {
      this.carregar.dismissAll();
    }, 300);
  }

}
