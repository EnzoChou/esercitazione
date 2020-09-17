var strutture = require('./creazioneListeDaFileJson');
var natural = require('natural');
var classifier = require('./trainParole');
var fun = require('./funzioniPerRicercaParole');
var tokenizer = new natural.WordTokenizer();
natural.PorterStemmer.attach(); //english language set -> 'words'.tokenizeAndStem() toSingularizeAndTurnIntoArrayOfWords

var TfIdf = natural.TfIdf;
var tfIdf = new TfIdf(); //frequency control -> tfIdf.addDocument('stringData') ;; tfIdf.tfidfs('wordToMeasure', function(document#, numberOfRepetition){courseOfAction})

var listaRicette = strutture.listaRicette;
var listaIngredientiPrincipali = strutture.listaIngredientiPrincipali;
var listaIngredientiSecondari = strutture.listaIngredientiSecondari;
var listaVini = strutture.listaVini;
var listaParoleChiave = strutture.listaParoleChiave;
var listaParoleChiavePerCategoria = strutture.listaParoleChiavePerCategoria;

var utente = "i'd like some ciken with parmaesan ";
//console.log(natural.PorterStemmer.stem(utente));
//console.log(natural.JaroWinklerDistance("dixon","dicksonx", undefined, true));
var paroleDaCercare = utente.tokenizeAndStem();
console.log(paroleDaCercare);

var nomiRicette = listaRicette.map(ricetta => ricetta.nome.tokenizeAndStem());
var antipastiContorni = listaParoleChiavePerCategoria.antipastiContorni.map(parola => parola.stem());
var primi = listaParoleChiavePerCategoria.primi.map(parola => parola.stem());
var secondi = listaParoleChiavePerCategoria.secondi.map(parola => parola.stem());
var ingredientiPrincipali = listaParoleChiavePerCategoria.ingredientiPrincipali.map(parola => parola.stem());
var ingredientiSecondari = listaParoleChiavePerCategoria.ingredientiPrincipali.map(parola => parola.stem());

var matchRicetta = function(arrayParole,ricette) {
  var ricettaPerfetta = {index:'-1', max:'0.5'};
  ricette.forEach((item, i) => {
    var tmp = fun.somiglianzaParoleArray(arrayParole,item);
    if(tmp>ricettaPerfetta.max) {
      ricettaPerfetta.index = i;
      ricettaPerfetta.max = tmp;
      console.log(ricettaPerfetta);
      console.log(ricette[ricettaPerfetta.index]);
    }
  });
  if(ricette[ricettaPerfetta.index]) {
    return listaRicette.find(ricetta =>
      ricetta.nome.tokenizeAndStem().toString() == ricette[ricettaPerfetta.index].toString()
  )} else {
    return undefined;
  }
}

var matchIngredientiPrincipali = listaIngredientiPrincipali.filter(function(ingrediente){
  return paroleDaCercare.find(function(parola){
    if(natural.JaroWinklerDistance(ingrediente.nome,parola,undefined,true)>0.8) {
      ingrediente.match = natural.JaroWinklerDistance(ingrediente.nome,parola,undefined,true);
      return true;
    }
    return false;
  })
})

matchIngredientiPrincipali.sort(function(a,b){return b.match - a.match});
var ricettaTrovataDaRicette = matchRicetta(paroleDaCercare,nomiRicette);
var ricetteTrovateDaIngredientiPrincipali = fun.ricetteDaIngredienti(matchIngredientiPrincipali,listaRicette);
console.log(ricettaTrovataDaRicette);
//console.log('ricette trovate',ricetteTrovateDaIngredientiPrincipali);
