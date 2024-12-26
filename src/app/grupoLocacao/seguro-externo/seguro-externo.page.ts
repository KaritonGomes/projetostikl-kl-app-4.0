import { ClienteService } from './../../api/service/cliente.service';
import { StorageService } from './../../api/service/storage.service';
import { Component, ViewChild, ElementRef, Renderer2, OnInit, } from '@angular/core';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { LocacaoService } from 'src/app/api/service/locacao.service';
import { Agregados } from 'src/app/model/agregados';
import { GrupoApiService } from 'src/app/api/service/grupo-api.service';

@Component({
  selector: 'app-seguro-externo',
  templateUrl: './seguro-externo.page.html',
  styleUrls: ['./seguro-externo.page.scss'],
})
export class SeguroExternoPage implements OnInit {
  @ViewChild('inativado') el: ElementRef;
  agregados = new Agregados();
  lavagem = 0;
  seguro: any;
  total = 0;
  instituicao = true;
  valorDoacao = 1;
  listaGrupo: any;
  /*atributos do card adicionais*/
  listaAcessorios: any;
  listaRadioSeguro: any;
  /*Calculo para os planos*/
  valorPretendido: any;
  /*Criado para ver se esta logado */
  verificacao: any;
  clienteLogado = false;
  clienteDeslogado = false;
  /*Criado nova forma para calculo de acessorio */
  acessoriosSelecionados = [];
  qtdItemAce = [];
  dias = 0;
  condutoresSelecionados = [];
  qtdItemcond = [];
  incrementar = 0;
  totalValorCondutor = 0;
  detalhesAcerc: any;

  listaDesconto: any;
  valorDescontoPromo = 0;
  id_plano: any;
  titulo_desc: any;

  constructor(
    public clienteService: ClienteService,
    public storageService: StorageService,
    public alertController: AlertController,
    public apiGrupo: GrupoApiService,
    public nav: NavController,
    public apiLoc: LocacaoService,
    public rend: Renderer2,
    public loadingController: LoadingController
  ) {

  }

  async ngOnInit() {
    this.presentLoading();
    let grupoEscolhido = await this.storageService.get('grupoEscolhido');

    this.listaGrupo = grupoEscolhido;
    this.agregados.categoria = grupoEscolhido.categoria;

    this.dias = grupoEscolhido.dias;
    this.agregados.nomeGrupo = grupoEscolhido.grupo.nome_grupo_car;
   
    this.agregados.valorGrupo = grupoEscolhido.grupo.valor_loc_car;

    this.valorPretendido = grupoEscolhido.grupo.valor_pretendido;
    this.agregados.percentSeguroBasico = grupoEscolhido.grupo.seguro_basico_perc;
    this.agregados.percentSeguroPlus = grupoEscolhido.grupo.seguro_plus_perc;
    this.agregados.seguroAtivoPlano = true;
    this.id_plano = grupoEscolhido.id_plano;
    
    if(grupoEscolhido.id_loja!=2){
      this.lavagem=50;
    }else{
      this.lavagem=70;
    }

    this.calcular();
    this.radio();
    this.buscarDesconto(this.id_plano);
    this.buscarAcessorios();
    this.calcularSeguro

    let user = await this.storageService.get('clientekl');
    this.verificacao = user;
    if (this.verificacao != null) {
      this.clienteLogado = true;
      this.clienteDeslogado = true;
    } else {
      this.clienteDeslogado = false;
    }
  // Selecionar o primeiro item da lista de radios
  if (this.listaRadioSeguro && this.listaRadioSeguro.length > 0) {
    this.seguro = this.listaRadioSeguro[0].value;
    this.calcularSeguro();
  }
  }


  novaDoacao(valor) {
    if (this.instituicao === true) {
      this.valorDoacao = 1;
      if (valor > 1) {
        this.valorDoacao = valor;
        return this.valorDoacao;
      }
    } else {
      this.valorDoacao = 0;
      return this.valorDoacao;
    }
  }

  trocarLavagem(lavagem) {
    lavagem.detail.checked = true;
  }

  calcular() {
    if (this.agregados.categoria === 'promocional') {
      this.total = this.valorPretendido - ((this.agregados.valorGrupo * this.agregados.percentSeguroBasico) / 100) * this.dias;
      this.total = this.total + this.lavagem + this.valorDoacao + this.getValorTotalAce() + this.totalValorCondutor;
      return this.total;
    } else {
      this.agregados.valorGrupo = parseFloat(this.agregados.valorGrupo);
      this.total = this.dias * this.agregados.valorGrupo + this.lavagem +
        this.valorDoacao + this.getValorTotalAce() + this.totalValorCondutor;
      return this.total;
    }
  }

