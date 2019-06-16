import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Submissao } from './submissao';

@Injectable()
export class SubmissaoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private simURL = 'http://localhost:3000';

  constructor(private http: Http) { }



  deletar(submissao: Submissao): Promise<Submissao> {
   
  return this.http.delete(this.simURL + "/deletarSubmissao", {headers: this.headers, body: JSON.stringify(submissao)})
    .toPromise()
    .then(res => {
      if (res.json().success) {return submissao;} else {return null;}
    })
    .catch(this.tratarErro);
    
  }

getEnviadas(): Promise<Submissao[]>{
  return this.http.get(this.simURL + "/submissoesEnviadas")
  .toPromise()
  .then(res => res.json() as Submissao[])
  .catch(this.tratarErro);
}


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