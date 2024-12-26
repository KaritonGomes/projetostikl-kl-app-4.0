import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ChecklistService } from 'src/app/api/service/checklist.service';
import { StorageService } from 'src/app/api/service/storage.service';
import { ToastService } from 'src/app/api/service/toast.service';
import { LocacaoModel } from 'src/app/model/shared/locacaoModel';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.page.html',
  styleUrls: ['./atendimento.page.scss'],
})
export class AtendimentoPage {


  public usuario: any;
  public placa_car: string = '';
  public km_carro: any;
  public km_anterior: any;
  public adesivo: any;
  public procedencia: string;
  public observacao: string = '';
  public locacao = new LocacaoModel();
  public listaCondutores: any;
  public diferencakm = 0;
  public dados: any;
  public pesquisado = false;

  constructor(public navCtrl: NavController,
    private storageService: StorageService,
    public loadingController: LoadingController,
    public checklistService: ChecklistService,
    public toastService: ToastService) {
  }

  ionViewDidEnter() {
    this.storageService.get('atendimento').then(result => {
      this.locacao = result;
      this.listaCondutores = result.condutores;
    });
    this.storageService.get("check").then((user: any) => {
      this.usuario = user;

    });

  }

  pesquisarKM() {
    this.diferencakm = this.km_carro - this.locacao.oleo_km_car;
  }
  async pesquisarCarro() {
    if ((this.placa_car != undefined || this.placa_car != '') && this.placa_car.length > 6) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Por favor, espere...',
        duration: 2000,
        backdropDismiss: true
      });
      await loading.present();

      this.checklistService.pesquisarLocacao(this.placa_car).subscribe(data => {
        if (data.status != false) {
          this.dados = data;
          // this.pesquisado = true;
          console.log(JSON.stringify(data));
        } else {
          this.toastService.showError('Nada encontrado');
          //this.pesquisado = false;
        }
        loading.dismiss();
      });
    } else {
      this.dados = false;
    }
  }
  async salvarAtendimento() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Por favor, espere...',
      duration: 2000,
      backdropDismiss: true
    });
    await loading.present();
    if ((this.locacao.placa_car != undefined || this.locacao.placa_car != '') && this.locacao.placa_car.length > 6) {
      if (this.diferencakm > 0) {
        if ((this.procedencia != undefined || this.procedencia != '')) {
          let params = {
            placa_car: this.locacao.placa_car,
            id_cliente: this.locacao.id_cli,
            id_usuario: this.usuario.id_usu,
            km_carro: this.km_carro,
            adesivo: this.adesivo,
            procedencia: this.procedencia,
            observacao: this.observacao
          }

          this.checklistService.salvaAtendimento(params).subscribe(data => {
            if (data.status != false) {
              this.toastService.showSucess(data.message);
              this.navCtrl.navigateRoot('checklist');
              loading.dismiss();
            } else {
              loading.dismiss();
              this.toastService.showError(data.message);
            }

            loading.dismiss();
          });
        } else {
          this.toastService.showError('Prencha o procedimento');
        }
      } else {
        alert('Quilometragem acima do permetido, O veículo deve ser encaminhado imediatamente para a revisão.');
        loading.dismiss();
      }
    } else {
      this.toastService.showError('Prencha a placa');
    }
  }





}

