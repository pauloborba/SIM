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

}