  buscarAcessorios() {
    this.apiGrupo.acessorios().subscribe(
      (data: any) => {
        if (data.status === true) {
          this.listaAcessorios = data.acessorios;
        } else {
          console.log(data.message);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  /*metodo para buscar e  fazer calculo do acessorio */

  changeAcessorio(val, tipo) {
    if (this.acessoriosSelecionados.find((acessorio) => acessorio.id === val.id)) {
      if (tipo === 'add') {
        this.acessoriosSelecionados.forEach((obj, index, objs) => {
          if (val.id === obj.id) {
            objs[index] = val;
            objs[index].qtdItem++;
          }
        });
      } else {
        this.acessoriosSelecionados.forEach((obj, index, objs) => {
          if (val.id === obj.id && obj.qtdItem >= 1) {
            objs[index] = val;
            objs[index].qtdItem--;

          }
        });
      }
    } else if (tipo === 'add') {
      const newAcessorio = val;
      newAcessorio.qtdItem = 1;
      this.acessoriosSelecionados.push(newAcessorio);
    }
  }

  getAcessorio(acessorio) {
    const acessorioB = this.acessoriosSelecionados.find((item) => item.id === acessorio.id);
    if (acessorioB) {
      return acessorioB.qtdItem;
    } else {
      return 0;
    }
  }
  getValor(acessorio) {
    const acessorioB = this.acessoriosSelecionados.find((item) => item.id === acessorio.id);
    if (acessorioB) {
      return acessorioB.qtdItem * acessorioB.valor_ace * this.dias;
    } else {
      return 0;
    }
  }

  getValorTotalAce() {
    let valorTotal = 0;
    this.acessoriosSelecionados.forEach((obj, index, objs) => {
      this.detalhesAcerc = objs;
      valorTotal += obj.qtdItem * obj.valor_ace * this.dias;
    });
    return valorTotal;
  }

  /*metodo para fazer calculo do condutor */
  changeCondutor(tipo) {
    if (tipo === 'add') {
      this.incrementar = this.incrementar + 1;
      this.totalValorCondutor = this.incrementar * this.dias * 4;
      this.condutoresSelecionados.push(this.incrementar);
      return this.totalValorCondutor;
    } else {
      if (this.incrementar > 0) {
        this.incrementar = this.incrementar - 1;
        this.totalValorCondutor = this.incrementar * this.dias * 4;
        this.total = this.total - this.totalValorCondutor;
        this.condutoresSelecionados.push(this.incrementar);
        return this.totalValorCondutor;
      } else {
        console.log('NÃO PODE');
      }
    }
  }

  calcularSeguro() {
    const condicao = this.seguro;
  
    if (condicao === 28) {
      const valorSeguroPlus = this.agregados.valorGrupo * this.agregados.percentSeguroPlus;
      const valorSeguroPlusDias = (valorSeguroPlus / 100) * this.dias;
      this.agregados.calcularSeguroPlus = valorSeguroPlusDias;
      this.agregados.calcularSeguroBasico = 0;
      if (this.el) {
        this.rend.addClass(this.el.nativeElement, 'inativado');
      }
      return this.agregados.calcularSeguroPlus;
  
    } else if (condicao === 48) {
      const valorSeguroBasico = this.agregados.valorGrupo * this.agregados.percentSeguroBasico;
      const valorSeguroBasicoDias = (valorSeguroBasico / 100) * this.dias;
      this.agregados.calcularSeguroBasico = valorSeguroBasicoDias;
      this.agregados.calcularSeguroPlus = 0;
      if (this.el) {
        this.rend.addClass(this.el.nativeElement, 'inativado');
      }
      return this.agregados.calcularSeguroBasico;
    }
  }

  radio() {

    this.agregados.seguroplanoBasico = (this.agregados.valorGrupo * this.agregados.percentSeguroBasico) / 100;
    this.agregados.seguroNormalBasico =
      (this.agregados.valorGrupo * this.agregados.percentSeguroBasico) / 100;

    this.agregados.seguroplanoCompleto =
      (this.agregados.valorGrupo * this.agregados.percentSeguroPlus) / 100;
    this.agregados.seguroNormalCompleto =
      (this.agregados.valorGrupo * this.agregados.percentSeguroPlus) / 100;

    this.listaRadioSeguro = [
      {
        id: '1',
        name: 'basico',
        value: 48,
        text: 'Seguro básico',
        disabled: false,
        color: 'primary',
        seg: this.agregados.seguroplanoBasico,
        segNormal: this.agregados.seguroNormalBasico
      },
      {
        id: '2',
        name: 'completo',
        value: 28,
        text: 'Seguro premium',
        disabled: false,
        color: 'secondary',
        seg: this.agregados.seguroplanoCompleto,
        segNormal: this.agregados.seguroNormalCompleto,
      },
    ];
  }

  buscarDesconto(id) {
    this.apiGrupo.descontos(id).subscribe((data: any) => {
      this.listaDesconto = data.desconto_desc;
      this.titulo_desc = data.titulo_desc;
      console.log(JSON.stringify(data));
    }, error => {
      console.log(JSON.stringify(error));
    });
  }
  async continuar() {
    if (this.seguro > 0) {
      let resp = await this.storageService.get('grupoEscolhido');
      const params = {
        titulo: this.titulo_desc,
        desconto: this.listaDesconto,
        doacao: this.valorDoacao,
        cond: this.incrementar,
        totalAce: this.getValorTotalAce(),
        totalCond: this.totalValorCondutor,
        acessorios: this.acessoriosSelecionados,
        segBasico: this.agregados.calcularSeguroBasico,
        segPlus: this.agregados.calcularSeguroPlus,
        dataRet: resp.dataRet,
        dataDev: resp.dataDev,
        hora: resp.hora,
        lojaRet: resp.lojaRet,
        seguro: this.agregados.calcularSeguro,
        total: this.total,
        grupo: this.listaGrupo,
      };
      // alert(JSON.stringify(params));
      this.storageService.set('finalizar', params);
      this.nav.navigateForward('/finalizar-reserva');
    } else {
      alert('adicionar seguro');
    }
  }


  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'atualizando...',
      spinner: 'lines',
      duration: 2000,
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
}
