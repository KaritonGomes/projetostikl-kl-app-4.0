import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { finalize } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
  })
};

interface LocalFile {
  name: string;
  path: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArquivosService {

  public imagens = [];
  private IMAGE_DIR = 'stored-images';

  constructor(
    public api: ApiService,
    public storage: Storage,
    private plt: Platform,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  buscarImagem() {
    return this.api.get('banners/buscar', false, httpOptions);
  }
  nossaFrota() {
    return this.api.get('banners/nossa_frota', false, httpOptions);
  }
  enviarImagen(data: any) {
    return this.api.post('arquivos/upload_uri', data, httpOptions);
  }
  register(data): Observable<any> {
    return this.api.post('arquivos/salvar_fotos_app', data, httpOptions);
  }
  registerDeclaracao(data): Observable<any> {
    return this.api.post('arquivos/salvar_fotos_declaracao_app', data, httpOptions);
  }

  salvarFotoPerfil(data: any) {
    return this.api.post('arquivos/salvar_fotos_perfil', data, httpOptions);
  }

  async salvarFoto(formData: FormData) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading image...',
    });
    await loading.present();

    return await this.api.post('arquivos/salvar_fotos', formData, httpOptions)
      .pipe(
        finalize(() => {
          loading.dismiss();
        })
      )
      .toPromise()
      .then(async response => {
        return response;
      });
  }

  assinatura(data: any) {
    return this.api.post('arquivos/assinatura', data, httpOptions);
  }

  declaracao(data: any) {
    return this.api.post('arquivos/salvar_fotos_declaracao', data, httpOptions);
  }

  buscarFoto(params: { id_cliente: number, descricao: string }) {
    return this.api.get('arquivos/buscar_foto', params, httpOptions);
  }

  async carregandoArquivos() {

    this.imagens = [];

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();

    Filesystem.readdir({
      path: this.IMAGE_DIR,
      directory: Directory.Data,
    }).then(async result => {
      const fileNames = result.files.map(file => file.name);
      await this.carregaListaArquivos(result.files);
    },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: this.IMAGE_DIR,
          directory: Directory.Data,
        });
      }
    ).then(_ => {
      loading.dismiss();
    });
  }


  async carregaListaArquivos(files: { name: string }[]) {
    for (let file of files) {
      const filePath = `${this.IMAGE_DIR}/${file.name}`;
  
      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });
  
      this.imagens.push({
        name: file.name,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
    }
  }
  

  async carregarUmArquivo(fileName: string) {

    const filePath = `${this.IMAGE_DIR}/${fileName}`;

    const readFile = await Filesystem.readFile({
      path: filePath,
      directory: Directory.Data,
    });

    let imagem = {
      name: fileName,
      path: filePath,
      data: `data:image/jpeg;base64,${readFile.data}`,
    };
    return imagem;
  }

  async tirarPhoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera // Camera, Photos or Prompt!
    });

    if (image) {
      return this.saveImage(image)
    }
    return;
  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${this.IMAGE_DIR}/${fileName}`,
      data: base64Data,
      directory: Directory.Data,
      recursive: true
    });
    return fileName;
  }

  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  // Helper function
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  definirCaminhoFotos(caminho: string) {
    this.IMAGE_DIR = caminho;
  }

  async pegarFotoFormData(file: LocalFile) {
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, file.name);
    return formData;
  }

  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
    });
  }

  // Little helper
  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
    });
    toast.present();
  }

}
