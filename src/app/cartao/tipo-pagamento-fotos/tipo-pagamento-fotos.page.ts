import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { NavController, LoadingController, Platform, AlertController, ToastController } from "@ionic/angular";
import { LocacaoService } from "src/app/api/service/locacao.service";
import { Pagamento } from "src/app/model/shared/pagamento";
import { AlertService } from "./../../api/service/alert.service";
import { AmortizacaoService } from "./../../api/service/amortizacao.service";
import { StorageService } from "./../../api/service/storage.service";
import { ClienteService } from "./../../api/service/cliente.service";
import { ToastService } from "./../../api/service/toast.service";
import { Arquivos } from "../../model/shared/arquivos";
import { Locacao } from "../../model/shared/locacao";
import { Cliente } from "src/app/model/shared/cliente";
import { ArquivosService } from "src/app/api/service/arquivos.service";

@Component({
  selector: "app-tipo-pagamento-fotos",
  templateUrl: "./tipo-pagamento-fotos.page.html",
  styleUrls: ["./tipo-pagamento-fotos.page.scss"],
})
export class TipoPagamentoFotosPage {
  @ViewChild("form") form: NgForm;
  // tslint:disable-next-line:variable-name
  id_locacao = null;
  cliente = new Cliente();
  loc = new Locacao();
  locacao = new Locacao();
  arquivos = new Arquivos();
  pagamento = new Pagamento();
  fotos: Array<Arquivos> = [];
  comprovante: any;
  baseFrente: any;
  tipoPlano: any;
  baseTraseiro: any;
  lateralDireito: any;
  lateralEsquerdo: any;
  km: any;
  cartaoFrente: any;
  cartaoVerso: any;
  identidade: any;
  declaracao: any;
  selfie: any;
  desabilitarButao = true;
  lastImage: string = null;
  public base64Image: string;
  condutor = 0;
  id: any;
  resultado = {
    qtdCondutos: 0,
    diaria_normal: 0,
    diaria_atraso: 0,
    qtdDiasAtraso: 0,
    qtdDiasNormal: 0,
    valor_dias_normal: 0,
    valor_dias_atraso: 0,
    valor_total: 0,
    valor_total_formato: 0,
  };
  dadosLocacao: any;
  numero_dias: any;
  /*VERIFICAR KL*/
  km_carro: number;
  km_anterior: any;
  bloqueio: any;
  diferencaKm = 0;
  tipo: any;
  idCarro: any;
  idCondutor: any;
  constructor(
    public clienteService: ClienteService,
    public storageService: StorageService,
    public loadingController: LoadingController,
    private alertController: AlertController,
    public amortizacaoService: AmortizacaoService,
    public locacaoService: LocacaoService,
    private toast: ToastService,
    private alertSer: AlertService,
    public platform: Platform,
    public arquivosService: ArquivosService,
    private nav: NavController,
    public toastController: ToastController,
    public apiArquivo: ArquivosService
  ) { }

  ionViewDidEnter() {
    this.tipo = localStorage.getItem("tipo_pag");
    this.storageService.get("locacao").then((dados: any) => {
      // dados.id_Loc
      this.id_locacao = dados.id_Loc;
      this.km_anterior = dados.oleo_km_car;
      this.idCarro = dados.id_car; //
      this.idCondutor = dados.id_cdt;
      // alert(JSON.stringify(this.idCondutor));
      this.verificarlocacao(this.id_locacao);
    });
    this.storageService.get("clientekl").then((user) => {
      this.bloqueio = user.bloqueio_amortizacao;
      this.cliente = user;
    });
  }

