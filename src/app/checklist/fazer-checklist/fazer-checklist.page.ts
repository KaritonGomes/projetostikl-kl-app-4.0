
import { Component, ViewChild } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavController, Platform, MenuController } from '@ionic/angular';
import { ChecklistService } from 'src/app/api/service/checklist.service';
import { ToastService } from 'src/app/api/service/toast.service';
import { StorageService } from 'src/app/api/service/storage.service';
import { ArquivoModel } from 'src/app/model/shared/arquivoModel';
import { ChecklistModel } from 'src/app/model/shared/checklistModel';
import { LocacaoModel } from 'src/app/model/shared/locacaoModel';
import { ActivatedRoute } from '@angular/router';
import { SignatureComponent } from 'src/app/components/signature/signature.component';
import { Browser } from '@capacitor/browser';
import { ArquivosService } from 'src/app/api/service/arquivos.service';


@Component({
  selector: 'app-fazer-checklist',
  templateUrl: './fazer-checklist.page.html',
  styleUrls: ['./fazer-checklist.page.scss'],
})
export class FazerChecklistPage {

  @ViewChild("fixedContainer") fixedContainer: any;
  locacao = new LocacaoModel();
  image: any;
  image2 = [];

  public photos: Array<ArquivoModel> = [];
  public imagemModel: any;
  public id_checklist: any;
  public imagemFrente: string;
  public imagemTraseira: string;
  public imagemLateral1: string;
  public imagemLateral2: string;
  public imagemDocumento: string;
  public imagemAvaria: string;

  public imagemFrenteChecked: boolean = false;
  public imagemTraseiraChecked: boolean = false;
  public imagemLateral1Checked: boolean = false;
  public imagemLateral2Checked: boolean = false;
  public imagemDocumentoChecked: boolean = false;
  public imagemAvariaChecked: boolean = false;

  public checklist = new ChecklistModel();
  public cliente: any;
  public condutores: any;
  public idCliente: number;
  public usuario: any;

  public params = { id_locacao: 0, id_usuario: 0, tipo_check: "", id_carro: 0 };
  public valorTotalAval: any;

  isSubmitted = false;

