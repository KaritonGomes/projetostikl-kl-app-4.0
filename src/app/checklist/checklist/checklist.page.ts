import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ChecklistService } from 'src/app/api/service/checklist.service';
import { StorageService } from 'src/app/api/service/storage.service';
import { ToastService } from 'src/app/api/service/toast.service';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage {

  public locacoes = [];
  public placa_car: string;
  public usuario: any;
  public listaCondutores = [];
  versao: any;
  constructor(
    public route: Router,
    public loadingController: LoadingController,
    public nav: NavController,
    public checklistService: ChecklistService,
    private storageService: StorageService,
    public toastService: ToastService, private alertCtrl: AlertController) {
  }

  ionViewDidEnter() {
    this.pesquisarLocacao();
    this.limparStorage();
  }

  async pesquisarLocacao() {
    if (this.placa_car == undefined || this.placa_car == '') {
      this.locacaoDia();
    } else {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Por favor, espere...',
        duration: 2000,
        backdropDismiss: true
      });
      await loading.present();
      this.checklistService.pesquisarLocacao(this.placa_car).subscribe((data: any) => {
        if (data.status !== false) {
          loading.dismiss();
          this.locacoes = data;
          console.log('placa', this.locacoes);
        } else {
          console.log('sem locacao');
          loading.dismiss();
          this.locacoes = [];
          this.toastService.showError('Nada encontrado');
        }
      }, error => {
        alert('3');
        console.log(error);
      });
    }
  }

  async locacaoDia() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    this.checklistService.locacaoDia().subscribe((data: any) => {
      if (data.status != false) {
        loading.dismiss();
        this.locacoes = data;
        //console.log(this.locacoes);
      } else {
        loading.dismiss();
        this.locacoes = []
        this.toastService.showError('Nada encontrado');
      }
    }, error => console.log(error));
  }

  async fazerChecklist(locacao, tipo_check) {

    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    let dados = {
      locacao: locacao,
      tipo_check: tipo_check
    }
    this.checklistService.pesquisaChecklist(locacao.id_Loc, locacao.id_car, tipo_check).subscribe((data: any) => {
      if (data.status == false) {
        loading.dismiss();
        this.limparStorage()
        this.storageService.set('dadosParams', dados);
        this.nav.navigateBack('fazer-checklist');
      } else {
        loading.dismiss();
        alert("CheckList Não Pode Ser Refeito!");
        // this.presentConfirm(dados, data);
      }
    });
  }


  /*presentConfirm(dados, data) {
    let alert = this.alertCtrl.create({
      title: 'Refazer o Check List?',
      message: 'Você deseja realmente refazer o Check List?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let atualiza = {
              id_checklist: data.id_check_list,
              status: '1'
            };
            // console.log(data);
            this.checProvider.atualizarStatusChecklist(atualiza).subscribe(data => {
              if (data.status) {
                this.navCtrl.push(ChecklistPage, dados);
              } else {
                // console.log('Erro!');
              }
            });
          }
        }
      ]
    });
    alert.present();
  }*/

  async verChecklist(id_Loc) {
    await Browser.open({ url: this.checklistService.url + '../documentos/checklist/' + id_Loc });
  }

  verTodosChecklist(id) {
    this.storageService.set('id_loc_check', id);
    this.nav.navigateBack('historico_check');
  }

  atendimento(item) {
    this.storageService.set('atendimento', item);
    this.nav.navigateBack('atendimento');
  }
  sair() {
    this.storageService.remove("check");
    this.nav.navigateRoot('autenticar');
  }
  //metodo para atualiza
  atualiza(refresher: { complete: () => void; }) {
    this.storageService.get("check").then(val => {
      this.usuario = val;
      this.pesquisarLocacao();
      console.log('atualiza');
    });
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  limparStorage() {
    this.storageService.remove('listaItens');
    this.storageService.remove('itensAvarias');
    this.storageService.remove('idCheck');
    this.storageService.remove('itensClicado');
  }

}
