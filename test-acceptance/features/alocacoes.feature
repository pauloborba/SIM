Feature: As professor
         I desejo registrar e gerenciar meus monitores
         So que eu possa aloca-los nas aulas

Scenario: Mudanca de disponibilidade de um monitor
Given estou na página de "SIMApp"
And o monitor "Daniel" está disponível para "segunda-feira"
And o monitor "Daniel" está disponível para "quarta-feira"
And o monitor "Ruy" está disponível para "segunda-feira"
And o monitor "Daniel" está alocado para a "segunda-feira" dia "25/03"
When eu retiro a disponibilidade de "Daniel" na "segunda-feira"
Then eu não vejo mais a disponibilidade de "Daniel" na "segunda-feira"
And o monitor "Daniel" não está mais alocado na "segunda-feira" dia "25/03"
