var fun = require('./funzioniPerRicercaParole')
var natural = require('natural')
var strutture = require('./creazioneListeDaFileJson')
natural.PorterStemmer.attach() // english language set -> 'words'.tokenizeAndStem() toSingularizeAndTurnIntoArrayOfWords

var listaRicette = strutture.listaRicette
var listaParoleChiavePerCategoria = strutture.listaParoleChiavePerCategoria

var nomiRicette = listaRicette.map(ricetta => ricetta.nome.tokenizeAndStem())
var ingredientiPrincipali = listaParoleChiavePerCategoria.ingredientiPrincipali.map(parola => parola.tokenizeAndStem())
var ingredientiSecondari = listaParoleChiavePerCategoria.ingredientiSecondari.map(parola => parola.tokenizeAndStem())
var listaPortate = ['apetizer', 'first course', 'second course', 'side dish', 'dessert'].map(portata => portata.tokenizeAndStem())

var utente = "i'd like some first curse"
var paroleDaCercare = utente.tokenizeAndStem()

var arrayPunteggio = [
  nomiRicette,
  listaPortate,
  ingredientiPrincipali,
  ingredientiSecondari
]

var punteggi = arrayPunteggio.map(arrayDiArray =>
  Math.max(...arrayDiArray.map(array =>
    fun.somiglianzaParoleArray(paroleDaCercare, array)
  ))
)

// console.log(punteggi)
