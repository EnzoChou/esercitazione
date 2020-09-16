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


funzioniPerRicercaParole.ricetteDaIDs = ricetteDaIDs;
funzioniPerRicercaParole.ricetteDaIngrediente = ricetteDaIngrediente;
funzioniPerRicercaParole.ricetteDaIngredienti = ricetteDaIngredienti;

module.exports = funzioniPerRicercaParole;
