import { Component, OnInit } from '@angular/core';
import { SubemissoesComponent } from '../submissoes/submissoes.component'
import { SubmissaoService } from '../submissoes/submissao.service';
import { Submissao } from '../submissoes/submissao';
import data from './data.json'
import { Monitor } from './monitor'

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  
  constructor(private submissaoService:SubmissaoService) { }

  submissao: Submissao = new Submissao();
  submissoes: Submissao[];
  

  start: boolean =false;
  monitores: Monitor[] = [];
  num: number = data.monitores.length;

  
  
	startMon(){

		for (var index = 0; index <  this.num; index++) {
		  
			var monitor = new Monitor();
		
		  monitor.name = data.monitores[index].name
		  monitor.sub = data.monitores[index].toJudge
		  monitor.status = data.monitores[index].status
		  if(index == 0){
			monitor.sub = this.submissoes.length
			}
			if((this.submissoes.length == 0 && index == 0) || (index!=0 && monitor.sub == 0 )){
				monitor.status = "feedback enviado"; 
			}else{
				monitor.status = "feedback não enviado";
			}

		  this.monitores.push(monitor);
		}
	}

  ngOnInit(): void {
	
	  this.submissaoService.getSubmissoes()
			.then(
					as => {this.submissoes = as;
							this.startMon();}
				)
			.catch(erro => alert(erro));

		
	}

}
