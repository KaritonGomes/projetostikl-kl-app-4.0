
import { ClienteService } from './../../api/service/cliente.service';
import { StorageService } from './../../api/service/storage.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ToastService } from '../../api/service/toast.service';
import { Arquivos } from 'src/app/model/shared/arquivos';
import { Browser } from '@capacitor/browser';
import { finalize } from 'rxjs/operators';
import { ArquivosService } from 'src/app/api/service/arquivos.service';

declare var cordova: any;

@Component({
  selector: 'app-foto-declaracao',
  templateUrl: './foto-declaracao.page.html',
  styleUrls: ['./foto-declaracao.page.scss'],
})
export class FotoDeclaracaoPage {

  public lastImage: string = null;
  public locacao: number;
  public identidade: any;
  public declaracao: any;
  public cartaoFrente: any;
  public cartaoVerso: any;
  public selfie: any;
  public fotos: Array<Arquivos> = [];
  public idPedido: any;
  public idLocacao: any;
  public idCliente: any;
  public base64Image: string;

  constructor(
    public clienteService: ClienteService, public apiArquivo: ArquivosService,
    public alertController: AlertController, public toast: ToastService,
    public navCtrl: NavController,
    private loadingController: LoadingController, private storageService: StorageService,
    public router: ActivatedRoute) {
    this.idPedido = router.snapshot.paramMap.get('idPedido');
  }

  ionViewWillEnter() {

    this.idPedido = this.router.snapshot.paramMap.get('idPedido');
    console.log('ped', this.idPedido);
    this.idLocacao = this.router.snapshot.paramMap.get('idLoc');
    console.log('loc', this.idLocacao);
  }
  async openPage() {
    await Browser.open({ url: 'http://klrentacar.com.br/sistema/assets/carta_de_autorizacao_cartao.pdf', windowName: '_system' });
  }

  async takeFoto(tipo: string) {
    const fotoTirada = await this.apiArquivo.tirarPhoto();
    const arquivoFoto = await this.apiArquivo.carregarUmArquivo(fotoTirada);
    this.base64Image = arquivoFoto.data
    this.storageService.get('clientekl').then(async user => {
      this.idCliente = user.id;
      const arquivo = new Arquivos();
      arquivo.imagem = this.base64Image;
      arquivo.nome_img = this.createFileName();
      arquivo.id_pedido = this.idPedido;
      arquivo.id_cliente = this.idCliente,
        arquivo.id_locacao = this.idLocacao,
        arquivo.tipo_foto = tipo;

      if (tipo === 'identidade') {
        this.identidade = this.base64Image;
      } else if (tipo === 'declaracao') {
        this.declaracao = this.base64Image;
      } else if (tipo === 'selfie') {
        this.selfie = this.base64Image;
      } else if (tipo === 'cartaoFrente') {
        this.cartaoFrente = this.base64Image;
      } else if (tipo === 'cartaoVerso') {
        this.cartaoVerso = this.base64Image;
      }
      this.fotos.push(arquivo);
      const loader = await this.loadingController.create({
        message: ' Salvar foto. Aguarde ...',
        spinner: 'crescent',
        // duration: 2000,
        showBackdrop: true,
      });
      await loader.present();
      this.apiArquivo.registerDeclaracao(arquivo).pipe(
        finalize(() => {
          // Your code Here
          loader.dismiss();
        })
      ).subscribe((data: any) => {
        if (data.status !== false) {
          alert(JSON.stringify(data.message));
          // this.cancelar();
          loader.dismiss();
        } else {
          loader.dismiss();
          this.toast.showError(data.message);
        }
      }, error => {
        console.log(JSON.stringify(error));
        loader.dismiss();
      });
    });



  }

  // full example
  cancelar() {
    this.lastImage = null;
    this.identidade = null;
    this.declaracao = null;
    this.cartaoFrente = null;
    this.cartaoVerso = null;
    this.selfie = null;

  }
  private createFileName() {
    const d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpeg';
    return newFileName;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      //  header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'Preencher as fotos solicitadas.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
