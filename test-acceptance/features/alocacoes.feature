Feature: As professor
         I desejo registrar e gerenciar meus monitores
         So que eu possa aloca-los nas aulas

Scenario: Preenchimento de formulário de alocação
And estou na página "SIMApp"
And o monitor "Daniel" não está disponível
When eu cadastro o monitor com o campo de disponibilidades com "segunda-feira quarta-feira" o campo de nome "Daniel", restrições de data "", campo é chefe "Sim"
When eu cadastro o monitor com o campo de disponibilidades com "segunda-feira" o campo de nome "Ruy", restrições de data "", campo é chefe "Nao"
Then o monitor "Daniel" está disponível para "segunda-feira"
And o monitor "Daniel" está disponível para "quarta-feira"
And o monitor "Daniel" está marcado como chefe
And o monitor "Daniel" possui o campo restrições igual a "-"
And o monitor "Ruy" está disponível para "segunda-feira"
And o monitor "Ruy" nao está marcado como chefe
And o monitor "Ruy" possui o campo restrições igual a "-"

Scenario: Mudanca de disponibilidade de um monitor
Given estou na página "SIMApp"
And o monitor "Daniel" está disponível para "segunda-feira"
And o monitor "Daniel" está disponível para "quarta-feira"
And o monitor "Ruy" está disponível para "segunda-feira"
And o monitor "Daniel" está alocado para a "segunda-feira" dia "25/03"
When eu retiro a disponibilidade de "Daniel" na "segunda-feira"
Then eu não vejo mais a disponibilidade de "Daniel" na "segunda-feira"
And o monitor "Daniel" não está mais alocado na "segunda-feira" dia "25/03"

Scenario: Configurar quantidade de monitores padrão para todas as aulas
Given estou na página "SIMApp"
And posso ver o valor "0" para monitores na aula do dia "25/03" do tipo "Acompanhamento"
And posso ver o valor "1" para monitores na aula do dia "24/03" do tipo "Acompanhamento"
When eu defino o valor "4" como padrão de monitores por aula
Then eu vejo a aula do dia "25/03" com o valor "4" para monitores
And eu vejo a aula do dia "24/03" com o valor "4" para monitores

Scenario: Alteração do tipo de aula
And estou na página "SIMApp"
And posso ver o tipo "Assunto novo" para a aula do dia "25/03" 
And posso ver o valor "0" para monitores na aula do dia "25/03"
And o valor padrão para monitores nas aulas é "4"
When eu altero o campo tipo para "Acompanhamento" da aula do dia "25/03"
Then eu vejo a aula do dia "25/03" com o valor "4" para monitores
And eu vejo a aula do dia "25/03" com o tipo "Acompanhamento"