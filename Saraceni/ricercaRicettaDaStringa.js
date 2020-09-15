var strutture = require('./creazioneListeDaFileJson');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
natural.PorterStemmerIt.attach();

var listaRicette = strutture.listaRicette;
var listaIngredientiPrincipali = strutture.listaIngredientiPrincipali;
var listaIngredientiSecondari = strutture.listaIngredientiSecondari;
var listaVini = strutture.listaVini;

var utente = "ciao, stasera ho voglia di pollo!";
console.log(utente);
