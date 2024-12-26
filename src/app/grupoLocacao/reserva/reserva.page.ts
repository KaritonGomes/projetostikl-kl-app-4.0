import { ClienteService } from './../../api/service/cliente.service';
import { StorageService } from './../../api/service/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { LojasService } from 'src/app/api/service/lojas.service';
import { Lojas } from 'src/app/model/shared/lojas';
import { LocacaoService } from 'src/app/api/service/locacao.service';
import { ToastService } from 'src/app/api/service/toast.service';
import { GrupoApiService } from 'src/app/api/service/grupo-api.service';




@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  segmentModel = 'tarifa';
  loja = new Lojas();
  listaLoja: any;
  listaLojaRet: any;
  lojaDevolucao = true;
  myDate = new Date();
  myDateDev = new Date();
  datePickerDev: any = {};
  disabledDates: Date[] = [];
  dataMaxima: Date;
  dataFormatadaDev = '';
  totalDias = 0;
  horasValues: number[] = [];
  plano: any;
  /*lista para buscar os planos*/
  listaLojaPlano: any;
  listaPlano: any;
  idPlano: number;
  cardHoras = false;
  dataFormatada = '';
  datePickerObj: any = {};
  horaEscolhida: any;

  /*form build plano e tarifa*/
  grupofb: FormGroup;
  grupoPlano: FormGroup;

  verificacao: any;
  clienteLogado = false;
  clienteDeslogado = false;

  constructor(
    public alertController: AlertController,
    public clienteService: ClienteService,
    public storageService: StorageService,
    public apiGrupo: GrupoApiService,
    public nav: NavController,
    private fb: FormBuilder,
    public toast: ToastService,
    public apiLoc: LocacaoService,
    public loadingCtrl: LoadingController,
    public apiLoj: LojasService) {
    this.grupofb = this.fb.group({
      //  tipoPlano: new FormControl('', [Validators.required]),
      localRetirada: new FormControl('', [Validators.required]),
      dataRetirada: new FormControl('', [Validators.required]),
      dataDevolucao: new FormControl('', [Validators.required]),
      horaRetirada: new FormControl('', [Validators.required]),
    });
    this.grupoPlano = this.fb.group({
      //  tipoPlano: new FormControl('', [Validators.required]),
      localRetirada: new FormControl('', [Validators.required]),
      dataRetirada: new FormControl('', [Validators.required]),
      // dataDevolucao: new FormControl('', [Validators.required]),
      horaRetirada: new FormControl('', [Validators.required]),
    });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  async ngOnInit() {
    this.apiLoj.buscarLojas(true).subscribe(res => {
      this.listaLoja = res;
      this.listaLojaRet = res;
    }, erro => {
      console.log('Erro: ' + erro.message);
    }
    );
    this.apiLoj.buscarPlano().subscribe(res => {
      this.listaPlano = res;
      //  console.log(this.listaPlano);
    }, erro => {
      console.log('Erro: ' + erro.message);
    });
    this.datePlano();
    this.datePlanoDev();
    let user = await this.storageService.get('clientekl');
      this.verificacao = user;
      if (this.verificacao != null) {
        this.clienteLogado = true;
        this.clienteDeslogado = true;
      } else {
        this.clienteDeslogado = false;
      }

    this.disabledDates.push(this.myDate);
  }

  
  itemPlano(item) {
    const s = item.id_pla;
    this.idPlano = Number(s);
  }


  async continuarPlano() {
    const loader = await this.loadingCtrl.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 300,
      showBackdrop: true,
    });
    await loader.present();
    const s = this.loja.id_loj_esta;
    this.loja.id_loj_esta = Number(s);
    if (this.idPlano > 0) {
      // tslint:disable-next-line: max-line-length
      const params = { categoria: 'promocional', tipoPlano: '2', id_loja: this.loja.id_loj_esta, id_plano: this.idPlano, dias: '30', loja: this.loja.titulo_loj_app, dataRet: this.dataFormatada, hora: this.horaEscolhida };
      this.storageService.set('plano', params);
      // alert(JSON.stringify(params));
      this.nav.navigateForward('/grupo-veiculo-externo');

    } else {
      alert('Selecione um plano');
    }
  }
  async continuar() {
    const loader = await this.loadingCtrl.create({
      message: 'Aguarde ...',
      spinner: 'crescent',
      duration: 300,
      showBackdrop: true,
    });
    await loader.present();
    const s = this.loja.id_loj_esta;
    this.loja.id_loj_esta = Number(s);
    const ld = this.loja.id_loj_devolucao;
    this.loja.id_loj_devolucao = Number(ld);
    if (this.totalDias > 0 && this.horaEscolhida > 0) {
      // tslint:disable-next-line:max-line-length
      const params = { categoria: 'tarifaCheia', tipoPlano: '1', dias: this.totalDias, id_loja: this.loja.id_loj_esta, id_loja_devolucao: this.loja.id_loj_devolucao, dataRet: this.dataFormatada, dataDev: this.dataFormatadaDev, hora: this.horaEscolhida };
      // alert(JSON.stringify(params));
      this.storageService.set('plano', params);
      this.nav.navigateForward('/grupo-veiculo-externo');
    } else {
      alert('Data de devolução e menor que a data de retirada');
    }
  }

  /*Fim Metodos para plano promocional*/
  mudarLojaDev() {
    if (this.lojaDevolucao === true) {
      console.log('nda');
      this.loja.id_loj_devolucao = 0;
    } else {
      // alert('devolução em outra loja tem o acrescimo de 50 reais');
      this.lojaDevolucao = false;
    }

  }

  async calcularDias() {
    const d1 = moment(this.dataFormatada, 'DD-MM-YYYY');
    const d2 = moment(this.dataFormatadaDev, 'DD-MM-YYYY');
    if (d1 > d2) {
      const alert = await this.alertController.create({
        subHeader: 'Escolha uma data superior',
        message: 'Data selecionada e menor que a data anterior',
        buttons: ['OK']
      });

      await alert.present();
      this.dataFormatadaDev = null;
    } else {
      const days = d2.diff(d1, 'days');
      // alert(`Difference in days: ${days}`);
      this.totalDias = days;
      console.log(this.totalDias);
    }
  }
  // metodo de buscar dias invalidos
  async diasInvalidos(idLoja: any) {

    const loader = await this.loadingCtrl.create({
      message: ' Buscando dia. Aguarde ...',
      spinner: 'crescent',
      duration: 300,
      showBackdrop: true,
    });
    await loader.present();
    this.apiLoc.diasIvalidos(idLoja).subscribe((result: any) => {
      // console.log('dse', result);
      this.dataMaxima = new Date(result.ano, result.mes, result.dia);
      result.datas_invalidas.forEach((data: string | number | Date) => {
        this.disabledDates.push(new Date(data));
        this.dataFormatada = '';
        this.dataFormatadaDev = '';

      });
    });
    this.verificarOnChangeHoras();
  }

  async verificarOnChangeHoras() {
    const loader = await this.loadingCtrl.create({
      message: 'Verificando horas válidas. Aguarde ...',
      spinner: 'crescent',
      duration: 3000,
      showBackdrop: true,
    });
    await loader.present();
    setTimeout(() => {
      const dataArray = Array.from(this.dataFormatada.split('/'));
      const dataFormatada = dataArray[2] + '-' + dataArray[1] + '-' + dataArray[0];
      this.myDate = new Date(Number(dataArray[2]), Number(dataArray[1]) - 1, Number(dataArray[0]));
      this.apiLoc.horaMaxima(this.loja.id_loj, dataFormatada).subscribe((data: any) => {
        this.horasValues = data;
        this.cardHoras = true;
        console.log('ops', this.horasValues);

      }, error => {
        this.toast.showError(error);
      }
      );
    }, 300);
  }

  datePlano() {
    this.datePickerObj = {
      inputDate: this.myDate.getDate(), // default new Date()
      fromDate: new Date(), // default null
      toDate: this.dataMaxima, // default null
      showTodayButton: false, // default true
      closeOnSelect: true, // default false
      disableWeekDays: [0], // default []
      mondayFirst: true, // default false
      setLabel: 'Selecionar',  // default 'Set'
      todayLabel: 'Hoje', // default 'Today'
      closeLabel: 'Fechar', // default 'Close'
      disabledDates: this.disabledDates, // default []
      titleLabel: 'Selecione uma data', // default null
      monthsList: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      dateFormat: 'DD/MM/YYYY', // default DD MMM YYYY
      clearButton: true, // default true
      momentLocale: 'pt-BR', // Default 'en-US'
      yearInAscending: true, // Default false
      btnCloseSetInReverse: true, // Default false
      btnProperties: {
        expand: 'block', // Default 'block'
        fill: '', // Default 'solid'
        size: '', // Default 'default'
        disabled: '', // Default false
        strong: '', // Default false
        color: 'success' // Default ''
      },
      arrowNextPrev: {
        // nextArrowSrc: 'assets/arrow_right.svg',
        // prevArrowSrc: 'assets/arrow_left.svg'
      }, // This object supports only SVG files.
      highlightedDates: [
        // { date: new Date('2019-09-10'), color: '#ee88bf', fontColor: '#fff' },
        // { date: new Date('2019-09-12'), color: '#50f2b1', fontColor: '#fff' }
      ] // Default []
    };
  }
  datePlanoDev() {
    this.datePickerDev = {
      inputDate: this.myDateDev, // default new Date()
      fromDate: new Date(), // default null
      toDate: this.dataMaxima, // default null
      showTodayButton: false, // default true
      closeOnSelect: true, // default false
      disableWeekDays: [0], // default []
      mondayFirst: true, // default false
      setLabel: 'Selecionar',  // default 'Set'
      todayLabel: 'Hoje', // default 'Today'
      closeLabel: 'Fechar', // default 'Close'
      disabledDates: this.disabledDates, // default []
      titleLabel: 'Selecione uma data', // default null
      monthsList: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      dateFormat: 'DD/MM/YYYY', // default DD MMM YYYY
      clearButton: true, // default true
      momentLocale: 'pt-BR', // Default 'en-US'
      yearInAscending: true, // Default false
      btnCloseSetInReverse: true, // Default false
      btnProperties: {
        expand: 'block', // Default 'block'
        fill: '', // Default 'solid'
        size: '', // Default 'default'
        disabled: '', // Default false
        strong: '', // Default false
        color: 'success' // Default ''
      },
      arrowNextPrev: {
        // nextArrowSrc: 'assets/arrow_right.svg',
        // prevArrowSrc: 'assets/arrow_left.svg'
      }, // This object supports only SVG files.
      highlightedDates: [
        this.myDateDev.setDate(this.myDateDev.getDate() + 1),
        this.myDateDev > this.myDate,


        // { date: new Date('2019-09-10'), color: '#ee88bf', fontColor: '#fff' },
        // { date: new Date('2019-09-12'), color: '#50f2b1', fontColor: '#fff' }
      ] // Default []
    };
  }
}

