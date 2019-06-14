Feature: As professor
         I desejo registrar e gerenciar meus monitores
         So que eu possa aloca-los nas aulas

Scenario: Alocação de monitor não disponível
Given estou na página "alocacao"
And estou no menu de "disponibilidade"
And o monitor "Daniel" está cadastrado no sistema e disponível para a "segunda-feira"
And o monitor "Daniel" está alocado para a aula "segunda-feira" dia "25/03"
When eu tento alocar o monitor "Daniel" na aula "segunda-feira" dia "25/03" 
Then recebo uma mensagem de erro
And sou direcionado para o menu de "Cronograma"

Scenario: Cadastro de Aula
Given estou na página "cronograma"
And não vejo a aula "segunda-feira" dia "25/03" na lista de "aulas"
When eu cadastro a aula "segunda-feira" dia "25/03" 
And submeto ao sistema
Then vejo a aula "segunda-feira" dia "25/03" com um marcador "tipo de aula" escrito "acompanhamento"