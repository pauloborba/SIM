import { CadastroMonitores } from '../cadastromonitores';
import { Monitor } from '../../SIM-app/src/app/alocacao/monitor';

describe("O cadastro de monitores", () => {
  var cadastro: CadastroMonitores;

  beforeEach(() => cadastro = new CadastroMonitores())

  it("é inicialmente vazio", () => {
    expect(cadastro.getMonitoresWithoutStub().length).toBe(0);
  })

  it("não cadastra monitor duplicado", () => {
    var monitor: Monitor = new Monitor();
    monitor.nome = "Daniel";
    monitor.disponibilidade = [false,true,false,true,false];
    monitor.restricoes = [];
    monitor.alocacoes = 0;
    monitor.chefe = true;
    cadastro.criar(monitor);

    expect(cadastro.getMonitoresWithoutStub().length).toBe(1);
    monitor = cadastro.getMonitoresWithoutStub()[0];
    expect(monitor.nome).toBe("Daniel");
    expect(monitor.disponibilidade).toEqual([false,true,false,true,false]);
    expect(monitor.restricoes).toEqual([]);
    expect(monitor.alocacoes).toBe(0);
    expect(monitor.chefe).toBe(true);

    var monitor2: Monitor = new Monitor();
    monitor2.nome = "Daniel";
    monitor2.disponibilidade = [false,true,false,true,false];
    monitor2.restricoes = [];
    monitor2.alocacoes = 0;
    monitor2.chefe = true;
    cadastro.criar(monitor2);

    expect(cadastro.getMonitoresWithoutStub().length).toBe(1);
  })
  
})