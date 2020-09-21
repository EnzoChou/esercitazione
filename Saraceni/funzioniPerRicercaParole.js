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

module.exports = funzioniPerRicercaParole