  public list: any[];
  public textoBuscar: any;
  public countries: any;
  public listaItens: any = [];
  public id_modelo: any;
  public listaItensQtd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    public route: ActivatedRoute, public menuCtrl: MenuController,
    private storageService: StorageService,
    public nav: NavController, public loadingController: LoadingController,
    public checklistService: ChecklistService, public toastService: ToastService,
    public plt: Platform, public modalController: ModalController,
    public alertCtrl: AlertController,
    public apiArquivo: ArquivosService
  ) {


  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'interno');
    this.menuCtrl.enable(true, 'externo');
    this.storageService.get("check").then((user: any) => {
      this.usuario = user.id_usu;
    });
    this.storageService.get("dadosParams").then((dadosLoc) => {
      // console.log(dadosLoc);
      this.checklist.id_locacao = dadosLoc.locacao.id_Loc;
      this.checklist.id_carro = dadosLoc.locacao.id_car;
      this.checklist.tipo_check = dadosLoc.tipo_check;
      this.checklist.id_modelo_car = dadosLoc.locacao.id_modelo_car;
      this.id_modelo = dadosLoc.locacao.id_modelo_car;
      this.checklist.seguroPlus = dadosLoc.locacao.seguroPlus;
      this.locacao.nome_cli = dadosLoc.locacao.nome_cli;
      this.locacao.id_cli = dadosLoc.locacao.id_cli;
      this.checklist.id_usuario = this.usuario;

      this.params.id_locacao = this.checklist.id_locacao;
      this.params.id_usuario = this.usuario;
      this.params.tipo_check = this.checklist.tipo_check;
      this.params.id_carro = this.checklist.id_carro;
      //console.log(this.params);
      this.storageService.get("idCheck").then((value) => {
        if (value === null) {
          this.checklistService.salvarChecklist(this.params).subscribe(data => {
            if (data.status == false) {
              this.toastService.showError('Erro ao salvar o CheckList');
            } else {
              this.id_checklist = data.id_checklist;
              this.checklist.id_checklist = data.id_checklist;
            }
          });
        } else {
          this.id_checklist = value;
          this.checklist.id_checklist = value;
        }
      });
      //pesquisa condutores
      this.checklistService.pesquisarCondutores(this.checklist.id_locacao).subscribe((data) => {
        if (data.status != false) {
          this.condutores = data;
        } else {
          this.condutores = false;
          //console.log('Não a Condutores nesta Locação');
        }
      });

      this.checklistService.buscar_avaria(this.id_modelo).subscribe((data: any) => {
        if (data.status === true) {
          this.list = data.avarias;
          this.list.forEach((element) => {
            element.selecionado = false;
            element.quantidade = 1;
            element.obs = "";
            element.valor_avc = element.valor_ava_rela;
            element.id_locacao = this.checklist.id_locacao;
            element.id_usuario = this.usuario;
          });
        } else {
          alert("nada encontrado");
        }
      });
    });

    //verifica se itens clicado
    this.storageService.get("itensClicado").then((itens) => {
      if (itens !== null) {
        this.checklist = itens;
      }
    });
    this.photos = [];


  }

  checkItens() {
    this.listaItens = [];
    this.list.forEach((element) => {
      if (element.selecionado) {
        this.listaItens.push(element);

      }
    });
  }


  search() {
    if (!this.textoBuscar.trim().length) {
      this.textoBuscar = "";
      this.countries = [];
      return;
    }
    this.countries = this.list.filter((item) =>
      item.descricao_ava.toUpperCase().includes(this.textoBuscar.toUpperCase())
    );
  }

  getValor(avaria) {
    const acessorioB = this.list.find(
      (item) => item.id_avaria === avaria.id_avaria
    );
    if (acessorioB) {
      return acessorioB.quantidade * acessorioB.valor_ava_rela;
    } else {
      return 0;
    }
  }
  calculateTotal() {
    let total = 0;
    let qtd = 0;
    this.valorTotalAval = 0;
    this.listaItens.forEach((item) => {
      qtd = item.quantidade * item.valor_ava_rela;
      total += Number(qtd);
      return this.valorTotalAval = total;
    });
  }

  async salvarChecklist() {
    this.isSubmitted = true;
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    if (this.checklist.km_check !== undefined && this.checklist.km_check !== null) {
      if (this.checklist.gasolina !== undefined && this.checklist.gasolina !== null) {
        if (this.image !== undefined || this.image2 !== undefined) {
          if (this.checklist.id_locacao > 0 && this.checklist.id_locacao !== undefined) {
            this.checklist.id_usuario = this.usuario;
            this.checklist.avarias = JSON.stringify(this.listaItens);
            this.checklistService.atualizarChecklist(this.checklist).subscribe((data: any) => {
              if (data.status == true) {
                this.enviarAssinaturaCliente();
                alert("checkList salvo com sucesso");
                this.nav.navigateRoot('checklist');
                loading.dismiss();
              } else {
                loading.dismiss();
                this.toastService.showError("Erro ao atualizar checklist");
              }
            }, error => {
              console.log(error);
            });
          } else {
            loading.dismiss();
            // console.log(JSON.stringify(this.checklist));
            this.toastService.showError("O número de contrato de locação não pode ser vazio");
          }
        } else {
          loading.dismiss();
          this.toastService.showError("Falta assinatura do cliente");
        }
      } else {
        loading.dismiss();
        this.toastService.showError("Preencher a porcentagem de gasolina");
      }
    } else {
      loading.dismiss();
      this.toastService.showError("Preencher a Quilometragem");
    }
  }

   async takePhoto(tipo) {
        const fotoTirada = await this.apiArquivo.tirarPhoto();
        const arquivoFoto = await this.apiArquivo.carregarUmArquivo(fotoTirada);
        let base64Image = arquivoFoto.data
        let arquivo = new ArquivoModel();
        arquivo.imagem = base64Image;
        arquivo.nome_img = this.createFileName();
        arquivo.pasta_arquivo = "checklist_fotos";
        arquivo.formato = "jpeg";
        arquivo.momento_fotos = this.checklist.tipo_check;
        arquivo.descricao_fotos = tipo;
        arquivo.id_checklist = this.id_checklist;
        arquivo.id_car = this.checklist.id_carro;
        if (tipo == "frente") {
          this.imagemFrente = "assets/imgs/carregando.png";
          this.imagemFrenteChecked = false;
        } else if (tipo == "traseira") {
          this.imagemTraseira = "assets/imgs/carregando.png";
          this.imagemTraseiraChecked = false;
        } else if (tipo == "lateral1") {
          this.imagemLateral1 = "assets/imgs/carregando.png";
          this.imagemLateral1Checked = false;
        } else if (tipo == "lateral2") {
          this.imagemLateral2 = "assets/imgs/carregando.png";
          this.imagemLateral2Checked = false;
        } else if (tipo == "documento") {
          this.imagemDocumento = "assets/imgs/carregando.png";
          this.imagemDocumentoChecked = false;
        } else if (tipo == "avaria") {
          this.imagemAvaria = "assets/imgs/carregando.png";
          this.imagemAvariaChecked = false;
        }
        this.photos.push(arquivo);

        this.checklistService.enviarImagen(arquivo).subscribe((data: any) => {
          if (data.status == false) {
            this.toastService.showError("Aconteceu um erro ao enviar as fotos");
          } else {
            // this.presentToast('Foto salva');
            if (tipo == "frente") {
              this.imagemFrente = base64Image;
              this.imagemFrenteChecked = true;
            } else if (tipo == "traseira") {
              this.imagemTraseira = base64Image;
              this.imagemTraseiraChecked = true;
            } else if (tipo == "lateral1") {
              this.imagemLateral1 = base64Image;
              this.imagemLateral1Checked = true;
            } else if (tipo == "lateral2") {
              this.imagemLateral2 = base64Image;
              this.imagemLateral2Checked = true;
            } else if (tipo == "documento") {
              this.imagemDocumento = base64Image;
              this.imagemDocumentoChecked = true;
            } else if (tipo == "avaria") {
              this.imagemAvaria = base64Image;
              this.imagemAvariaChecked = true;
            }
          }
        });

  }
  async deleteAvarias(index) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      // header: 'Confirm!',
      message: 'Tem certeza que deseja excluir  essa avaria!',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Sim',
          handler: () => {
            console.log('Confirm Okay');
            this.listaItens.splice(index, 1);
          }
        }
      ]
    });
    await alert.present();
  }

  enviarAssinaturaCliente() {
    if (this.image != undefined || this.image != "" || this.image != null) {
      var data2 = {
        imagem: this.image,
        nome_img: this.createFileNameAssinatura(),
        pasta_arquivo: "assinaturas",
        formato: "png",
        tipo_assinante: "cliente",
        id_assinante: this.locacao.id_cli,
        momento_assinatura: this.checklist.tipo_check,
        id_checklist: this.id_checklist,
      };
      this.checklistService.enviarImagen(data2).subscribe((data2: any) => {
        if (data2.status == false) {
          this.toastService.showError("Aconteceu um erro ao salvar assinatura");
        } else {
          // this.presentToast('Assinatura Salva com Sucesso!');
          this.enviaAssinaturaCondutor();
        }
      });
    }
  }

  enviaAssinaturaCondutor() {
    //Salva assinatura dos condutores
    if (this.image2 != undefined || this.image2 != null) {
      this.image2.forEach((value, key) => {
        var data2 = {
          imagem: value,
          nome_img: this.createFileNameAssinatura(),
          pasta_arquivo: "assinaturas",
          formato: "png",
          tipo_assinante: "condutor",
          id_assinante: key,
          momento_assinatura: this.checklist.tipo_check,
          id_checklist: this.id_checklist,
        };
        this.checklistService.enviarImagen(data2).subscribe((data2: any) => {
          if (data2.status == false) {
            this.toastService.showError("Aconteceu um erro ao salvar assinatura");
          } else {
            // this.presentToast('Assinatura Salva com Sucesso!');
          }
        });
      });
    }
    this.enviaEmail();
  }

  enviaEmail() {
    this.checklistService.enviarEmail({ id_loc: this.checklist.id_locacao, id_checklist: this.id_checklist, }).subscribe((data) => {
      if (data.status == false) {
        this.toastService.showError("Erro ao enviar email para o Cliente");
      } else {
        this.toastService.showSucess('Email enviado com sucesso!');
        // this.iab.create('https://klrentacar.com.br/sistemakl/documentos/checklist/' + this.locacao.locacao.id_Loc);
        this.nav.navigateRoot('checklist');
      }
    });
  }

  async verChecklist() {
    await Browser.open({ url: this.checklistService.url + "../documentos/checklist/" + this.checklist.id_locacao });
  }

  async assinaturaCliente(id) {
    const modal = await this.modalController.create({ component: SignatureComponent, componentProps: { id: id } });

    modal.onDidDismiss().then((data: any) => {
      this.image = data['data'];
      this.idCliente = id;
    });
    return await modal.present();

  }

  async assinaturaCondutor(id) {
    const modal = await this.modalController.create({ component: SignatureComponent, componentProps: { id: id } });

    modal.onDidDismiss().then((data: any) => {
      this.image2[id] = data['data'];
    });
    return await modal.present();
  }

  assinaturaFuncionario(id) {
    /*let profileModal = this.modalCtrl.create(AssinaturasPage, { id: id });
    profileModal.onDidDismiss((data) => {
      this.image2[id] = data;
    });
    profileModal.present();*/
  }



  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpeg";
    return newFileName;
  }

  private createFileNameAssinatura() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".png";
    return newFileName;
  }
}
