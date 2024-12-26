import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController, AlertController } from '@ionic/angular';
//import { FreedomService } from '../api/service/freedom.service';
import { ApiFreedom } from '../service-freedom/api-freedom';
import { FreedomService } from '../api/service/freedom.service';
import { LocacaoService } from '../api/service/locacao.service';
import { ClienteService } from 'src/app/api/service/cliente.service';
import { Cliente } from '../model/shared/cliente';
import { StorageService } from '../api/service/storage.service';
import { ToastService } from '../api/service/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-freedom-detalhes',
  templateUrl: './freedom-detalhes.page.html',
  styleUrls: ['./freedom-detalhes.page.scss'],
})
export class FreedomDetalhesPage implements OnInit {
  @ViewChild('deslogado') elem: ElementRef;
  @ViewChild('ative') ref: ElementRef;
  cliente = new Cliente();
  loginData = { email: '', senha: '', token_fb: '' };

  credenciais: FormGroup;
  


  logar: any;
  submitted = false;
  passwordtype = 'password';
  passeye = 'eye';

  parametros = {
    id_cliente: 0

  }
  /*Criado para ver se esta logado */

  verificacao: any;
  clienteLogado = false;
  clienteDeslogado = false;

  itens: any = [];

  kms: any = [];
  anos: any = [];
  imgs: any = [];
  reserva: any[];
  id: any;
  modelo_car_klfree: string = "";
  valormax: any = 0;
  imagem: string = "";
  url_img_car = this.provider.url_sistema + "img-car/";
  isModalOpen = false;
  id_car_klfree: any;
  fk_ano_klfree: any;
  fk_km_klfree: any;
  descricao_reserva: any = "";
  valorTotal: any = "";
  valor_km_klfreedom: any;
  valorGps: any = "";
  valorAPagar: any = 0;
  calculo: any;
  valorCalculo: any;
  valor: any;
  valorIsufilm: 13.90;
  insulfilme = true;
  email: any;


  constructor(private toast: ToastController,
    private actRouter: ActivatedRoute, private freedomService: FreedomService,
    public clienteService: ClienteService,
    public storageService: StorageService,
    public apiLoc: LocacaoService,
    public loadingController: LoadingController,
    private toastt: ToastService,
    public nav: NavController,
    private router: Router,
    private alert: AlertController,
    private rend: Renderer2,
    private fb: FormBuilder,


    private provider: ApiFreedom) { }