  async verificarlocacao(id: any) {
    const loader = await this.loadingController.create({
      message: "Verificando locação, Aguarde ...",
      spinner: "crescent",
      duration: 300,
      showBackdrop: true,
    });
    await loader.present();
    this.amortizacaoService.verificaLoc(id).subscribe((data: any) => {
      //console.log(data);
      if (data.status === true) {
        this.dadosLocacao = data;
        if (this.dadosLocacao.dados.info_plano !== false) {
          if (this.tipo === "deposito") {
            this.verificarDeposito(this.id_locacao);
          }
          this.numero_dias = this.dadosLocacao.dados.info_plano.qtd_min_dias;
          this.calcularPagamento(this.numero_dias);
          loader.dismiss();
        } else {
          if (this.tipo === "deposito") {
            this.verificarDeposito(this.id_locacao);
          }
          this.tipoPlano = 'pf';
          this.numero_dias = this.dadosLocacao.dados.info_plano.qtd_min_dias;
          this.calcularPagamento(this.numero_dias);
          loader.dismiss();
        }
      } else {
        alert(data.message);
      }
    });
  }

  async calcularPagamento(qtd: any) {
    const loader = await this.loadingController.create({
      message: "Calculando, Aguarde...",
      spinner: "crescent",
      duration: 300,
      showBackdrop: true,
    });
    await loader.present();
    this.amortizacaoService
      .mostrarPagamento(this.id_locacao, qtd)
      .subscribe((data: any) => {
        if (data.status === true) {
          console.log("bateu aqui");
          loader.dismiss();
          this.resultado = data.resultado;
          console.log('meu resultado',this.resultado);
          if (this.dadosLocacao.dados.info_plano !== false) {
            this.pagamento.qtd_dia_multa = this.resultado.qtdDiasAtraso;
            this.pagamento.qtd_dia_normal = this.resultado.qtdDiasNormal;
          }
        } else {
          loader.dismiss();
        }
      });
  }

