export class NotificacaoModel {
    arquivado_lei: string;
    cliente_id_notif: string;
    data_arquivado_lei: string;
    data_lido_lei: string;
    data_notif: string;
    falhas: string;
    id_cliente_lei: string;
    id_lei: string;
    id_notif: string;
    id_notificacao_lei: string;
    lido: string;
    lido_lei: string;
    mensagem: string;
    not_user_id: string;
    sucesso: string;
    tipo_notif: string;
    titulo_notif: string;
}
export class SampleShellListingModel {
    items: Array<NotificacaoModel> = [
        new NotificacaoModel(),
        new NotificacaoModel(),
        new NotificacaoModel()
    ];

    constructor(readonly isShell: boolean) { }
}
