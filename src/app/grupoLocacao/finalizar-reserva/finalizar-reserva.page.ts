import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { LocacaoService } from 'src/app/api/service/locacao.service';
import { Cliente } from 'src/app/model/shared/cliente';
import { StorageService } from 'src/app/api/service/storage.service';
import { ClienteService } from 'src/app/api/service/cliente.service';
import { ToastService } from 'src/app/api/service/toast.service';
import { Agregados } from 'src/app/model/agregados';

@Component({
  selector: 'app-finalizar-reserva',
  templateUrl: './finalizar-reserva.page.html',
  styleUrls: ['./finalizar-reserva.page.scss'],
})
export class FinalizarReservaPage implements OnInit {
  @ViewChild('deslogado') elem: ElementRef;
  @ViewChild('ative') ref: ElementRef;
  agregados = new Agregados();
  lavagem = 0;
  cliente = new Cliente();
  loginData = { email: '', senha: '', token_fb: '' };
  valorTotal: any;

  grupo: any;
  id_loja: any;
  idGrupo: any;
  id_plano: any;

  dataRetirada: any;
  dataDevolucao: any;
  horaRetirada: any;

  condutor: any;
  acessorios: any;
  valorTotalCondutor = 0;
  valorTotalAce = 0;
  doacao: any;
  valorPretendido: any;
  /*aqui e o login*/

  logar: any;
  submitted = false;
  passwordtype = 'password';
  passeye = 'eye';

  parametros = {
    id_cliente: 0,
    id_loja: 0,
    qtd_dias: 0,
    data_retirada: '',
    data_devolucao: '',
    hora_retirada: '',
    categoria: '',
    grupo_escolhido: 0,
    plano_escolhido: '',
    vlr_doado: 0,
    seguro_escolhido: 0,
    tipo_cliente: 0,
    id_cod: false,
    condutores: '',
    acessorios: '',
  };
  /*Criado para ver se esta logado */
  verificacao: any;
  clienteLogado = false;
  clienteDeslogado = false;
  dias: any;
  desconto: any;
  titulo_desc: any;
  constructor(
    // tslint:disable-next-line: deprecation
    private rend: Renderer2,
    private toast: ToastService,
    public loadingController: LoadingController,
    public nav: NavController,
    public modalController: ModalController,
    public clienteService: ClienteService,
    public storageService: StorageService,
    public apiLoc: LocacaoService
  ) { }

  ngOnInit() {
    if(this.id_loja!=2){
      this.lavagem=50;
    }else{
      this.lavagem=70;
    }
    this.storageService.get('finalizar').then((lista) => {
      this.titulo_desc = lista.titulo;
      this.desconto = lista.desconto;
      this.id_loja = lista.grupo.id_loja;
      this.dataRetirada = lista.dataRet;
      this.dataDevolucao = lista.dataDev;
      this.horaRetirada = lista.hora;
      this.idGrupo = lista.grupo.grupo.id_grupo_car_alu;
      this.id_plano = lista.grupo.grupo.id_pla;
      this.agregados.categoria = lista.grupo.categoria;
      this.dias = lista.grupo.dias;
      this.doacao = lista.doacao;
      this.valorTotal = lista.total;
      this.grupo = lista.grupo.grupo.nome_grupo_car;
      this.agregados.descricao = lista.grupo.grupo.desc_grupo_car;
      this.agregados.percentSeguroBasico = lista.segBasico;
      this.agregados.percentSeguroPlus = lista.segPlus;
      this.acessorios = lista.acessorios;
      this.valorTotalAce = lista.totalAce;
      this.condutor = lista.cond;
      this.valorTotalCondutor = lista.totalCond;
      this.agregados.valorGrupo = lista.grupo.grupo.valor_loc_car;
      this.agregados.seguroPercentual = lista.grupo.grupo.seguro_basico_perc;
      this.valorPretendido = lista.grupo.grupo.valor_pretendido;
      this.calcularValorPret();
    });
    this.storageService.get('clientekl').then((user) => {
      this.cliente = user;
      this.verificacao = user;
      if (this.verificacao != null) {
        this.clienteLogado = true;
        this.clienteDeslogado = true;
      } else {
        this.clienteDeslogado = false;
      }
    });
  }
  criarConta() {
    this.nav.navigateForward('form-cad');
  }
  calcularValorPret() {
    if (this.agregados.categoria === 'promocional') {
      const v = this.valorPretendido;
      this.valorPretendido = Number(v);
      const vd = this.agregados.valorGrupo;
      this.agregados.valorGrupo = Number(vd);
      const sp = this.agregados.seguroPercentual;
      this.agregados.seguroPercentual = Number(sp);
      const d = this.dias;
      this.dias = Number(d);
      // tslint:disable-next-line: max-line-length
      this.agregados.calcularDiariaPromocao =
        (this.valorPretendido -
          ((this.agregados.valorGrupo * this.agregados.seguroPercentual) /
            100) *
          this.dias) /
        this.dias;
    }
    //
  }

