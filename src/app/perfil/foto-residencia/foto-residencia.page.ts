import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController, NavController } from '@ionic/angular';

import { Cliente } from 'src/app/model/shared/cliente';
import { Arquivos } from 'src/app/model/shared/arquivos';
import { StorageService } from './../../api/service/storage.service';
import { ToastService } from '../../api/service/toast.service';
import { ArquivosService } from 'src/app/api/service/arquivos.service';

interface LocalFile {
  name: string;
  path: string;
  data: string;
  salvada?: number;
}

@Component({
  selector: 'app-foto-residencia',
  templateUrl: './foto-residencia.page.html',
  styleUrls: ['./foto-residencia.page.scss'],
})
export class FotoResidenciaPage implements OnInit {
  // tslint:disable-next-line: no-unused-expression
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
  });
  public photos: Array<LocalFile> = [];
  public fotosServidor = [];
  public cliente = new Cliente();

  constructor(
    public storageService: StorageService, public arquivosService: ArquivosService,
    public alertController: AlertController,
    public toast: ToastService, public navCtrl: NavController,
    public loadingCtrl: LoadingController) {


  }

  async ngOnInit() {
    this.cliente = await this.storageService.get('clientekl');
    await this.arquivosService.carregandoArquivos();
    await this.buscarFotosResidencia();
  }

  async tiraFoto() {
    await this.arquivosService.tirarPhoto();
    await this.arquivosService.carregandoArquivos();
    this.photos = this.arquivosService.imagens;
  }

  async startUpload(file: LocalFile) {
    await this.arquivosService.pegarFotoFormData(file)
      .then((formData: FormData) => {

        this.storageService.get('clientekl').then(user => {
          formData.append("id_cliente", user.id);
          formData.append("descricao", 'residencia');
          formData.append("nome_img", 'residencia');

          this.arquivosService.salvarFoto(formData).then(async (data: any) => {
            console.log(data);
            if (data?.status) {
              await this.deleteImage(file);
              await this.buscarFotosResidencia();
            }
          }, error => {
            console.log(error);
            alert(JSON.stringify(error));
          });

        });
      }).catch(error => { alert(error) });
  }

  async deleteImage(file: LocalFile) {
    await this.arquivosService.deleteImage(file);
    await this.arquivosService.carregandoArquivos();
    this.photos = this.arquivosService.imagens;
  }

  async buscarFotosResidencia() {
    let parametros = { id_cliente: this.cliente.id, descricao: 'residencia' }

    this.arquivosService.buscarFoto(parametros).subscribe(async (data: any) => {
      console.log(data);
      this.fotosServidor = await data;
    });
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
