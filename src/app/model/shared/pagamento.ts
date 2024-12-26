export class Pagamento {
  id_locacao: number;
  id_pedido: number;
  holder_card: string;
  qtd_dia_normal: Number = 0;
  qtd_dia_multa: Number = 0;
  numero_cartao: string;
  codigo_verificacao: string;
  ano_validade: string;
  mes_validade: string;
  bandeira: string;
  numero_parcelas: any;
  numero_diarias: any;
  
  file: any;
  numero_transacao: any;
  valor_depositado: any;
  tipo_transacao: any;

  status_ped_am: any;
  faltaFotos: any;
  faltaAutorizacao: any;
  id_ped_am: any;
  id_loc_ped_am: any;
  data_ped_am: any;
  dias_normais_pg: any;
  carroDiaria: any;
  total_pago: any;

 
}
