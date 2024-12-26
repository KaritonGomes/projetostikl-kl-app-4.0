import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage-angular';

import { ApiService } from './api.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AmortizacaoService {

  constructor(public api: ApiService, public storage: Storage) { }


  // metodo para logar
  abrirAmortizacao(data: any) {
    return this.api.post('pagamento/abrir_pedido', data, httpOptions);
  }

  // metodo para logar
  atualizarAmortizacao(data: any) {
    return this.api.post('pagamento/atualizar_km_pedido', data, httpOptions);
  }

  // metodo para logar
  amortizarCredito(data: any) {
    return this.api.post('pagamento/amortizar_credito', data, httpOptions);
  }


  amortizarDebito(data: any) {
    return this.api.post('pagamento/amortizar_debito', data, httpOptions);
  }

  verificaLoc(data: any) {
    return this.api.post('pagamento/verifica_locacao', { id_locacao: data }, httpOptions);
  }


  verificaPedido(data: any) {
    return this.api.post('pagamento/buscar_pedido', { id_pedido: data }, httpOptions);
  }

  mostrarPagamento(idloc: any, qtd_diarias: any) {
    return this.api.post('pagamento/calcular_pagamento', { id_locacao: idloc, numero_diarias: qtd_diarias }, httpOptions);
  }
  todosPagamento(id: string | number) {
    const params = { id_cliente: id };
    return this.api.get('pagamento/todos_pagamentos', params, httpOptions);
  }
  pagamento_aprovado(id: string | number) {
    const params = { id_cliente: id };
    return this.api.get('pagamento/pagamentos_aprovado', params, httpOptions);
  }

  continuar_deposito(data: any) {
    return this.api.post('pagamento/continuar_deposito', data, httpOptions);
  }

  verificarPendencias(id_Loc: any) {
    const params = { id_locacao: id_Loc };
    return this.api.post('pagamento/verifica_pendencias', params, httpOptions);
  }

  buscarLojas(novo = false) {
    if (novo) {
      return this.api.get('lojas/buscar_novas', false, httpOptions);
    } else {
      return this.api.get('lojas/buscar', false, httpOptions);
    }

  }

  deposito(data: any) {
    return this.api.post('pagamento/amortizar_deposito', data, httpOptions);
  }
  assinatura(data: any) {
    return this.api.post('pagamento/assinatura', data, httpOptions);
  }
  buscar_assinatura(data: any) {
    return this.api.post('pagamento/buscar_assinatura', data, httpOptions);
  }
  update_pedido(id: string | number) {
    const params = { id_pedido: id };
    return this.api.get('pagamento/mudar_confirma_assinatura', params, httpOptions);
  }
  verificarPedidoDeposito(id_Loc: any) {
    const params = { id_locacao: id_Loc };
    return this.api.post('pagamento/verificar_pedido_deposito', params, httpOptions);
  }
}
