var natural = require('natural')
var funzioniPerRicercaParole = {}

var ricetteDaIDs = function (listaID, listaRicette) {
  return listaID.filter(id => listaRicette.id.find(idRicetta => id === idRicetta))
}

var ricetteDaIngrediente = function (ingrediente, listaRicette) {
  return ingrediente.ricette.map(codiceRicetta => listaRicette.find(ricetta => ricetta.id === codiceRicetta))
}

var ricetteDaIngredienti = function (ingredienti, listaRicette) {
  var arrayRicette = []
  ingredienti.forEach((item, i) => {
    arrayRicette = arrayRicette.concat(ricetteDaIngrediente(item, listaRicette))
  })
  return arrayRicette
}

var ricercaIngredientiPapabili = function (arrayParole, listaIngredienti) {
  var listaOrdinata = listaIngredienti.filter(function (ingrediente) {
    return arrayParole.find(function (parola) {
      if (natural.JaroWinklerDistance(ingrediente.nome, parola, undefined, true) > 0.8) {
        ingrediente.match = natural.JaroWinklerDistance(ingrediente.nome, parola, undefined, true)
        return true
      }
      return false
    })
  })
  var listaDiRitorno = listaOrdinata.sort(function (a, b) {
    return b.match - a.match
  })
  console.log('lista ingredienti papabili ordinati', listaDiRitorno)
  return listaDiRitorno
}

var somiglianzaParoleArray = function (arrayParole, arrayDiConfronto) {
  var contatore = 0
  arrayParole.forEach((item, i) => {
    arrayDiConfronto.forEach((item2, j) => {
      if (natural.JaroWinklerDistance(item, item2, undefined, true) > 0.8) {
        contatore += natural.JaroWinklerDistance(item, item2, undefined, true)
      }
    })
  })
  return contatore / (arrayDiConfronto.length)
}

var indiceMassimoAccoppiamento = function (arr) {
  if (arr.length === 0) {
    return -1
  }

  var max = arr[0]
  var maxIndex = 0

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i
      max = arr[i]
    }
  }

  return maxIndex
}

funzioniPerRicercaParole.ricetteDaIDs = ricetteDaIDs
funzioniPerRicercaParole.ricetteDaIngrediente = ricetteDaIngrediente
funzioniPerRicercaParole.ricetteDaIngredienti = ricetteDaIngredienti
funzioniPerRicercaParole.somiglianzaParoleArray = somiglianzaParoleArray
funzioniPerRicercaParole.indiceMassimoAccoppiamento = indiceMassimoAccoppiamento
funzioniPerRicercaParole.ricercaIngredientiPapabili = ricercaIngredientiPapabili

module.exports = funzioniPerRicercaParole
