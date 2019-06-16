import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class CriteriosService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private simURL = 'http://localhost:3000';

  constructor(private http: Http) { }

  criar(criterio : string): Promise<string> {
    return this.http.post(this.simURL + "/criterio",{criterio : criterio}, {headers: this.headers})
           .toPromise()
           .then(res => {
              if (res.json().success) {return criterio;} else {return null;}
           })
           .catch(this.tratarErro);
  }

  deletar(criterio : string): Promise<string> {
  return this.http.delete(this.simURL + "/deletarCriterio", {headers: this.headers, body: {criterio: criterio}})
    .toPromise()
    .then(res => {
      if (res.json().success) {return criterio;} else {return null;}
    })
    .catch(this.tratarErro);
  }

  getCriterios(): Promise<string[]> {
    return this.http.get(this.simURL + "/criterio")
             .toPromise()
             .then(res => res.json() as string[])
             .catch(this.tratarErro);
  }

  private tratarErro(erro: any): Promise<any>{
    console.error('Acesso mal sucedido ao serviço de criterios',erro);
    return Promise.reject(erro.message || erro);
  }
}