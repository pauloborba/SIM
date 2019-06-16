import { CadastroAlunos } from '../cadastroalunos';
import { Aluno } from '../../SIM-app/src/app/alunos/aluno';

describe("O cadastro de alunos", () => {
  var cadastro: CadastroAlunos;

  beforeEach(() => cadastro = new CadastroAlunos())

  it("Não cadastra alunos sem login", () => {
    expect(cadastro.getAlunos().length).toBe(0);
    var aluno: Aluno = new Aluno();
    aluno.nome = "Rodrigo";
    aluno.login = "";
    cadastro.criar(aluno);

    expect(cadastro.getAlunos().length).toBe(0);
  })


})