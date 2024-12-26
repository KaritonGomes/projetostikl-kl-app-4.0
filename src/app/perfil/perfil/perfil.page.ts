import { NavController, LoadingController, AlertController, MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/api/service/storage.service';
import { ArquivosService } from 'src/app/api/service/arquivos.service';
import { ClienteService } from 'src/app/api/service/cliente.service';
import { Cliente } from 'src/app/model/shared/cliente';
import { ToastService } from '../../api/service/toast.service';


interface LocalFile {
  name: string;
  path: string;
  data: string;
  salvada?: number;
}
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public fotoPerfil: LocalFile;
  public fotoRemota: any;
  public cliente = new Cliente();

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    public apiArquivo: ArquivosService,
    public alertController: AlertController,
    public storageService: StorageService,
    public toast: ToastService,
    private menu: MenuController,
    private clienteService: ClienteService,) {

    this.apiArquivo.definirCaminhoFotos("IMG_PERFIL");

  }


  async ngOnInit() {
    const loader = await this.loadingCtrl.create({
      message: ' Aguarde ...',
      spinner: 'crescent',
      duration: 500,
      //showBackdrop: true,
    });
    await loader.present();

    this.fotoPerfil = await this.storageService.get('foto_perfil');
    this.cliente = await this.storageService.get('clientekl');

    this.fotoRemota = await this.mostrarFoto();

  }

  async mostrarFoto() {
    if (this.fotoPerfil?.salvada !== 1) {
      return await this.clienteService.buscarFotoPerfil(this.cliente.id).toPromise().then(
        foto => {
          return foto
        });
    } else {
      return this.fotoPerfil.data;
    }
  }
   async excluirConta(){
     const alert = await this.alertController.create({
      header: 'Deseja mesmo deletar a sua conta?',
      buttons:[
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'alertCancel',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },{
          cssClass: 'alertSuccess',
          text: 'Sim',
          handler: async (data) => {
            const loader = await this.loadingCtrl.create({
              message: 'Aguarde ...',
              spinner: 'crescent',
              duration: 2000,
              showBackdrop: true,
            });
            await loader.present();
            return await this.clienteService.deletarConta(this.cliente.id).subscribe(data=>{
              console.log(data);
              console.log('Confirm Ok');
              this.logout();

            })
    
          }
        }
      ]


     })
     await alert.present();
 
  }

  logout() {

    this.storageService.remove('clientekl').then(() => {
      this.nav.navigateRoot('/login');
      this.menu.close();
      this.menu.close('interno');
    });

  }

  //metodo para atualiza
  doRefresh(event) {

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  alterarSenha() {
    this.nav.navigateBack('tabs/perfil/senha');
  }
  dadosPessoais(id) {
    this.nav.navigateBack(['tabs/perfil/dados', { id: id }]);
  }
  endereco() {
    this.nav.navigateBack('tabs/perfil/endereco');
  }
  fotoResidencia() {
    this.nav.navigateBack('tabs/perfil/foto-residencia');
  }


  async tirarFoto() {
    let caminhoFoto = await this.apiArquivo.tirarPhoto();
    let nome_img = caminhoFoto;
    this.fotoPerfil = await this.apiArquivo.carregarUmArquivo(nome_img);
    this.fotoPerfil.salvada = 1;
    this.storageService.set('foto_perfil', this.fotoPerfil);
    this.fotoRemota = await this.mostrarFoto();
  }

  async upload(file: LocalFile) {
    await this.apiArquivo.pegarFotoFormData(file)
      .then((formData: FormData) => {

        this.storageService.get('clientekl').then(user => {
          formData.append("id_cliente", user.id);
          formData.append("descricao", 'perfil');
          formData.append("nome_img", 'perfil');

          this.apiArquivo.salvarFoto(formData).then(async (data: any) => {
            console.log(data);
            if (data?.status) {
              this.fotoPerfil.salvada = 3;
              this.storageService.set('foto_perfil', this.fotoPerfil);
              this.fotoRemota = await this.mostrarFoto();
            }
          }, error => {
            console.log(error);
            alert(JSON.stringify(error));
          });

        });
      }).catch(error => { alert(error) });
  }

}
