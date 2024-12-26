import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiFreedom{
    server: string = 'https://klrentacar.com.br/sistema/api/';
    url_sistema: string = 'https://klfreedom.com.br/';

    constructor(private http : HttpClient){
       
    }


     dadosApi(dados: any, api: string){
            const httpOptions = {
                headers: new HttpHeaders({'Content-Type' : 'application/json',
                'Authorization': 'Basic S2wgUmVudCBhIENhcmt1bjpEUUNhWXQyY1lYcWI2ZXM0'
            })

                }

            let url = this.server + api;
            return this.http.post(url, JSON.stringify(dados), httpOptions).map(res => res);
        }


        get(endpoint: string, params?: any, reqOpts?: any) {
            if (!reqOpts) {
                reqOpts = {
                    params: new HttpParams()
                };
            }
            // Support easy query params for GET requests
            if (params) {
                reqOpts.params = new HttpParams();
                // tslint:disable-next-line:forin
                for (let k in params) {
                    reqOpts.params = reqOpts.params.set(k, params[k]);
                }
            }
    
            return this.http.get(this.server + '/' + endpoint, reqOpts);
        }
    
        post(endpoint: string, body: any, reqOpts?: any) {
            return this.http.post(this.server + '/' + endpoint, body, reqOpts);
        }

 
        
}
