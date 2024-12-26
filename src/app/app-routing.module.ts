import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'senha/:myEmail', loadChildren: () => import('./cliente/recuperar-senha/recuperar-senha.module').then(m => m.RecuperarSenhaPageModule) },
  { path: 'fidelidade', loadChildren: () => import('./termo/fidelidade/fidelidade.module').then(m => m.FidelidadePageModule) },

  { path: 'contato', loadChildren: () => import('./contatos/contatos/contatos.module').then(m => m.ContatosPageModule) },
  { path: 'regraLoc', loadChildren: () => import('./locacao/regras/regras.module').then(m => m.RegrasPageModule) },
  { path: 'regraServ', loadChildren: () => import('./servicos/regras/regras.module').then(m => m.RegrasPageModule) },
  { path: 'versao-app', loadChildren: () => import('./versao-app/versao-app.module').then(m => m.VersaoAppPageModule) },
  { path: 'form-cad', loadChildren: () => import('./cliente/form-cad/form-cad.module').then(m => m.FormCadPageModule) },
  { path: 'regras-loc-externo', loadChildren: () => import('./regras-loc-externo/regras-loc-externo.module').then(m => m.RegrasLocExternoPageModule) },
  { path: 'regras-servico-externo', loadChildren: () => import('./regras-servico-externo/regras-servico-externo.module').then(m => m.RegrasServicoExternoPageModule) },
  { path: 'fidelidade-externo', loadChildren: () => import('./fidelidade-externo/fidelidade-externo.module').then(m => m.FidelidadeExternoPageModule) },

  { path: 'lista-termo', loadChildren: () => import('./termo/lista-termo/lista-termo.module').then(m => m.ListaTermoPageModule) },
  { path: 'reserva', loadChildren: () => import('./grupoLocacao/reserva/reserva.module').then(m => m.ReservaPageModule) },
  // tslint:disable-next-line:max-line-length
  { path: 'grupo-veiculo-externo', loadChildren: () => import('./grupoLocacao/grupo-veiculo-externo/grupo-veiculo-externo.module').then(m => m.GrupoVeiculoExternoPageModule) },
  { path: 'seguro-externo', loadChildren: () => import('./grupoLocacao/seguro-externo/seguro-externo.module').then(m => m.SeguroExternoPageModule) },
  { path: 'finalizar-reserva', loadChildren: () => import('./grupoLocacao/finalizar-reserva/finalizar-reserva.module').then(m => m.FinalizarReservaPageModule) },
  { path: 'page-logar', loadChildren: () => import('./page-logar/page-logar.module').then(m => m.PageLogarPageModule) },
  { path: 'regulamento-deposito', loadChildren: () => import('./regulamento-deposito/regulamento-deposito.module').then(m => m.RegulamentoDepositoPageModule) },
  { path: 'cartao', loadChildren: () => import('./pagamentos/cartao/cartao.module').then(m => m.CartaoPageModule) },
  { path: 'assinatura', loadChildren: () => import('./assinatura/assinatura.module').then(m => m.AssinaturaPageModule) },
  { path: 'checklist', loadChildren: () => import('./checklist/checklist/checklist.module').then(m => m.ChecklistPageModule) },
  { path: 'autenticar', loadChildren: () => import('./checklist/autenticar/autenticar.module').then(m => m.AutenticarPageModule) },
  { path: 'historico_check', loadChildren: () => import('./checklist/historico/historico.module').then(m => m.HistoricoPageModule) },
  { path: 'atendimento', loadChildren: () => import('./checklist/atendimento/atendimento.module').then(m => m.AtendimentoPageModule) },
  { path: 'fazer-checklist', loadChildren: () => import('./checklist/fazer-checklist/fazer-checklist.module').then(m => m.FazerChecklistPageModule) },
  { path: 'freedom', loadChildren: () => import('./freedom/freedom.module').then( m => m.FreedomPageModule)},
  { path: 'freedom/:id_car_klfree/:modelo_car_klfree/:valormax/:calculo', loadChildren: () => import('./freedom/freedom.module').then( m => m.FreedomPageModule)},

  { path: 'intro', loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)},
  {
    path: 'freedom-detalhes/:id_car_klfree/:modelo_car_klfree/:valormax/:imagem_car_klfree/:calculo',
    loadChildren: () => import('./freedom-detalhes/freedom-detalhes.module').then( m => m.FreedomDetalhesPageModule)
  },
  {
    path: 'lockedpage',
    loadChildren: () => import('./lockedpage/lockedpage.module').then( m => m.LockedpagePageModule)
  },
  {
    path: 'notificacao-boletos',
    loadChildren: () => import('./notificacao-boletos/notificacao-boletos.module').then( m => m.NotificacaoBoletosPageModule)
  }, {
    path: 'Home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
