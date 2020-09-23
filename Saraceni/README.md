excelToJson.js => 
estrae da Excel i dati utili per il foodparing

creazioneListeDaFileJson.js => 
crea le liste necessarie e non necessarie dopo l'estrazione dei dati dall'excel

ricercaRicettaDaStringa.js => 
crea liste generiche e le tokenizza per fare un match con la stringa in entrata. Decide quale algoritmo utilizzare (sempre interne al file). Elabora una risposta e la reinvia a richiestaUtente.

richiestaUtente.js => 
elabora la stringa di input e lo invia a ricercaRicettaDaStringa

funzioniPerRicercaParole.js => 
utils funzioni generali che vengono richiamate più volte


Struttura
Cartelle:
- json: salviamo tutti i file contenenti i dati che l'integrazione utilizza
- script: script chiave per la preparazione dei dati dell'integrazione
- utils: file con gestione di supporto alle integrazioni
- integrations: integrazioni utilizzate dal bot
