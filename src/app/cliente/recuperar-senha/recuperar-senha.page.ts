import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

 cliente: any;
 emailParams: any;

  constructor(private router: ActivatedRoute ) { }

  ngOnInit() {
     this.emailParams = this.router.snapshot.paramMap.get('myEmail');
     console.log('Params: ',  this.emailParams );
  }

}