  async tirarFoto(tipo: any) {

    const fotoTirada = await this.arquivosService.tirarPhoto();
    const arquivoFoto = await this.arquivosService.carregarUmArquivo(fotoTirada);
    this.base64Image = arquivoFoto.data
    const arquivo = new Arquivos();
    arquivo.imagem = this.base64Image;
    arquivo.nome_img = this.createFileName();
    arquivo.tipo_foto = tipo;

    if (tipo === "frente") {
      this.baseFrente = this.base64Image;
      this.toast.showSucess(
        "Agora tire a foto da lateral direira do veiculo"
      );
    } else if (tipo === "lateralDireito") {
      this.lateralDireito = this.base64Image;
      this.toast.showSucess("Agora tire a foto da traseira do veiculo");
    } else if (tipo === "traseira") {
      this.baseTraseiro = this.base64Image;
      this.toast.showSucess(
        "Agora tire a foto da lateral esquerdo do veiculo"
      );
    } else if (tipo === "lateralEsquerdo") {
      this.lateralEsquerdo = this.base64Image;
      this.toast.showSucess("Agora tire a foto da quilometragem do veiculo");
    } else if (tipo === "km") {
      this.km = this.base64Image;
    } else if (tipo === "identidade") {
      this.identidade = this.base64Image;
      this.toast.showSucess("Agora tire a foto da declaracao preenchida");
    } else if (tipo === "declaracao") {
      this.declaracao = this.base64Image;
      this.toast.showSucess(
        "Agora tire selfie do titular segurando documento"
      );
    } else if (tipo === "selfie") {
      this.selfie = this.base64Image;
      this.toast.showSucess("Agora tire a foto da frente do cartão");
    } else if (tipo === "cartaoFrente") {
      this.cartaoFrente = this.base64Image;
      this.toast.showSucess("Agora tire a foto do verso do veiculo");
    } else if (tipo === "cartaoVerso") {
      this.cartaoVerso = this.base64Image;
    }
    this.fotos.push(arquivo);

  }
  /*Metodo para debito */
  async enviarFotoDev() {
    const loader = await this.loadingController.create({
      message: "Enviando foto. Aguarde ...",
      spinner: "crescent",
      duration: 3000,
      showBackdrop: true,
    });
    await loader.present();
    // .length > 4
    if (this.fotos.length > 4) {
      if (this.km_carro !== undefined && this.km_carro > 0) {
        const parametros = {
          id_locacao: this.id_locacao,
          km_carro: this.km_carro,
          id_carro: this.idCarro,
          id_condutor: this.idCondutor,
          tipo_pagamento: "Deposito",
        };
        this.amortizacaoService.abrirAmortizacao(parametros).subscribe(
          async (data: any) => {
            if (data.status === true) {
              if (data.avisa_servico === true) {
                const alert = await this.alertController.create({
                  header: "Confirmar!",
                  message: data.messagem_aviso,
                  buttons: [
                    {
                      text: "Cancelar",
                      role: "cancel",
                      cssClass: "secondary",
                      handler: async (blah) => {
                        const toast = await this.toastController.create({
                          message: "Renovação cancelada",
                          position: "middle",
                          color: "danger",
                          duration: 500,
                        });
                        toast.present();
                      },
                    },
                    {
                      text: "Ok Entendi",
                      handler: async () => {
                        const toast = await this.toastController.create({
                          message: "Prosseguindo",
                          position: "middle",
                          color: "primary",
                          duration: 500,
                        });
                        toast.present();
                        this.upload(data.id_pedido);
                        // tslint:disable-next-line: max-line-length
                        this.nav.navigateForward([
                          "tabs/pagamento/cartao",
                          {
                            id: this.id_locacao,
                            id_pedido: data.id_pedido,
                            id_carro: this.idCarro,
                            id_condutor: this.idCondutor,
                            cartao: "debito",
                          },
                        ]);
                        this.removerStorage();
                      },
                    },
                  ],
                });

                await alert.present();
              } else {
                const toast = await this.toastController.create({
                  message: "Prosseguindo",
                  position: "middle",
                  color: "primary",
                  duration: 500,
                });
                toast.present();
                this.upload(data.id_pedido);
                this.nav.navigateForward([
                  "tabs/pagamento/cartao",
                  {
                    id: this.id_locacao,
                    id_pedido: data.id_pedido,
                    id_carro: this.idCarro,
                    id_condutor: this.idCondutor,
                    cartao: "debito",
                  },
                ]);
                this.removerStorage();
              }
              loader.dismiss();
            } else {
              loader.dismiss();
              const alert = await this.alertController.create({
                header: "Confirmar!",
                message: data.message,
                buttons: [
                  {
                    text: "Cancelar",
                    role: "cancel",
                    cssClass: "secondary",
                    handler: async (blah) => {
                      const toast = await this.toastController.create({
                        message: "Renovação cancelada",
                        position: "middle",
                        color: "danger",
                        duration: 1000,
                      });
                      toast.present();
                    },
                  },
                  {
                    text: "Ok Entendi",
                    handler: async () => {
                      const toast = await this.toastController.create({
                        message: "Renovação cancelada",
                        color: "danger",
                        position: "middle",
                        duration: 1000,
                      });
                      toast.present();
                      this.nav.navigateRoot("/tabs/servico/agendar");
                    },
                  },
                ],
              });
              await alert.present();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        loader.dismiss();
        this.alertSer.showKm();
      }
    } else {
      loader.dismiss();
      this.alertSer.showFotos();
    }
  }
  /*Metodo para credito */
  async enviarFotoCredito() {
    const loader = await this.loadingController.create({
      message: "Enviando foto. Aguarde ...",
      spinner: "crescent",
      duration: 3000,
      showBackdrop: true,
    });
    await loader.present();
    // .length > 4
    if (this.fotos.length > 4) {
      if (this.km_carro !== undefined && this.km_carro > 0) {
        const parametros = {
          id_locacao: this.id_locacao,
          km_carro: this.km_carro,
          id_carro: this.idCarro,
          id_condutor: this.idCondutor,
          tipo_pagamento: "CreditCard",
        };
        this.amortizacaoService.abrirAmortizacao(parametros).subscribe(
          async (data: any) => {
            if (data.status === true) {
              if (data.avisa_servico === true) {
                const alert = await this.alertController.create({
                  header: "Confirmar!",
                  message: data.messagem_aviso,
                  buttons: [
                    {
                      text: "Cancelar",
                      role: "cancel",
                      cssClass: "secondary",
                      handler: async (blah) => {
                        const toast = await this.toastController.create({
                          message: "Renovação cancelada",
                          position: "middle",
                          color: "danger",
                          duration: 1000,
                        });
                        toast.present();
                      },
                    },
                    {
                      text: "Ok Entendi",
                      handler: async () => {
                        const toast = await this.toastController.create({
                          message: "Prosseguindo ... ",
                          position: "middle",
                          color: "primary",
                          duration: 500,
                        });
                        toast.present();
                        this.upload(data.id_pedido);
                        // tslint:disable-next-line: max-line-length
                        this.nav.navigateForward([
                          "tabs/pagamento/cartao",
                          {
                            id: this.id_locacao,
                            id_pedido: data.id_pedido,
                            id_carro: this.idCarro,
                            id_condutor: this.idCondutor,
                            cartao: "credito",
                          },
                        ]);
                        this.removerStorage();

                      },
                    },
                  ],
                });

                await alert.present();
              } else {
                const toast = await this.toastController.create({
                  message: "Prosseguindo ...",
                  position: "middle",
                  color: "primary",
                  duration: 500,
                });
                toast.present();
                this.upload(data.id_pedido);
                this.nav.navigateForward([
                  "tabs/pagamento/cartao",
                  {
                    id: this.id_locacao,
                    id_pedido: data.id_pedido,
                    id_carro: this.idCarro,
                    id_condutor: this.idCondutor,
                    cartao: "credito",
                  },
                ]);
                this.removerStorage();

              }
              loader.dismiss();
            } else {
              loader.dismiss();
              const alert = await this.alertController.create({
                header: "Confirmar!",
                message: data.message,
                buttons: [
                  {
                    text: "Cancelar",
                    role: "cancel",
                    cssClass: "secondary",
                    handler: async (blah) => {
                      const toast = await this.toastController.create({
                        message: "Renovação cancelada",
                        position: "middle",
                        color: "danger",
                        duration: 500,
                      });
                      toast.present();
                    },
                  },
                  {
                    text: "Ok Entendi",
                    handler: async () => {
                      const toast = await this.toastController.create({
                        message: "Renovação cancelada",
                        color: "danger",
                        position: "middle",
                        duration: 1000,
                      });
                      toast.present();
                      this.nav.navigateRoot("/tabs/servico/agendar");
                    },
                  },
                ],
              });

              await alert.present();
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        loader.dismiss();
        this.alertSer.showKm();
      }
    } else {
      loader.dismiss();
      this.alertSer.showFotos();
    }
  }

  // full example
  upload(idPpedido: any) {
    this.fotos.forEach(async (foto) => {
      const loader = await this.loadingController.create({});
      await loader.present();
      const params = {
        id_pedido: idPpedido,
        tipo_foto: foto.tipo_foto,
        nome_img: foto.nome_img,
        imagem: foto.imagem,
        nomeImage: foto.tipo,
        formato: "jpeg",
      };
      this.arquivosService.register(params).subscribe(
        (data: any) => {
          if (data.status !== false) {
            loader.dismiss();
            console.log(data.message);
            this.cancelar();
          } else {
            loader.dismiss();
            this.toast.showError(data.message);
          }
        },
        (error) => {
          console.log(JSON.stringify(error));
          loader.dismiss();
        }
      );
    });
  }
  verificarDeposito(id) {
    this.amortizacaoService.verificarPedidoDeposito(id).subscribe((data: any) => {
      if (data.status !== false) {
        alert(data.message);
        this.nav.navigateForward("tabs/locacao");
      } else {
        console.log(data);
      }
    }, error => {
      console.log(error);
    });
  }

  doRefresh(event) {
    console.log(event);
    this.ionViewDidEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
  cancelar() {
    this.baseFrente = null;
    this.baseTraseiro = null;
    this.lateralDireito = null;
    this.lateralEsquerdo = null;
    this.km = null;
  }
  createFileName() {
    const d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }
  removerStorage() {
    this.storageService.remove("img");
    this.storageService.remove("input-card");
    this.storageService.remove("input-pag");
    this.storageService.remove('tipo');
    this.storageService.remove('tipo-ass');

  }
}
