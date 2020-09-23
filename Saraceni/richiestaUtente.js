var natural = require('natural');
var metodoDiRicerca = require('./ricercaRicettaDaStringa');
natural.PorterStemmer.attach(); // english language set -> 'words'.tokenizeAndStem() toSingularizeAndTurnIntoArrayOfWords

var richiestaUtente = "i'd like some coniglio";

console.log('risultato trovato dal bot:', metodoDiRicerca.scegliMetodo(richiestaUtente));
