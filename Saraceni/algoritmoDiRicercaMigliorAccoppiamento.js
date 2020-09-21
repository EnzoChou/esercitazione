var fun = require('./funzioniPerRicercaParole')
var natural = require('natural')
var strutture = require('./creazioneListeDaFileJson')
var metodoDiRicerca = require('./ricercaRicettaDaStringa')
natural.PorterStemmer.attach() // english language set -> 'words'.tokenizeAndStem() toSingularizeAndTurnIntoArrayOfWords

var listaRicette = strutture.listaRicette
var listaParoleChiavePerCategoria = strutture.listaParoleChiavePerCategoria
var listaIngredientiPrincipali = strutture.listaIngredientiPrincipali
var listaIngredientiSecondari = strutture.listaIngredientiSecondari
var listaVini = strutture.listaVini
var listaParoleChiave = strutture.listaParoleChiave
var listaParoleChiavePerCategoria = strutture.listaParoleChiavePerCategoria

var nomiRicette = listaRicette.map(ricetta => ricetta.nome.tokenizeAndStem())
var ingredientiPrincipali = listaParoleChiavePerCategoria.ingredientiPrincipali.map(parola => parola.tokenizeAndStem())
var ingredientiSecondari = listaParoleChiavePerCategoria.ingredientiSecondari.map(parola => parola.tokenizeAndStem())
var listaPortate = ['apetizer', 'first course', 'second course', 'side dish', 'dessert'].map(portata => portata.tokenizeAndStem())

var utente = "i'd like some avogato tost"
var paroleDaCercare = utente.tokenizeAndStem()

var arrayPunteggio = [
  nomiRicette,
  listaPortate,
  ingredientiPrincipali,
  ingredientiSecondari
]

var arrayAlgoritmoScelto = {
  0: metodoDiRicerca.ricettaTrovataDaRicette,
  2: metodoDiRicerca.ricetteTrovateDaIngredientiPrincipali
}

var punteggi = arrayPunteggio.map(arrayDiArray =>
  Math.max(...arrayDiArray.map(array =>
    fun.somiglianzaParoleArray(paroleDaCercare, array)
  ))
)

var indexScelto = punteggi.indexOf(punteggi.find(elem => elem > 0.9))

var metodoScelto = arrayAlgoritmoScelto[indexScelto]

console.log('parole inserite dall\'utente', paroleDaCercare)
console.log('indice: [nomiRicette, listaPortate, IngPrincipali, ingSecondari]')
console.log('punteggi', punteggi)
console.log('index scelto', indexScelto)
console.log('risultato trovato dal bot', metodoScelto(paroleDaCercare))
