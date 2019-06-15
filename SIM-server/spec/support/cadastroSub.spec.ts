import { CadastroSubmissao } from '../../cadastroSub';
import { Submissao } from '../../../SIM-app/src/app/submissoes/submissao'
 

describe("O cadastro de alunos", () => {
  var cadastro: CadastroSubmissao;

  beforeEach(() => cadastro = new CadastroSubmissao())

  it("Não remove submissões não arquivadas", () => {
    expect(cadastro.getSubmissoes().length).toBe(3);
    var submissao: Submissao = new Submissao();
    submissao.ID=4;
    submissao.nomeSub = "Submissão 7";
    submissao.aluno = "Walter";
    submissao.code = "var x = 9";


    cadastro.deletar(submissao);
    expect(cadastro.getSubmissoes().length).toBe(3);
  })

  it("Remove submissões corretamente", () => {
    expect(cadastro.getSubmissoes().length).toBe(3);
    var submissao: Submissao = new Submissao();
    submissao.ID=0;
    submissao.nomeSub = "Submissão 5";
    submissao.aluno = "Matheus";
    submissao.code = "";


    cadastro.deletar(submissao);
    expect(cadastro.getSubmissoes().length).toBe(2);
  })

})