  async acessar() {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();

    this.clienteService.loginCliente(this.loginData).subscribe(
      (sucess: any) => {
        if (sucess.status !== false) {
          this.toast.showSucess(sucess.message);
          this.storageService.set('clientekl', sucess.cliente);
          this.rend.addClass(this.elem.nativeElement, 'deslogado');
          this.atualiza();
          this.nav.navigateRoot('/seguro-externo');
          loader.dismiss();
        } else {
          loader.dismiss();
          this.toast.showError(sucess.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  async confirmar() {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      // duration: 500,
      showBackdrop: true,
    });
    await loader.present();
    if (this.agregados.percentSeguroBasico > 0) {
      var seguro_escolhido = 1;
    } else {
      var seguro_escolhido = 2;
    }

    if (this.dataDevolucao != null) {
      const dataDev = Array.from(this.dataDevolucao.split('/'));
      this.dataDevolucao = dataDev[2] + ':' + dataDev[1] + ':' + dataDev[0];
    }
    const dataArray = Array.from(this.dataRetirada.split('/'));
    this.dataRetirada = dataArray[2] + '-' + dataArray[1] + '-' + dataArray[0];
    const horaDev = this.horaRetirada;
    this.horaRetirada = horaDev.concat(':00:00');

    if (this.agregados.categoria === 'tarifaCheia') {
      this.id_plano = 0;
    }

    this.parametros.id_cliente = this.cliente.id;
    this.parametros.id_loja = this.id_loja;
    this.parametros.data_retirada = this.dataRetirada;
    this.parametros.data_devolucao = this.dataDevolucao;
    this.parametros.hora_retirada = this.horaRetirada;
    this.parametros.categoria = this.agregados.categoria;
    this.parametros.qtd_dias = this.dias;
    this.parametros.grupo_escolhido = this.idGrupo;
    this.parametros.plano_escolhido = this.id_plano;
    this.parametros.vlr_doado = this.doacao;
    this.parametros.seguro_escolhido = seguro_escolhido;
    this.parametros.condutores = this.condutor;
    this.parametros.acessorios = JSON.stringify(this.acessorios);
    console.log(this.parametros.seguro_escolhido);
    this.apiLoc.salvarLocacao(this.parametros).subscribe(
      (data: any) => {
        if (data.status === true) {
          loader.dismiss();
          this.toast.showSucess(data.message);
          this.nav.navigateRoot('tabs/home');
        } else {
          loader.dismiss();
          this.toast.showError(data.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'aguarde o processamento...',
      spinner: 'lines',
      duration: 2000,
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }
  atualiza() {
    this.storageService.get('clientekl').then((user) => {
      this.verificacao = user;
      if (this.verificacao != null) {
        this.clienteLogado = true;
        this.clienteDeslogado = true;
      } else {
        this.clienteDeslogado = false;
      }
    });
  }
}
