var natural = require('natural');
var funzioniPerRicercaParole = {};

var ricetteDaIDs = function(listaID,listaRicette) {
  return listaID.filter(id => listaRicette.id.find(idRicetta => id == idRicetta))
}

var ricetteDaIngrediente = function(ingrediente,listaRicette) {
  return ingrediente.ricette.map(codiceRicetta => listaRicette.find(ricetta => ricetta.id == codiceRicetta ))
}

var ricetteDaIngredienti = function(ingredienti,listaRicette) {
  var arrayRicette = [];
  ingredienti.forEach((item, i) => {
    arrayRicette = arrayRicette.concat(ricetteDaIngrediente(item,listaRicette));
  });
  return arrayRicette;
}

var somiglianzaParoleArray = function(arrayParole,arrayRicette) {
  var contatore = 0;
  arrayParole.forEach((item, i) => {
    arrayRicette.forEach((item2, j) => {
      if(natural.JaroWinklerDistance(item,item2,undefined,true)>0.8){
        contatore+=natural.JaroWinklerDistance(item,item2,undefined,true);
      }
    });
  });
  return contatore/(arrayRicette.length);
}

funzioniPerRicercaParole.ricetteDaIDs = ricetteDaIDs;
funzioniPerRicercaParole.ricetteDaIngrediente = ricetteDaIngrediente;
funzioniPerRicercaParole.ricetteDaIngredienti = ricetteDaIngredienti;
funzioniPerRicercaParole.somiglianzaParoleArray = somiglianzaParoleArray;

module.exports = funzioniPerRicercaParole;
