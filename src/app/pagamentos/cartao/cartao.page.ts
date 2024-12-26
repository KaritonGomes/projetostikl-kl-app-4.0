import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocacaoService } from 'src/app/api/service/locacao.service';
import { StorageService } from 'src/app/api/service/storage.service';
import { ClienteService } from 'src/app/api/service/cliente.service';
import { AmortizacaoService } from 'src/app/api/service/amortizacao.service';
import { NavController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { ToastService } from 'src/app/api/service/toast.service';
import { Cliente } from 'src/app/model/shared/cliente';
import { NgForm } from '@angular/forms';
import { Pagamento } from 'src/app/model/shared/pagamento';



@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.page.html',
  styleUrls: ['./cartao.page.scss'],
})
export class CartaoPage {
  @ViewChild('form') form: NgForm;
  id_locacao: any;
  id_pedido: any;
  numero_blqueio: any;
  tipo_pagamento: any;
  cliente = new Cliente();
  dadosLocacao: any;
  numero_dias = 1;
  pagamento = new Pagamento();
  resultado = {
    valor_condutor: 0,
    diaria_normal: 0, diaria_atraso: 0, qtdDiasAtraso: 0,
    qtdDiasNormal: 0, valor_dias_normal: 0, valor_dias_atraso: 0, valor_total: 0, valor_total_formato: 0
  };
  listaDiasNormais = [];
  imageSrc: string;
  /*atribuição para o pagamento de credito*/
  card = { cardType: null, cardNumber: '', redactedCardNumber: '', expiryMonth: null, expiryYear: null, cvv: '', postalCode: '' };
  dataAtual = new Date();
  diasAtraso: any;
  desabilitarButao = false;
  tipoPlano: any;
  image: any;
  image_assinatura: any;
  tipo: any;
  id_car: any;
  id_condutor: any;
  id_assinador: any;
  id_cli: any;
  img_assinatura: any;
  tipoimg_assinatura = 'sim';
  verifica_img = false;

  constructor(
    private route: ActivatedRoute, public nav: NavController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public toast: ToastService, public modalCtrl: ModalController,
    public amortizarProv: AmortizacaoService, public apiLoc: LocacaoService,
    public clienteService: ClienteService, public storageService: StorageService) {
    this.storageService.get('img').then(value => {
      this.image = value;
    });
  }

  ionViewDidEnter() {
    this.id_locacao = this.route.snapshot.paramMap.get('id');
    this.id_pedido = this.route.snapshot.paramMap.get('id_pedido');
    this.id_car = this.route.snapshot.paramMap.get('id_carro');
    this.id_condutor = this.route.snapshot.paramMap.get('id_condutor');
    this.tipo_pagamento = this.route.snapshot.paramMap.get('cartao');
    this.storageService.get('clientekl').then(val => {
      this.cliente = val;
      this.cliente.nome = this.cliente.nome;
      this.id_cli = val.id;
    });
    this.verificarlocacao(this.id_locacao);
    this.storageService.get('input-card').then(valorCard => {
      if (valorCard != null) {
        this.card = valorCard;
      }
    });
    this.storageService.get('input-pag').then(valorPag => {
      if (valorPag != null) {
        this.pagamento = valorPag;
      }
    });
    this.storageService.get('tipo').then(value => {
      if (value != null) {
        this.tipo = value;
        this.buscarAssinatura();
      }
    });
    this.storageService.get('tipo-ass').then(value => {
      if (value != null) {
        this.tipoimg_assinatura = value;
      }
    });

  }

  verificarAssinatura() {
    if (this.tipoimg_assinatura === 'nao') {
      this.verifica_img = true;
    } else {
      this.verifica_img = false;
    }

  }
  async buscarAssinatura() {
    const loader = await this.loadingCtrl.create({
      message: 'Buscando assinatura. Aguarde ...',
      spinner: 'crescent',
      duration: 3000,
      showBackdrop: true,
    });
    await loader.present();
    if (this.tipo === 'cliente') {
      this.id_assinador = this.id_cli;
    } else {
      this.id_assinador = this.id_condutor;
    }
    const params = { id_locacao: this.id_locacao, id_carro: this.id_car, tipo_assinante: this.tipo, id_assinante: this.id_assinador }
    this.amortizarProv.buscar_assinatura(params).subscribe((data: any) => {
      if (data.status != false) {
        loader.dismiss();
        this.image_assinatura = data.assinatura;

      } else {
        loader.dismiss();
        console.log(data.message);
      }
    }, error => {
      loader.dismiss();
      console.log(error);
      //alert(JSON.stringify(error));
    });
  }

