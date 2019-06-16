import { Monitor } from '../SIM-app/src/app/alocacao/monitor';

export class CadastroMonitores {
  monitores: Monitor[] = [];

  criar(monitor: Monitor): Monitor {
    var result = null;
    if(this.nomeNaoCadastrado(monitor.nome))
    this.monitores.push(monitor)
    return monitor
  }

  atualizar(monitor: Monitor) : Monitor { 
    return new Monitor(); 
  }

  nomeNaoCadastrado(nome:string) : boolean{
    return !this.monitores.find(a => a.nome == nome);
  }

  getMonitores() : Monitor[] {
    return [{
        nome: "Daniel",
        disponibilidade: [true, true, false, false, false],
        restricoes: [],
        alocacoes: 1,
        chefe: false,
        clean: undefined
    },
    {
      nome: "Berg",
      disponibilidade: [true, true, false, false, false],
      restricoes: [],
      alocacoes: 1,
      chefe: true,
      clean: undefined
    }]
  }
  getMonitoresWithoutStub(): Monitor[]{
    return this.monitores;
  }

}