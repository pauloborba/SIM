Feature: Como um monitor
         Eu quero acessar as submissões dos alunos
         Para que eu possa monitora-los devidamente

Scenario: Visualizar questões do aluno puxadas do the huxley

Given eu estou na tela de “Feedbacks”
Given O aluno "Matheus" fez a "Submissão 5" no The Huxley.
When eu vou para a tela de “Submissões”
Then eu consigo ver a "Submissão 5" do aluno "Matheus" no topo da lista.
