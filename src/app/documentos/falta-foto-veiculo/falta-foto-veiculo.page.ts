
import { ToastService } from './../../api/service/toast.service';
import { LoadingController, } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Locacao } from '../../model/shared/locacao';
import { NgForm } from '@angular/forms';
import { Arquivos } from '../../model/shared/arquivos';
import { finalize } from 'rxjs/operators';
import { ArquivosService } from 'src/app/api/service/arquivos.service';

declare var cordova: any;

@Component({
  selector: 'app-falta-foto-veiculo',
  templateUrl: './falta-foto-veiculo.page.html',
  styleUrls: ['./falta-foto-veiculo.page.scss'],
})
export class FaltaFotoVeiculoPage {

  @ViewChild('form') form: NgForm;
  // tslint:disable-next-line:variable-name
  public id_pedido: any;
  loc = new Locacao();
  arquivos = new Arquivos();
  baseFrente: any;
  baseTraseiro: any;
  lateralDireito: any;
  lateralEsquerdo: any;
  km: any;
  cartaoFrente: any;
  cartaoVerso: any;
  fotos: Array<Arquivos> = [];
  locacao = new Locacao();
  lastImage: string = null;
  public base64Image: string;
  apiAval: any;
  constructor(
    public loadingController: LoadingController,
    private toast: ToastService,
    public apiArquivo: ArquivosService,
    private route: ActivatedRoute) {
    this.id_pedido = this.route.snapshot.paramMap.get('idPedido');
  }

  ionViewDidEnter() {
    this.id_pedido = this.route.snapshot.paramMap.get('idPedido');
    console.log('ped', this.id_pedido);
  }

   async tirarFoto(tipo: string) {
    const fotoTirada = await this.apiArquivo.tirarPhoto();
    const arquivoFoto = await this.apiArquivo.carregarUmArquivo(fotoTirada);
    this.base64Image = arquivoFoto.data

      const arquivo = new Arquivos();
      arquivo.imagem = this.base64Image;
      arquivo.nome_img = this.createFileName();
      // tslint:disable-next-line:no-unused-expression
      arquivo.id_pedido = this.id_pedido;

      arquivo.tipo_foto = tipo;
      if (tipo === 'frente') {
        this.baseFrente = this.base64Image;

      } else if (tipo === 'lateralDireito') {
        this.lateralDireito = this.base64Image;
      } else if (tipo === 'traseira') {
        this.baseTraseiro = this.base64Image;

      } else if (tipo === 'lateralEsquerdo') {
        this.lateralEsquerdo = this.base64Image;

      } else if (tipo === 'km') {
        this.km = this.base64Image;

      }
      this.fotos.push(arquivo);
      const loader = await this.loadingController.create({
        message: ' Salvar foto. Aguarde ...',
        spinner: 'crescent',
        // duration: 2000,
        showBackdrop: true,
      });
      await loader.present();
      this.apiArquivo.register(arquivo).pipe(
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

  }

  cancelar() {
    const arquivos = new Arquivos();
    this.baseFrente = null;
    this.baseTraseiro = null;
    this.lateralDireito = null;
    this.lateralEsquerdo = null;
    this.km = null;

  }
  createFileName() {
    const d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';
    return newFileName;
  }

}

