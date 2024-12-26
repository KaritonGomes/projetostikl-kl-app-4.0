import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Cliente } from '../../model/shared/cliente';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(public api: ApiService, public http: HttpClient) { }


  // buscar o cep
  buscarCep(cep) {
    return this.http.get('https://viacep.com.br/ws/' + cep + '/json/');
  }
  // metodo para adicionar
  cadastro(data: Cliente) {
    return this.api.post('cliente/cadastro', data, httpOptions);
  }

  // metodo para logar
  loginCliente(data: any) {
    return this.api.post('cliente/login', data, httpOptions);

  }
  // metodo para editar
  editCliente(data: Cliente) {
    return this.api.post('cliente/editar', data, httpOptions);
  }
  // metodo para alterar senha
  alterarSenha(data: Cliente) {
    return this.api.post('cliente/alterar_senha', data, httpOptions);
  }

  verificarCpf(data: any): Promise<any> {
    return this.api.post('validacao/valida_cpf', data, httpOptions).toPromise();
  }
  verificarEmail(data: any): Promise<any> {
    return this.api.post('validacao/valida_email', data, httpOptions).toPromise();
  }

  recuperarSenha(data: any) {
    return this.api.post('validacao/recuperar_senha', data, httpOptions);
  }
  verificaVersao() {
    return this.api.get('validacao/verifica_versao', false, httpOptions);
  }

  cadastroToken(dado: any, version: any) {
    const data = {
      token: dado,
      versao: version


    };
    return this.api.post('cliente/salvar_token', data, httpOptions);
  }

  atualizaToken(data: any) {
    return this.api.post('cliente/atualiza_token', data, httpOptions);
  }

  salvaLocalizacao(data: any) {
    return this.api.post('cliente/salvar_localizacao', data, httpOptions);
  }

  buscarFotoPerfil(idCliente: any) {
    const params = { id_cliente: idCliente };
    return this.api.get('cliente/buscar_foto', params, httpOptions);
  }
 
  atualizar_end(data: Cliente) {
    return this.api.post('cliente/editar_endApp', data, httpOptions);
  }

  atualizar_cnh(data: Cliente) {
    return this.api.post('cliente/editar_cnhApp', data, httpOptions);
  }

  cadastro_cartao(data: any) {
    return this.api.post('cartao_credito/salvar_cartao', data, httpOptions);
  }

  cartaoAutorizacao(data: any) {
    return this.api.post('cartao_credito/buscar_url_autorizacao', data, httpOptions);
  }
  buscarPromocao(data: any) {
    return this.api.post('promocao/buscar_codigos', data, httpOptions);
  }

  buscarEnderecoApp(idCli: number) {
    return this.api.get('cliente/endereco_app?id_cli=' + idCli, httpOptions);
  }
  atualizaEnderecoApp(data: any) {
    return this.api.post('cliente/atualiza_endereco_app', data, httpOptions);
  }
  deletarConta(cliente_id: any){
    const params = { id: cliente_id };

    return this.api.get('cliente/delete_cli', params, httpOptions)
  }
  indicacao(cliente_id: any, email_indicado: any){
    const params = { id: cliente_id , email: email_indicado};
    return this.api.get('cliente/cliente_indicacao', params, httpOptions)
  }

  indicados(cliente_id: any){
    const params = { id: cliente_id};
    return this.api.get('cliente/buscar_indicacao', params, httpOptions)
  }

}


