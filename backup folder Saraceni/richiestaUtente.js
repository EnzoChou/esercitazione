var natural = require('natural');
var metodoDiRicerca = require('./scripts/ricercaRicettaDaStringa');
natural.PorterStemmer.attach(); // english language set -> 'words'.tokenizeAndStem() toSingularizeAndTurnIntoArrayOfWords

console.log('process.env.PHRASE', process.env.PHRASE);

function init() {
    var richiestaUtente = process.env.PHRASE;

    var result = metodoDiRicerca.scegliMetodo(richiestaUtente);

    console.log('risultato trovato dal bot:', result);
}

init();

// PHRASE="ciao" node richiestaUtente.js