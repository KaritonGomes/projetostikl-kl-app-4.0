import { ModalController, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';
import { ChecklistService } from 'src/app/api/service/checklist.service';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  image: any;

  constructor(public modalController: ModalController, public nav: NavController, public checklistService: ChecklistService,) { }
  public signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  ionViewDidLoad() {
    this.signaturePad.set('minWidth', 2); // set szimek/signature_pad options at runtime
    //this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  drawComplete() {
    this.image = this.signaturePad.toDataURL();
  }

  drawStart() {
    this.image = this.signaturePad.toDataURL();
  }

  limpar() {
    this.image = false
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
  cancelar() {
    this.modalController.dismiss();
  }

  async salvar() {
    if (!this.signaturePad.isEmpty()) {
      await this.modalController.dismiss(this.image);

    } else {
      alert('Assinatura Obrigatoria!');
    }
  }

}
