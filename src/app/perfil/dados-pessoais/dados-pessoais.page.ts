import { StorageService } from './../../api/service/storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../model/shared/cliente';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.page.html',
  styleUrls: ['./dados-pessoais.page.scss'],
})
export class DadosPessoaisPage implements OnInit {

  @ViewChild('form') form: NgForm;
  id: any;
  cliente = new Cliente();
  constructor(private router: ActivatedRoute, public storageService: StorageService) { }

  ngOnInit() {
    this.id = this.router.snapshot.paramMap.get('id');
    this.storageService.get('clientekl').then(sucess => {
      if (sucess) {
        this.cliente.nome = sucess.nome;
        this.cliente.email = sucess.email;
        this.cliente.senha = sucess.senha;
        this.cliente = sucess;
        console.log(this.cliente);
      }
    });
  }

}
