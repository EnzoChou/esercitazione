var metodoDiRicerca = require('../scripts/ricercaRicettaDaStringa');

console.log('process.env.PHRASE', process.env.PHRASE);

function init() {
    var richiestaUtente = process.env.PHRASE;

    var result = metodoDiRicerca.scegliMetodo(richiestaUtente);

    console.log('risultato trovato dal bot:', result);

    return result;
}

init();
