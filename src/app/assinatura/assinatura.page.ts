import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad';
import { AmortizacaoService } from '../api/service/amortizacao.service';
import { StorageService } from '../api/service/storage.service';

@Component({
  selector: 'app-assinatura',
  templateUrl: './assinatura.page.html',
  styleUrls: ['./assinatura.page.scss'],
})
export class AssinaturaPage {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  image: any;

  constructor(
    public amortizacaoService: AmortizacaoService,
    private storageService: StorageService,
    public navCtrl: NavController, public plt: Platform,
    public modalController: ModalController) {
  }

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 550,
    'canvasHeight': 150,
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

  salvar() {
    if (!this.signaturePad.isEmpty()) {
      //this.viewCtrl.dismiss(this.signaturePad.toDataURL());
      this.storageService.set('img', this.image)
      this.navCtrl.back();

    } else {
      alert('Assinatura Obrigatoria!');
    }
  }

}

