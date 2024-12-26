export class Locacao {
    id_Loc?: number;
    carro_id: number;
    modelo_car?: string;
    cor_car?: string;
    ano_car?: string;
    placa_car?: string;
    dataLoc?: Date;
    dataDevolucao?: Date;
    dataPrev?: Date;
    carroDiaria?: string;
    kmInicial?: string;
    kmFinal?: string;
    valorAmortizado?: string;
    valorRestante?: string;
    txdevolucao?: string;
    qtd_dias?: string;
    status: string;
}
