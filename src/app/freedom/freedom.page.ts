import { ApiFreedom } from '../service-freedom/api-freedom';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { FreedomService } from '../api/service/freedom.service';
import { StorageService } from '../api/service/storage.service';
@Component({
  selector: 'app-freedom',
  templateUrl: './freedom.page.html',
  styleUrls: ['./freedom.page.scss'],
})
export class FreedomPage implements OnInit {
    limit: number =10;
    start: number = 0;
    itens : any = [];
    id_car_klfree: string = "";
    modelo_car_klfree : string = "";
    valormax : string = "";
    calculo : any = "";
    imagem_car_klfree: string = "";
    listaLocacoes = [];
    listaBusca: any = [];
    cliente: any;

    url_img_car = this.provider.url_sistema + "/img-car/";
      
    /*Criado para ver se esta logado */

      verificacao: any;
      clienteLogado = false;
      clienteDeslogado = false;

      parametros ={
        id_cliente: 0
    
      }
  isModalOpen: boolean;



  constructor(public nav: NavController,
     private router: Router, 
     private provider: ApiFreedom,
     private actRouter: ActivatedRoute,
     public toast: ToastController,
     private freedomService: FreedomService,
     private loadingCtrl: LoadingController,
     public storageService: StorageService,



    ) { }

  ngOnInit() {
    this.storageService.get('clientekl').then((user) => {
      console.log('aqui estou eu',user);
      this.cliente = user;
      this.verificacao = user;
      if (this.verificacao != null) {
        this.clienteLogado = true;
        this.clienteDeslogado = true;
      } else {
        this.clienteDeslogado = false;
      }
    });
   // this.carros2();
    this.carregar();
    this.actRouter.params.subscribe((data)=>{

    });
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  async mensagem(mensagem, cor){
    const toast = await this.toast.create({
      message: mensagem,
      duration: 2000,
      color: cor
    });
    toast.present();
  }

  ionViewWillEnter(){
    this.carregar();
  }

  buscar(){
    return new Promise(resolve => {
      this.itens = [];
      let dados = {
       id: this.modelo_car_klfree,
        }
        console.log(this.modelo_car_klfree);

        this.provider.dadosApi(dados, 'freedom/buscarcarro').subscribe(data => {
          console.log(data);
         this.listaBusca = data;
        });
        resolve(true);

    });
    
  }






  carregar(){
    return new Promise(resolve => {
      this.itens = [];
      let dados = {
       id_car_klfree : this.id_car_klfree,
       modelo_car_klfree: this.modelo_car_klfree,
        }

        this.provider.dadosApi(dados, 'freedom/buscarcarro').subscribe(data => {
          console.log(data);
         this.itens = data;
        });
        resolve(true);

    });
    
  }
  car(id_car_klfree, modelo_car_klfree, valormax, imagem_car_klfree, calculo){
    this.router.navigate(['freedom-detalhes/' + id_car_klfree+ '/' + modelo_car_klfree + '/' + valormax + '/' + imagem_car_klfree + '/' + calculo])
  }

  doRefresh(event) {
    
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }
  


}


