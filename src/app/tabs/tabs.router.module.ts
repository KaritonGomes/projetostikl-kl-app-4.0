import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(r => r.HomePageModule)
          }
        ]
      },


      {
        path: 'agendamentos',
        children: [
          {
            path: '',
            loadChildren: () => import('../agendamentos/meus-agendamentos/meus-agendamentos.module').then(r => r.MeusAgendamentosPageModule)
          }
        ]
      },
      {
        path: 'regulamento-deposito',
        children: [
          {
            path: '',
            loadChildren: () => import('../regulamento-deposito/regulamento-deposito.module').then(r => r.RegulamentoDepositoPageModule)
          }
        ]
      },
      {
        path: 'nova-locacao',
        children: [
          {
            path: 'reserva',
            loadChildren: () => import('../grupoLocacao/reserva/reserva.module').then(r => r.ReservaPageModule)
          },
          {
            path: 'grupo-veiculo-externo',
            loadChildren: () => import('../grupoLocacao/grupo-veiculo-externo/grupo-veiculo-externo.module').then(r => r.GrupoVeiculoExternoPageModule)
          },
          {
            path: 'seguro-externo',
            loadChildren: () => import('../grupoLocacao/seguro-externo/seguro-externo.module').then(r => r.SeguroExternoPageModule)
          },
          {
            path: 'finalizar-reserva',
            loadChildren: () => import('../grupoLocacao/finalizar-reserva/finalizar-reserva.module').then(r => r.FinalizarReservaPageModule)
          }
        ]
      },

      {
        path: 'locacao',
        children: [
          {
            path: '',
            loadChildren: () => import('../locacao/locacao/locacao.module').then(r => r.LocacaoPageModule)
          },
          {
            path: 'regras',
            loadChildren: () => import('../locacao/regras/regras.module').then(r => r.RegrasPageModule)
          },
          {
            path: 'detalhes',
            loadChildren: () => import('../locacao/detalhes-locacao/detalhes-locacao.module').then(r => r.DetalhesLocacaoPageModule)
          },
          {
            path: 'detalhes-agendamento',
            loadChildren: () => import('../locacao/detalhes-agendamento/detalhes-agendamento.module').then(r => r.DetalhesAgendamentoPageModule)
          },

        ]
      },


      {
        path: 'lojas',
        children: [
          {
            path: '',
            loadChildren: () => import('../lojas/lojas/lojas.module').then(r => r.LojasPageModule)
          },
          {
            path: 'detalhes',
            loadChildren: () => import('../lojas/detalhes/detalhes.module').then(r => r.DetalhesPageModule)
          }
        ]
      },
      {
        path: 'boletos',
        children: [
          {
            path: '',
            loadChildren: () => import('../notificacao-boletos/notificacao-boletos.module').then(r => r.NotificacaoBoletosPageModule)
          }
        ]
      },
      {
        path: 'contatos',
        children: [
          {
            path: '',
            loadChildren: () => import('../contatos/contatos/contatos.module').then(r => r.ContatosPageModule)
          },
        ]
      },
      {
        path: 'configuracao',
        children: [
          {
            path: 'regrasLocacao',
            loadChildren: () => import('../configuracao/regras-locacao/regras-locacao.module').then(r => r.RegrasLocacaoPageModule)
          },
          {
            path: 'regrasServico',
            loadChildren: () => import('../configuracao/regras-servico/regras-servico.module').then(r => r.RegrasServicoPageModule)
          },
        ]
      },

      {
        path: 'termo',
        children: [
          {
            path: 'fidelidade',
            loadChildren: () => import('../termo/fidelidade/fidelidade.module').then(r => r.FidelidadePageModule)
          },
          {
            path: 'tabs-termo',
            loadChildren: () => import('../termo/tabs-termo/tabs-termo.module').then(r => r.TabsTermoPageModule)
          }
        ]
      },

      {
        path: 'servico',
        children: [
          {
            path: 'agendar',
            loadChildren: () => import('../servicos/agenda-servicos/agenda-servicos.module').then(r => r.AgendaServicosPageModule)
          },
          {
            path: 'detalhes',
            loadChildren: () => import('../servicos/detalhes/detalhes.module').then(r => r.DetalhesPageModule)
          },
          {
            path: 'regras',
            loadChildren: () => import('../servicos/regras/regras.module').then(r => r.RegrasPageModule)
          }
        ]
      },

      {
        path: 'perfil',
        children: [
          {
            path: '',
            loadChildren: () => import('../perfil/perfil/perfil.module').then(r => r.PerfilPageModule)
          },
          {
            path: 'endereco',
            loadChildren: () => import('../perfil/endereco/endereco.module').then(r => r.EnderecoPageModule)
          },
          {
            path: 'senha',
            loadChildren: () => import('../perfil/alterar-senha/alterar-senha.module').then(r => r.AlterarSenhaPageModule)
          },
          {
            path: 'dados',
            loadChildren: () => import('../perfil/dados-pessoais/dados-pessoais.module').then(r => r.DadosPessoaisPageModule)
          },
          {
            path: 'foto-residencia',
            loadChildren: () => import('../perfil/foto-residencia/foto-residencia.module').then(r => r.FotoResidenciaPageModule)
          }
        ]
      },

      {
        path: 'pagamento',
        children: [
          {
            path: '',
            loadChildren: () => import('../pagamentos/lista-pagamentos/lista-pagamentos.module').then(r => r.ListaPagamentosPageModule),
          },
          {
            path: 'autenticacao',
            loadChildren: () => import('../pagamentos/autenticacao-banco/autenticacao-banco.module').then(r => r.AutenticacaoBancoPageModule)
          },
          {
            path: 'cartao',
            loadChildren: () => import('../pagamentos/cartao/cartao.module').then(r => r.CartaoPageModule)
          },

        ]
      },
      {
        path: 'documentos',
        children: [
          {
            path: 'veiculo/:idPedido',
            loadChildren: () => import('../documentos/falta-foto-veiculo/falta-foto-veiculo.module').then(r => r.FaltaFotoVeiculoPageModule)
          },
          {
            path: 'fotoDeclare/:idPedido',
            loadChildren: () => import('../documentos/foto-declaracao/foto-declaracao.module').then(r => r.FotoDeclaracaoPageModule)
          },
          {
            path: 'dual',
            loadChildren: () => import('../documentos/dual/dual.module').then(r => r.DualPageModule)
          },
        ]
      },
      {
        path: 'notificacao',
        children: [
          {
            path: 'lista',
            loadChildren: () => import('../notificacao/lista-notificacao/lista-notificacao.module').then(r => r.ListaNotificacaoPageModule)
          },
          {
            path: 'lidas',
            loadChildren: () => import('../notificacao/notificacao-lidas/notificacao-lidas.module').then(r => r.NotificacaoLidasPageModule)
          },

        ]
      },

      {
        path: 'cartao',
        children: [
          {
            path: 'tipo-pagamento-credito',
            loadChildren: () => import('../cartao/tipo-pagamento-credito/tipo-pagamento-credito.module').then(r => r.TipoPagamentoCreditoPageModule)
          },
          {
            path: 'tipo-pagamento-fotos',
            loadChildren: () => import('../cartao/tipo-pagamento-fotos/tipo-pagamento-fotos.module').then(r => r.TipoPagamentoFotosPageModule)
          },

        ]
      },

      {
        path: 'diversos',
        children: [
          {
            path: 'rota',
            loadChildren: () => import('../diversas/rota-revise/rota-revise.module').then(r => r.RotaRevisePageModule)
          },
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
