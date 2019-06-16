import { CadastroMonitores } from '../cadastromonitores';
import { Monitor } from '../../SIM-app/src/app/alocacao/monitor';
import 'jasmine';

describe("O cadastro de monitores", () => {
  var cadastro: CadastroMonitores;
  var disponibilidade = [false,true,false,true,false];

  beforeEach(() => cadastro = new CadastroMonitores())

  it("é inicialmente vazio", () => {
    expect(cadastro.getMonitores().length).toBe(0);
  })

  it("cadastra monitores corretamente", () => {
    var monitor: Monitor = new Monitor();
    monitor.nome = "Daniel";
    monitor.disponibilidade = [false,true,false,true,false];
    monitor.restricoes = [];
    monitor.alocacoes = 0;
    monitor.chefe = true;
    cadastro.criar(monitor);

    expect(cadastro.getMonitores().length).toBe(1);
    monitor = cadastro.getMonitores()[0];
    expect(monitor.nome).toBe("Daniel");
    for(var i = 0; i < monitor.disponibilidade.length; i++) {
      expect(monitor.disponibilidade[i]).toBe(disponibilidade[i]);
    }
    expect(monitor.restricoes.length).toBe(0);
    expect(monitor.alocacoes).toBe(0);
    expect(monitor.chefe).toBe(true);
  })
  
})