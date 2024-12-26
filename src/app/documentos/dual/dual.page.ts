import { Component } from '@angular/core';
import { LoadingController, Platform, NavController } from '@ionic/angular';
import { StorageService } from 'src/app/api/service/storage.service';
import { LocacaoService } from 'src/app/api/service/locacao.service';
import { Filesystem, Directory } from '@capacitor/filesystem';
// import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
// import { FileOpener } from '@ionic-native/file-opener/ngx';




@Component({
  selector: 'app-dual',
  templateUrl: './dual.page.html',
  styleUrls: ['./dual.page.scss'],
})
export class DualPage {

  lista: any;
  urlDocumento: string;
  tamanhoPDF: string;
  listaLocDoc=[];
 
  link : any ;

  constructor(
    public loadingCtrl: LoadingController,
    private nav: NavController, platform: Platform,
    private apiLoc: LocacaoService, private loadingController: LoadingController,
    private storageService: StorageService,private iab: InAppBrowser) {

    platform.ready().then(() => {
      this.tamanhoPDF = "width: " + platform.width() + "px; height: " + (platform.height() - 20) + "px; background:#d2d2d2"
    });

  }

  ionViewWillEnter() {
    this.getLocacacao();
    this.getLocDoc();
  }
  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      message: ' Aguarde ...',
      spinner: 'crescent',
      duration: 500,
      //showBackdrop: true,
    });
    await loader.present();

    
  }
  async getLocacacao() {
    const loader = await this.loadingController.create({
      message: 'carregando. Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
    });
    await loader.present();

    this.storageService.get('clientekl').then(cliente => {
      if (cliente.id !== null) {
        this.apiLoc.buscarLocacao(cliente).subscribe((data: any) => {
          if (data.status !== false) {
            this.lista = data[0].id_car;
            console.log(JSON.stringify(this.lista));
            loader.dismiss();
          } else {
            loader.dismiss();
            this.lista = [];
          }
        });
      }
    });
  }

  async getLocDoc() {
    const loader = await this.loadingController.create({
      message: 'carregando. Aguarde ...',
      spinner: 'crescent',
      duration: 2000,
    });
    await loader.present();

    this.storageService.get('clientekl').then(cliente => {
      if (cliente.id !== null) {
        this.apiLoc.buscar_Loc_Doc(cliente.id).subscribe((data: any) => {
          if (data.status !== false) {
            this.listaLocDoc = data;
           console.log('LocDoc', this.listaLocDoc);
           loader.dismiss();
          } else {
            loader.dismiss();
            this.listaLocDoc = [];
          }
        });
      }
    });
  }


  // duti(tipo: string) {

  //   //this.lista = 12253;
  //   var id = this.lista;

  //   this.apiLoc.buscar_dual(id).subscribe(async (data: any) => {
  //     console.log(data[0]);
  //     if (data.status === false) {
  //       alert('Em breve o documento do carro estará disponível');
  //     } else {

  //       let name = data[2] + '_' + id + '.pdf';

  //       const browser = this.iab.create(data[0]);
        
  //       const savedFile = await Filesystem.writeFile({
  //         path: name,
  //         data: data[1],
  //         directory: Directory.Documents,
  //       });
  //       const path = savedFile.uri;
  //       const mimeType = this.getMimetype(name);


  //       this.fileOpener.open(path, mimeType)
  //         .then(() => console.log('File is opened'))
  //         .catch(e => console.log('Error opening file', e));

  //     }

  //   });
  // }

   // duti(tipo: string) {

  //   //this.lista = 12253;
  //   var id = this.lista;

  //   this.apiLoc.buscar_dual(id).subscribe(async (data: any) => {
  //     console.log(data[0]);
  //     if (data.status === false) {
  //       alert('Em breve o documento do carro estará disponível');
  //     } else {

  //       let name = data[2] + '_' + id + '.pdf';

  //       const browser = this.iab.create(data[0]);
        
  //       const savedFile = await Filesystem.writeFile({
  //         path: name,
  //         data: data[1],
  //         directory: Directory.Documents,
  //       });
  //       const path = savedFile.uri;
  //       const mimeType = this.getMimetype(name);


  //       this.fileOpener.open(path, mimeType)
  //         .then(() => console.log('File is opened'))
  //         .catch(e => console.log('Error opening file', e));

  //     }

  //   });
  // }

  private dataURLtoFile(dataurl, filename) {

    var
      bstr = atob(dataurl),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: 'application/pdf' });
  }

  private getMimetype(name) {
    if (name.indexOf('pdf') >= 0) {
      return 'application/pdf';
    }
  }

  reserva() {
    this.nav.navigateBack('tabs/nova-locacao/reserva');
  }

 


async abrirLink(id_car: any,placa_car: any) {
  
      console.log(id_car);
      console.log(placa_car);
      

      this.apiLoc.buscar_dual_novo(id_car).subscribe(async (data: any) => {
        if (data.status !== false) {
          this.link = data;
         console.log('link', this.link);

         window.open(this.link, '_blank');
        } else {
         
         

          const alert = await this.loadingCtrl.create({
            message: 'Em breve o documento do carro estará disponível',
            spinner: 'crescent',
            duration: 2000,
            //showBackdrop: true,
          });
      
          await alert.present();


        }
      });
  

}


}
