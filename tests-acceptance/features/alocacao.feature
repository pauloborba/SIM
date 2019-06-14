Feature: As professor
         I desejo registrar e gerenciar meus monitores
         So que eu possa possa aloca-los nas aulas       

Scenario: Gerar Alocações
Given Estou na página "SIMApp"
Given Estou no menu "Cronograma"
Given O monitor "Pedro" está cadastrado e disponível para "segunda-feira"
Given O monitor "Jorge" está cadastrado e disponível para "quarta-feira"
Given A aula "25/03" ainda não possui monitores
Given A aula "27/03" ainda não possui monitores
When Eu solicito a alocação de monitores
Then O monitor "Pedro" aparece alocado na aula "25/03"
Then O monitor "Jorge" aparece alocado na aula "27/03"

Scenario: Alteração manual de monitor para alocação em um dia especificado
Given Estou na página "SIMApp"
Given Estou no menu "Alteracao"
Given O monitor "Jorge" está cadastrado e disponível para "quarta-feira"
When Eu edito os monitores de "27/03", adicionando o monitor "Jorge"
Then O monitor "Jorge" aparece alocado na aula "27/03"
