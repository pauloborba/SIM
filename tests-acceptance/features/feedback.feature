Feature: Como um monitor
         Eu quero acessar as submissões dos alunos
         Para que eu possa monitora-los devidamente

Scenario: Visualizar questões do aluno puxadas do the huxley

Given eu estou na tela de “Feedbacks”
Given O aluno "Matheus" fez a "Submissão 5" no The Huxley.
When eu vou para a tela de “Submissões”
Then eu consigo ver a "Submissão 5" do aluno "Matheus" no topo da lista.

Scenario: Mensagem de sucesso ao enviar Feedback:
Given Eu estou na página de “Submissões” 
Given A submissão "Submissão 5" de "Erica" está aberta
When Eu atribuo a nota "8" ao feedback e realizo a submissão 
Then Eu Vejo a mensagem "O feedback da Submissão 5 com nota 8 foi enviado para o email de Erica"

Scenario: Erro ao cadastrar aluno sem login the huxley
Given eu estou na página de cadastro de notas 
When preencho o campo “nome do aluno” com "Arthur Castro"
When o campo “logging” com ""
When Eu adiciono o aluno 
Then eu vejo uma mensagem de erro 
And o aluno "Arthur Castro" não é cadastrado