  async assinaturaCliente() {
    this.nav.navigateBack('/assinatura');
    this.storageService.set('input-card', this.card);
    this.storageService.set('input-pag', this.pagamento);
    this.storageService.set('tipo', this.tipo);
    this.storageService.set('tipo-ass', this.tipoimg_assinatura);

  }
  /*Metodo para verificar locação */
  async verificarlocacao(id: any) {
    const loader = await this.loadingCtrl.create({
      message: 'Verificando locação, Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();
    this.amortizarProv.verificaLoc(id).subscribe((data: any) => {
      if (data.status === true) {
        this.dadosLocacao = data;
        //console.log(this.dadosLocacao);
        if (this.dadosLocacao.dados.info_plano !== false) {
          this.numero_dias = this.dadosLocacao.dados.info_plano.qtd_min_dias;
          this.calcularPagamento(this.numero_dias);
          loader.dismiss();
        } else {
          loader.dismiss();
          this.tipoPlano = 'pf';
          this.pagamento.qtd_dia_normal = this.numero_dias;
          this.criarListaNormal(30);
          this.calcularPagamento(this.numero_dias);
        }
      } else {
        console.log(data.message);
      }
    }, error => {
      console.log(error);
    });
  }
  /*Calcular pagamento */
  async calcularPagamento(qtd: any) {
    const loader = await this.loadingCtrl.create({
      message: 'Calculando, Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loader.present();
    this.amortizarProv.mostrarPagamento(this.id_locacao, qtd).subscribe(async (data: any) => {
      if (data.status === true) {
        loader.dismiss();
        this.resultado = data.resultado;
        this.diasAtraso = data.resultado.qtdDiasAtraso;
        try {
          if (this.dadosLocacao.dados.info_plano !== false) {
            this.pagamento.qtd_dia_multa = this.resultado.qtdDiasAtraso;
            this.pagamento.qtd_dia_normal = this.resultado.qtdDiasNormal;
          } else {
            loader.dismiss();
          }
        } catch (error) {
          loader.dismiss();
          console.log(error);
        }
      }
    });
  }

  /*Metodo para criar lista */
  criarListaNormal(ultimoDia: number) {
    for (let index = 1; index <= ultimoDia; index++) {
      this.listaDiasNormais.push(index);
    }
  }
  /*Metodo para buscar img */
  handleInputChange(e) {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    let pattern = /image-*/;
    let reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('Formato Inválido');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    const reader = e.target;
    this.imageSrc = reader.result;
    // console.log(this.imageSrc)
  }

  /*Metodo para realizar pagamento debito */
  /*Metodo para realizar pagamento debito */
  async realizarPagamentoDebito() {
    this.desabilitarButao = true;
    const loader = await this.loadingCtrl.create({
      message: 'Processando seu pagamento. Aguarde ...',
      spinner: 'crescent',
      duration: 3000,
      showBackdrop: true,
    });
    await loader.present();
    this.pagamento.id_locacao = this.id_locacao;
    this.pagamento.id_pedido = this.id_pedido;
    this.pagamento.file = this.imageSrc;
    //console.log(this.image_assinatura);

    if (this.tipo != null && this.tipoimg_assinatura === 'sim') {
      this.amortizarProv.deposito(this.pagamento).subscribe(async (data: any) => {
        try {
          if (data.status === true) {
            loader.dismiss();
            this.toast.showSucess(data.message);
            this.atualizarPedido(this.id_pedido);
            this.nav.navigateRoot('/tabs/home');
            this.limparCampo();
            this.desabilitarButao = false;
          } else {
            loader.dismiss();
            this.desabilitarButao = false;
            const alert = await this.alertCtrl.create({
              cssClass: 'my-custom-class',
              header: 'Atenção!',
              message: data.message,
              buttons: [
                {
                  text: 'OK ENTENDI',
                  handler: () => {
                    console.log('Confirm Okay');
                  }
                }
              ]
            });
            await alert.present();

          }
        } catch (error) {
          console.log(error);
        }
      });

    } else if (this.tipo != null && this.tipoimg_assinatura === 'nao' && this.image != null) {

      this.amortizarProv.deposito(this.pagamento).subscribe(async (data: any) => {
        try {
          if (data.status === true) {
            loader.dismiss();
            this.toast.showSucess(data.message);
            this.salvarAssinatura();
            this.nav.navigateRoot('/tabs/home');
            this.limparCampo();
            this.desabilitarButao = false;
          } else {
            loader.dismiss();
            this.desabilitarButao = false;
            const alert = await this.alertCtrl.create({
              cssClass: 'my-custom-class',
              header: 'Atenção!',
              message: data.message,
              buttons: [
                {
                  text: 'OK ENTENDI',
                  handler: () => {
                    console.log('Confirm Okay');
                  }
                }
              ]
            });
            await alert.present();

          }
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      alert('Assinatura é obrigatório');
      this.desabilitarButao = false;
    }

  }
  /*Aqui vai ser realizado todo pagamento via credito */
  async realizarPagamentoCredito() {
    this.desabilitarButao = true;
    const loader = await this.loadingCtrl.create({
      message: 'Processando seu pagamento. Aguarde ...',
      spinner: 'crescent',
      duration: 3000,
      showBackdrop: true,
    });
    await loader.present();
    this.pagamento.id_locacao = this.id_locacao;
    this.pagamento.id_pedido = this.id_pedido;
    this.pagamento.bandeira = this.card.cardType;
    this.pagamento.numero_cartao = this.card.cardNumber;
    this.pagamento.mes_validade = this.card.expiryMonth;
    this.pagamento.ano_validade = this.card.expiryYear;
    this.pagamento.bandeira = this.card.cardType;
    this.pagamento.codigo_verificacao = this.card.cvv;

    if (this.tipo != null && this.tipoimg_assinatura === 'sim') {
      this.amortizarProv.amortizarCredito(this.pagamento).subscribe(async (data: any) => {
        if (data.status === true) {
          console.log(data);
          loader.dismiss();
          this.toast.showSucess(data.message);
          this.atualizarPedido(this.id_pedido);
          this.nav.navigateRoot('/tabs/home');
          this.limparCampo();

        } else {
          loader.dismiss();
          this.desabilitarButao = false;
          this.limparCampo();
          const alert = await this.alertCtrl.create({
            header: data.message,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.limparCampo();
                  console.log('Confirm Okay');
                }
              }
            ]
          });
          await alert.present();
        }
      });

    } else if (this.tipo != null && this.tipoimg_assinatura === 'nao' && this.image != null) {
      this.amortizarProv.amortizarCredito(this.pagamento).subscribe(async (data: any) => {
        if (data.status === true) {
          console.log(data);
          loader.dismiss();
          this.toast.showSucess(data.message);
          this.salvarAssinatura();
          this.nav.navigateRoot('/tabs/home');
          this.limparCampo();
        } else {
          loader.dismiss();
          this.desabilitarButao = false;
          this.limparCampo();
          const alert = await this.alertCtrl.create({
            header: data.message,
            buttons: [
              {
                text: 'OK',
                handler: () => {
                  this.limparCampo();
                  console.log('Confirm Okay');
                }
              }
            ]
          });
          await alert.present();
        }
      });
    } else {
      alert('Assinatura é obrigatório');
      this.desabilitarButao = false;
    }

  }
  atualizarPedido(id) {
    this.amortizarProv.update_pedido(id).subscribe((data: any) => {
      if (data.status != false) {
        this.toast.showSucess(data.message);
        this.nav.navigateRoot('/tabs/home');
      }
    }, error => {
      console.log(error);
    });
  }
  salvarAssinatura() {
    if (this.tipo === 'cliente') {
      this.id_assinador = this.id_cli;
    } else {
      this.id_assinador = this.id_condutor;
    }
    const params = { id_locacao: this.id_locacao, id_carro: this.id_car, tipo_ass: this.tipo, id_assinador: this.id_assinador, imagem: this.image };
    this.amortizarProv.assinatura(params).subscribe((data: any) => {
      if (data.status === true) {
        this.toast.showSucess(data.message);
        this.nav.navigateRoot('/tabs/home');
      } else {
        this.toast.showError(data.message);
      }
    }, error => {
      console.log(error);
    });

  }
  lista_mes() {
    const primeiro_ano = this.dataAtual.getUTCFullYear();
    const ano_final = primeiro_ano + 10;
    const lista = [];
    for (let index = primeiro_ano; index < ano_final; index++) {
      lista.push(index);
    }
    return lista;
  }
  limparCampo() {
    this.card.cardNumber = null;
    this.card.cardType = null;
    this.card.expiryMonth = null;
    this.card.expiryYear = null;
    this.card.cvv = null;
    this.storageService.remove('locacao');
    this.storageService.remove('input-card');
    this.storageService.remove('input-pag');
    this.storageService.remove('tipo');
    this.storageService.remove('tipo-ass');

  }

}
