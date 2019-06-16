import { Monitor } from '../SIM-app/src/app/alocacao/monitor';

export class CadastroMonitores {
  monitores: Monitor[] = [
 
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