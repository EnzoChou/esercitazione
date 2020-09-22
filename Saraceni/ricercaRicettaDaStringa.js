var strutture = require('./creazioneListeDaFileJson')
var natural = require('natural')
var fun = require('./funzioniPerRicercaParole')
natural.PorterStemmer.attach() // english language set -> 'words'.tokenizeAndStem() toSingularizeAndTurnIntoArrayOfWords

var listaRicette = strutture.listaRicette
var listaIngredientiPrincipali = strutture.listaIngredientiPrincipali
var listaIngredientiSecondari = strutture.listaIngredientiSecondari
var listaVini = strutture.listaVini
// var listaParoleChiave = strutture.listaParoleChiave
var listaParoleChiavePerCategoria = strutture.listaParoleChiavePerCategoria
var listaAbbinamentiGenerali = strutture.listaAbbinamentiGenerali
var listaAbbinamentiPerTipologia = strutture.listaAbbinamentiPerTipologia
// console.log(natural.PorterStemmer.stem(utente));
// console.log(natural.JaroWinklerDistance("dixon","dicksonx", undefined, true));

var nomiRicette = listaRicette.map(ricetta => ricetta.nome.tokenizeAndStem())
var abbinamentiGenerali = listaAbbinamentiGenerali.map(tipo => tipo.nome.tokenizeAndStem())
var abbinamentiPerTipologia = listaAbbinamentiPerTipologia.map(tipo => tipo.nome.tokenizeAndStem())
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

// METODI DI RICERCA PER ABBINAMENTI GENERALI

var matchViniPerTipoPortata = function (arrayParole) {
  console.log('è stato scelto il metodo di matchPerPortataETipo\n\n')
  var arrayParoleTrovate = matchTipoIngrediente(arrayParole)
  console.log('array parole trovate \n', arrayParoleTrovate)
  console.log('array parole da cercare\n', arrayParole)
  console.log('lista tipo ingredienti\n', listaAbbinamentiGenerali)
  var abbinamentiGenerali = listaAbbinamentiGenerali.filter(tipoIngrediente =>
    tipoIngrediente.nome === arrayParoleTrovate.toString)
  console.log('abbinamentiGenerali\n', abbinamentiGenerali)
  return fun.filtroPerTag(arrayParoleTrovate, abbinamentiGenerali)
}

var matchTipoIngrediente = function (arrayParole) {
  return fun.ricercaTipoIngredientePapabile(arrayParole, abbinamentiGenerali)
}

var ricetteTrovateDaPortate = function (arrayParole) {
  return fun.ricercaViniProposti(matchViniPerTipoPortata(arrayParole), listaVini)
}

var listaPortate = ['antipasto', 'primo', 'secondo', 'contorno',
  'dessert'
].map(portata => portata.tokenizeAndStem())

// METODI DI RICERCA PER TIPOLOGIA

var ricetteTrovatePerTipologia = function () {
  return 0;
}

/*
var listaTipoIngrediente = ['carne bianca', 'carne rossa', 'formaggio', 'verdure',
  'uova', 'crostacei', 'molluschi', 'pesce'
].map(portata => portata.tokenizeAndStem())
*/

// METODI DI RICERCA PER MISMATCH

var laRicercaNonHaProdottoRisultatiSoddisfacenti = function (arrayParole) {
  return 'la tua richiesta non ha prodotto risultati, puoi dirmi qualcosa di più specifico?'
}

// ELABORAZIONE DATI DALLA RICHIESTA UTENTE

var arrayPunteggio = [
  nomiRicette,
  abbinamentiPerTipologia,
  abbinamentiGenerali,
  listaPortate,
  ingredientiPrincipali,
  ingredientiSecondari
]
// console.log(arrayPunteggio)

var arrayAlgoritmoScelto = {
  '-1': laRicercaNonHaProdottoRisultatiSoddisfacenti,
  0: matchRicetta,
  1: ricetteTrovatePerTipologia,
  2: abbinamentiGenerali,
  3: ricetteTrovateDaPortate,
  4: ricetteTrovateDaIngredientiPrincipali,
  5: ricetteTrovateDaIngredientiSecondari
}
var metodoScelto = function (richiestaUtente) {
  var paroleDaCercare = richiestaUtente.tokenizeAndStem()
  console.log('parole inserite dall\'utente', paroleDaCercare)
  var punteggi = arrayPunteggio.map(arrayDiArray =>
    Math.max(...arrayDiArray.map(array =>
      fun.somiglianzaParoleArray(paroleDaCercare, array)
    ))
  )
  console.log('indice: [nomiRicette, listaPortate, IngPrincipali, ingSecondari]')
  console.log('punteggi', punteggi)
  var indexScelto = punteggi.findIndex(elem => elem > 0.9)
  console.log('index scelto', indexScelto)

  return arrayAlgoritmoScelto[indexScelto](paroleDaCercare)
}

var modulo = {}

// modulo.matchRicetta = matchRicetta
// modulo.ricetteTrovateDaIngredientiPrincipali = ricetteTrovateDaIngredientiPrincipali
// modulo.ricetteTrovateDaIngredientiSecondari = ricetteTrovateDaIngredientiSecondari
// modulo.laRicercaNonHaProdottoRisultatiSoddisfacenti = laRicercaNonHaProdottoRisultatiSoddisfacenti
// modulo.ricetteTrovateDaPortate = ricetteTrovateDaPortate
modulo.scegliMetodo = metodoScelto

module.exports = modulo