  ngOnInit() {
    this.actRouter.params.subscribe((data: any) => {
      console.log('meus dados passados na rota', data);
      this.id = data.id_car_klfree;
      this.modelo_car_klfree = data.modelo_car_klfree;
      this.valormax = parseFloat(data.valormax);
      this.imagem = data.imagem_car_klfree;
      this.carregarAno(this.id);
      this.carregaKm(this.id);
      this.carregaImg(this.id);
    });
    this.storageService.get('concluir').then((reserva) => {

    })

    this.storageService.get('clientekl').then((user) => {
      console.log('estou aqui pagina detalhes', user)
      this.cliente = user;
      this.verificacao = user;
      if (this.verificacao != null) {
        this.clienteLogado = true;
        this.clienteDeslogado = true;
      } else {
        this.clienteDeslogado = false;
      }
    });

    this.credenciais = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });


  }
  Fechar() {
    this.router.navigate(['home']);
  }



  insulfilm(valor) {
    if (this.insulfilme === true) {
      this.valorIsufilm = 13.90;

    } else {
      return this.valorIsufilm;
    }
  }


  gps(valor) {
    if (this.gps) {
      this.valorGps = 69.91
      console.log(this.valorGps);
    } else {
      this.valorGps === false;
      console.log(this.valorGps);
      return this.valorGps;
    }
  }
  // Funcao para salvar Reserva
  async salvarReservaTeste() {
    const loader = await this.loadingController.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      // duration: 500,
      showBackdrop: true,
    });
    await loader.present();
    if (this.clienteLogado === true) {
      let dados = {
        id_cli_fk: this.cliente.id,
        fk_carro_klfree: parseInt(this.id),
        fk_ano_klfree: parseInt(this.fk_ano_klfree.id_ano_klfree),
        fk_km_klfree: parseInt(this.fk_km_klfree.id_km_klfreedom),
        descricao_reserva: this.descricao_reserva,
        Insulfilm: 13.90,
      }
      if (this.descricao_reserva === "" && this.clienteDeslogado === true) {
        this.mensagemErroCampo();
        loader.dismiss();

      } else {
        console.log('console 2', dados);
        this.provider.dadosApi(dados, 'freedom/salvar_reserva').subscribe((data: any) => {
          if (data.status === true) {
            loader.dismiss();
            this.setOpen(true);
            this.toastt.showSucess(data.message);
            this.Fechar();

          } else {
            loader.dismiss();
            this.toastt.showError(data.message);
          }
        });
      }
    } else {
      loader.dismiss();
      this.mensagemErroLogar();


      // this.nav.navigateRoot('page-logar');
    }
  }


  // funcao que calcula em tempo real valores da reserva
  calcularReserva() {
    return new Promise((data) => {
      if (this.fk_km_klfree !== undefined && this.fk_ano_klfree !== undefined && this.insulfilme === true) {
        let valorIsufilm = 13.90;
        let Gps = 69.99;
        let valorkm = parseFloat(this.fk_km_klfree.valor_km_klfreedom);
        let valorAno = parseFloat(this.fk_ano_klfree.valor_ano_klfee);
        console.log('Valor KM: ', valorkm);
        console.log('Valor ano: ', valorAno);
        console.log('Valor Max: ', this.valormax);
        console.log('gps:', 69.99);
        console.log('insulfime', this.insulfilme);
        console.log('valor do insulfilme', valorIsufilm);
        this.valorAPagar = this.valormax + valorkm + valorIsufilm + Gps - valorAno;
        console.log('soma dos valores', this.valorAPagar);
      } else {
        let valorIsufilm = 0;

      }
    });

  }
  ir() {
    this.nav.navigateRoot('home');

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  // funcao para carregar valores do carro
  carregarAno(id) {
    return new Promise(resolve => {
      this.anos = [];
      let dados = {
        id: id
      }
      console.log(dados);
      this.provider.dadosApi(dados, 'freedom/buscaroano').subscribe(data => {
        console.log(data);
        this.anos = data;
        this.fk_ano_klfree = data[3]
      });
    });

  }
  // funcao para carrega km passando id do carro selecionado
  carregaKm(id) {
    return new Promise(resolve => {
      this.kms = [];
      let dados = {
        id: id
      }
      console.log(dados);
      this.provider.dadosApi(dados, 'freedom/buscarcarrokm').subscribe(data => {
        console.log(data);
        this.kms = data;
        this.fk_km_klfree = data[0]
      });
    });
  }
  // funcao para carregar slides de imagens do carro
  carregaImg(id) {
    return new Promise(resolve => {
      this.itens = [];
      let dados = {
        id: id
      }
      console.log(dados);
      this.provider.dadosApi(dados, 'freedom/buscarcarroimg').subscribe(data => {
        console.log(data);
        this.itens = data;
      });
    });

  }

  verConteudo(item) {
    console.log(item);
  }


  // MENSAGENS DE ERRO E SUCESSO AO USÁRIO
  async mensagemSucesso() {
    const toast = await this.toast.create({
      message: 'Reserva KL Freedom realizada com sucesso !',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async mensagemErroCampo() {
    const toast = await this.toast.create({
      message: 'Faltam campos a serem preenchidos..!',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async mensagemErroLogar() {
    const toast = await this.toast.create({
      message: 'faz-se neceesário Login para concluir sua Reserva!',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }



}



