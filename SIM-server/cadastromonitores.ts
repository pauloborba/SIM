import { Monitor } from '../SIM-app/src/app/alocacao/monitor';

export class CadastroMonitores {
  monitores: Monitor[] = [
    {nome: "Pedro",
    disponibilidade:[true,false,false,false,true],
    restricoes:[],
    alocacoes:0,
    chefe:false,
    clean:undefined,
    copyDisponibilidade: undefined,
    copyFrom: undefined,
    copyRestricoes: undefined
    }, 
    {nome: "Jorge",
    disponibilidade:[false,false,true,false,true],
    restricoes:[],
    alocacoes:0,
    chefe:false,
    clean:undefined,
    copyDisponibilidade: undefined,
    copyFrom: undefined,
    copyRestricoes: undefined
    },
    {nome: "Davi",
    disponibilidade:[false,false,false,false,true],
    restricoes:[],
    alocacoes:0,
    chefe:false,
    clean:undefined,
    copyDisponibilidade: undefined,
    copyFrom: undefined,
    copyRestricoes: undefined
    },
  ];

  criar(monitor: Monitor): Monitor {
    var result = null;
    if(this.naoCadastrado(monitor.nome)) {
      result = new Monitor();
      result.copyFrom(monitor);
      this.monitores.push(result);
    }
    return result;
  }

  atualizar(monitor: Monitor) : Monitor {
    return new Monitor();
  }

  getMonitores() : Monitor[] {
    return this.monitores;
  }

  naoCadastrado(nome: string) {
    return !this.monitores.find(a => a.nome == nome);
  }

}