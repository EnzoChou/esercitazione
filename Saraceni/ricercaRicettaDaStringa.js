var strutture = require('./creazioneListeDaFileJson')
var natural = require('natural')
var fun = require('./funzioniPerRicercaParole')
natural.PorterStemmer.attach() // english language set -> 'words'.tokenizeAndStem() toSingularizeAndTurnIntoArrayOfWords

var listaRicette = strutture.listaRicette
var listaIngredientiPrincipali = strutture.listaIngredientiPrincipali
var listaIngredientiSecondari = strutture.listaIngredientiSecondari
var listaVini = strutture.listaVini
var listaParoleChiave = strutture.listaParoleChiave
var listaParoleChiavePerCategoria = strutture.listaParoleChiavePerCategoria

// console.log(natural.PorterStemmer.stem(utente));
// console.log(natural.JaroWinklerDistance("dixon","dicksonx", undefined, true));

var nomiRicette = listaRicette.map(ricetta => ricetta.nome.tokenizeAndStem())
var antipastiContorni = listaParoleChiavePerCategoria.antipastiContorni.map(parola => parola.stem())
var primi = listaParoleChiavePerCategoria.primi.map(parola => parola.stem())
var secondi = listaParoleChiavePerCategoria.secondi.map(parola => parola.stem())
var ingredientiPrincipali = listaParoleChiavePerCategoria.ingredientiPrincipali.map(parola => parola.tokenizeAndStem())
var ingredientiSecondari = listaParoleChiavePerCategoria.ingredientiSecondari.map(parola => parola.tokenizeAndStem())

// METODI DI RICERCA DALLA LISTA RICETTE

var matchRicetta = function (arrayParole) {
  console.log('è stato scelto il metodo di match da Ricette\n\n')
  var ricettaPerfetta = {
    index: '-1',
    max: '0.5'
  }
  var ricettaTrovata = []
  nomiRicette.forEach((item, i) => {
    var tmp = fun.somiglianzaParoleArray(arrayParole, item)
    if (tmp > ricettaPerfetta.max) {
      ricettaPerfetta.index = i
      ricettaPerfetta.max = tmp
      // console.log(ricettaPerfetta)
      // console.log(ricette[ricettaPerfetta.index])
    }
  })
  if (nomiRicette[ricettaPerfetta.index]) {
    ricettaTrovata.push(listaRicette.find(ricetta =>
      ricetta.nome.tokenizeAndStem().toString() === nomiRicette[ricettaPerfetta.index].toString()
    ))
  }
  return ricettaTrovata
}

// METODI DI RICERCA DALLA LISTA DEGLI INGREDIENTI PRINCIPALI

var matchIngredientiPrincipali = function (arrayParole) {
  console.log('è stato scelto il metodo di matchDaIngredientiPrincipali\n\n')
  return fun.ricercaIngredientiPapabili(arrayParole, listaIngredientiPrincipali)
}

var ricetteTrovateDaIngredientiPrincipali = function (arrayParole) {
  return fun.ricetteDaIngredienti(matchIngredientiPrincipali(arrayParole), listaRicette)
}

// METODI DI RICERCA DALLA LISTA DEGLI INGREDIENTI SECONDARI

var matchIngredientiSecondari = function (arrayParole) {
  console.log('è stato scelto il metodo di matchDaIngredientiSecondari\n\n')
  return fun.ricercaIngredientiPapabili(arrayParole, listaIngredientiSecondari)
}

var ricetteTrovateDaIngredientiSecondari = function (arrayParole) {
  return fun.ricetteDaIngredienti(matchIngredientiSecondari(arrayParole), listaRicette)
}

// METODI DI RICERCA PER MISMATCH

var laRicercaNonHaProdottoRisultatiSoddisfacenti = function (arrayParole) {
  return 'la tua richiesta non ha prodotto risultati, puoi dirmi qualcosa di più specifico?'
}

// METODI DI RICERCA DALLA LISTA DELLE PORTATE

var ricetteTrovateDaPortate = function (arrayParole) {
  return 'la tua richiesta ha portato all\'algoritmo della ricerca da portate, ma questi deve ancora essere implementato'
}

var modulo = {}

modulo.ricettaTrovataDaRicette = matchRicetta
modulo.ricetteTrovateDaIngredientiPrincipali = ricetteTrovateDaIngredientiPrincipali
modulo.ricetteTrovateDaIngredientiSecondari = ricetteTrovateDaIngredientiSecondari
modulo.laRicercaNonHaProdottoRisultatiSoddisfacenti = laRicercaNonHaProdottoRisultatiSoddisfacenti
modulo.ricetteTrovateDaPortate = ricetteTrovateDaPortate

module.exports = modulo