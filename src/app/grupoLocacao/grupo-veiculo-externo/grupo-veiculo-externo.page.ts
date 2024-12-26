import { ClienteService } from './../../api/service/cliente.service';
import { StorageService } from './../../api/service/storage.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { LoadingController, NavController, PopoverController } from '@ionic/angular';
import { LocacaoService } from 'src/app/api/service/locacao.service';
import { Agregados } from 'src/app/model/agregados';
import { DetalhesCarroComponent } from 'src/app/components/detalhes-carro/detalhes-carro.component';
import { GrupoApiService } from 'src/app/api/service/grupo-api.service';


@Component({
  selector: 'app-grupo-veiculo-externo',
  templateUrl: './grupo-veiculo-externo.page.html',
  styleUrls: ['./grupo-veiculo-externo.page.scss'],
})
export class GrupoVeiculoExternoPage implements OnInit {
  // tslint:disable-next-line: no-input-rename

  @ViewChild('referencia') elem: ElementRef;
  // tslint:disable-next-line: no-input-rename
  public isMenuOpen: boolean = false;
  agregados = new Agregados();
  listaGrupoPlano: any;
  lojaRetirada: any;
  lojaDevolucao: any;
  valorPretendido: any;
  id_loja: any;
  id_plano: any;
  sepadador = false;
  /*Criado para ver se esta logado */
  verificacao: any;
  clienteLogado = false;
  clienteDeslogado = false;
  parseString: any;
  tipoPlano: any;
  gruposUpgrade: any;
  grupoDefinido: any;

  constructor(
    public popoverController: PopoverController,
    // tslint:disable-next-line: deprecation
    private rend: Renderer2, public clienteService: ClienteService,
    public storageService: StorageService,
    public apiGrupo: GrupoApiService,
    public apiLoc: LocacaoService,
    public loadingController: LoadingController,
    // tslint:disable-next-line: deprecation
    public nav: NavController) {
    this.storageService.remove('grupoEscolhido');
  }


  ngOnInit() {
    this.presentLoading();
    this.storageService.get('plano').then(lista => {
      this.id_loja = lista.id_loja;
      this.id_plano = lista.id_plano;
      this.agregados.promocao = lista.categoria;
      this.tipoPlano = lista.tipoPlano;
      this.valorPretendido = lista.valor_pretendido;
      if (this.agregados.promocao ? 'promocional' : 'tarifaCheia') {
        this.grupoPlano();
      }
    });
    this.storageService.get('clientekl').then(user => {
      this.verificacao = user;
      if (this.verificacao != null) {
        this.clienteLogado = true;
        this.clienteDeslogado = true;
      } else {
        this.clienteDeslogado = false;
      }
    });
  }

  /*Inicio grupo planos */
  grupoPlano() {
    let params = { id_loja: this.id_loja, id_plano: this.id_plano, tipo_plano: this.tipoPlano };
    this.apiGrupo.getGrupos(params).subscribe((data: any) => {
      if (data.status === true) {
        this.listaGrupoPlano = data.grupos;
        console.log('lista grupo plano', this.listaGrupoPlano)
      } else {
        alert(data.message);
        this.nav.navigateForward('/reserva');
      }
    }, error => {
      console.log('error');
    });
  }

  escolheGrupo(dados) {
    const nome = dados.nome_grupo_car;
    this.parseString = dados.nome_grupo_car;
    this.grupoDefinido = dados;
    if (this.agregados.promocao ? 'promocional' : 'tarifaCheia') {
      this.rend.addClass(this.elem.nativeElement, 'referencia');
      // tslint:disable-next-line: max-line-length
      this.apiGrupo.upgrade({ nome_grupo: nome, id_loja: this.id_loja, id_plano: this.id_plano, tipo_plano: this.tipoPlano }).subscribe((data: any) => {
        if (data.status === true) {
          this.gruposUpgrade = data.grupos;
          this.sepadador = true;
        } else {
          this.acessorios(dados);
        }
      }, error => {
        console.log(error);
      });
    }
  }


  /*metodo para levar pra outra tela */
  acessorios(dados) {
    this.storageService.get('plano').then(lista => {
      const params = {
        id_plano: this.id_plano,
        categoria: lista.categoria, id_loja: this.id_loja, dias: lista.dias, dataRet: lista.dataRet,
        dataDev: lista.dataDev, hora: lista.hora, lojaRet: lista.loja, grupo: dados
      };
      this.storageService.set('grupoEscolhido', params);
      this.nav.navigateBack('/seguro-externo');
    });
  }


  async presentPopover(dados) {
    const popover = await this.popoverController.create({
      component: DetalhesCarroComponent,
    });
    this.storageService.set('detalhes-carro', dados);
    return await popover.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'aguarde o processamento...',
      spinner: 'lines',
      duration: 2000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}

