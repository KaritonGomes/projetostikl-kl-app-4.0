import { Component, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoadingController, NavController } from '@ionic/angular';

import { StorageService } from 'src/app/api/service/storage.service';
import { ArquivosService } from 'src/app/api/service/arquivos.service';

@Component({
  selector: 'app-foto-perfil',
  templateUrl: './foto-perfil.page.html',
  styleUrls: ['./foto-perfil.page.scss']
})
export class FotoPerfilPage {
  @ViewChild('ref') elem: ElementRef;
  public referencia = true;
  public referenciado = false;

  imageSrc: any;
  idCliente: any;
  image: any;
  descricao = 'perfil';
  constructor(
    public nav: NavController,
    // tslint:disable-next-line: deprecation
    private loadingCtrl: LoadingController, public http: HttpClient,
    public apiArquivo: ArquivosService, public storageService: StorageService) {
  }
  URL = 'https://klrentacar.com.br/sistema/api/arquivos/salvar_fotos';
  //  public uploader: FileUploader = new FileUploader({
  //   url: this.URL,
  //   disableMultipart : false,
  //   autoUpload: true,
  //   method: 'post',
  //   itemAlias: 'attachment',
  //   allowedFileType: ['image', 'pdf'],
  //   authToken: 'Authorization',
  //   authTokenHeader: 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0',
  //  // headers: [{ name: 'Authorization', value: 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0' }],

  // });

  public onFileSelected(event: EventEmitter<File[]>) {
    const file = event[0];
    console.log(file);
    this.image = file.name;
    this.referencia = false;
    this.referenciado = true;
    //this.rend.setElementClass(this.elem.nativeElement, 'ref', true);
  }

  async upload(val) {
    this.imageSrc = val;
    const loader = await this.loadingCtrl.create({
      message: 'Salvando foto. Aguarde ...',
      spinner: 'crescent',
      duration: 3000,
      showBackdrop: true,
    });
    await loader.present();
    this.storageService.get('clientekl').then(user => {
      this.idCliente = user.id;
      const Body = {
        id_cliente: this.idCliente,
        descricao: 'perfil',
        file: this.image,
        nome_img: 'perfil',
      };
      // alert(JSON.stringify(Body));
      this.apiArquivo.salvarFoto(null).then((data: any) => {
        if (data.status !== false) {
          alert(data.message);
          this.nav.navigateRoot('/tabs/perfil');
        } else {
          alert(data.message);
        }
      }, error => {
        console.log(error);
        // this.nav.navigateRoot('/tabs/perfil');
        alert(JSON.stringify(error));
      });
    });
  }
}
