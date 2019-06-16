import { Component, OnInit } from '@angular/core';
import { SubmissaoService } from './submissao.service';
import { Submissao } from './submissao';

@Component({
  selector: 'app-submissoes',
  templateUrl: './submissoes.component.html',
  styleUrls: ['./submissoes.component.css']
})
export class SubemissoesComponent implements OnInit {

  constructor(private submissaoService:SubmissaoService) { }

  submissao: Submissao = new Submissao();
  submissoes: Submissao[] = [];
  count: boolean = false;
  code: number = 0;
  start: boolean =false;
  nota: number;

  mostrarSubmissao(submissao: Submissao): void {
      this.submissao.copyFrom(submissao);
      this.count = !this.count
   }

   avaliarSubmissao(submissao: Submissao): void {
    this.submissaoService.deletar(submissao)
      .then(ab => {
         if (ab) {
            var result: Submissao = this.submissoes.find(k => k.ID == submissao.ID);
            this.submissoes.splice(this.submissoes.indexOf(result), 1);
            this.start = true;
            this.mostrarSubmissao(submissao);
         }
      })
      .catch(erro => alert(erro));
  }  

  onMove(): void {
   this.start = false;
   }

  ngOnInit(): void {
     this.submissaoService.getSubmissoes()
         .then(as => this.submissoes = as)
         .catch(erro => alert(erro));
   }

}
