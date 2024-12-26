import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { GlobalService } from '../api/service/global.service';

import { StorageService } from '../api/service/storage.service';
import { ToastService } from '../api/service/toast.service';
import { Cliente } from '../model/shared/cliente';
import { ThemeService } from '../api/service/theme.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public cliente = new Cliente();
  public list: Cliente[] = [];
  public badgeNumber: number;
  public loginMenu = { email: '', senha: '', token_fb: '', token_cli: '' };


  constructor(
    public theme: ThemeService,
    public toast: ToastService,
    private globalService: GlobalService,
    private menu: MenuController,
    public nav: NavController,
    private storageService: StorageService) {

    this.menu.enable(false, 'externo');
    this.menu.enable(true, 'interno');

  }
  ionViewWillEnter() {

    this.iniciaTela();

    this.theme.tema_app().subscribe((data: any) => {
      this.theme.setTheme(data);
    });

  }

  async iniciaTela() {
    await this.storageService.get('clientekl').then(val => {
      if (val) {
        this.cliente = val;
        this.cliente.nome = val.nome;
        this.globalService.buscarTotalNotificacoes(this.cliente.id);
        this.globalService.buscarBoleto(this.cliente.id);

      } else {
        this.nav.navigateRoot('/login');
        this.menu.close();
        this.menu.close('interno');
      }
      this.loginMenu.email = this.cliente.email;
    });
  }

  totalNotificacoes(): number {
    return this.globalService.numeroNotificacao;
  }
  totalBoletos(): number {
    return this.globalService.numeroBoleto;

  }

}
