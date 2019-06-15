import { Monitor } from '../SIM-app/src/app/alocacao/monitor';

export class CadastroMonitores {
  monitores: Monitor[] = [];

  criar(monitor: Monitor): Monitor {
    return new Monitor();
  }

  atualizar(monitor: Monitor) : Monitor { 
    return new Monitor(); 
  }

  getMonitores() : Monitor[] {
    return this.monitores;
  }

}