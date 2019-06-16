Feature: As professor
         I desejo registrar e gerenciar meus monitores
         So que eu possa possa aloca-los nas aulas       

Scenario: Gerar Alocações

Scenario: Configurar quantidade de monitores em uma aula
Given Estou na página "SIMApp"
Given Estou no menu "Alteracao"
Given A quantidade mínima de monitores da aula "25/03" é "0"
When Eu tento alterar o número de monitores da aula "25/03" para "4"
Then O número mínimo de monitores da aula "25/03" é alterado para "4"
