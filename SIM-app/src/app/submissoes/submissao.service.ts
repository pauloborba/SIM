import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Submissao } from './submissao';

@Injectable()
export class SubmissaoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private simURL = 'http://localhost:3000';

  constructor(private http: Http) { }



  getSubmissoes(): Promise<Submissao[]> {
    return this.http.get(this.simURL + "/submissoes")
             .toPromise()
             .then(res => res.json() as Submissao[])
             .catch(this.tratarErro);
  }

  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de submissoes',erro);
    return Promise.reject(erro.message || erro);
  }
}