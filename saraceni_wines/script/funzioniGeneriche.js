var natural = require('natural');
var funzioniPerRicercaParole = {};

var ricetteDaIDs = function (listaID, listaRicette) {
  return listaID.filter(id => listaRicette.id.find(idRicetta => id === idRicetta));
};

var ricetteDaIngrediente = function (ingrediente, listaRicette) {
  return ingrediente.ricette.map(codiceRicetta => listaRicette.find(ricetta => ricetta.id === codiceRicetta));
};

var ricetteDaIngredienti = function (ingredienti, listaRicette) {
  var arrayRicette = [];
  ingredienti.forEach((item, i) => {
    arrayRicette = arrayRicette.concat(ricetteDaIngrediente(item, listaRicette));
  });
  return arrayRicette;
};

var ricercaTipoIngredientePapabile = function (arrayParole, tipoIngredienti) {
  var listaDiRitorno = [];
  listaDiRitorno = tipoIngredienti.find(tipoIngrediente =>
    somiglianzaParoleArray(arrayParole, tipoIngrediente) > 0.5
  );
  return listaDiRitorno;
};

var anagrammaParole = function (arrayParole, oggettoNome) {
  // esempio arrayParole = ['banana', 'papaya', 'ciquita']
  // numeroParole = 2
  // paroleAnaGrammate = ['banana papaya', 'papaya ciquita']
  var arrayNome = oggettoNome.split(' ');
  var numeroParole = arrayNome.length;

  if (arrayParole.length > numeroParole) {
    var paroleAnagrammate = [];
    for (let i = 0; i < arrayParole.length && arrayParole.length >= numeroParole + i; i++) {
      var parola = [arrayParole[i]];
      var paroleUnite;
      for (let j = i + 1; j < i + numeroParole; j++) {
        parola.push(arrayParole[j]);
      }
      paroleUnite = parola.join(' ');
      paroleAnagrammate.push(paroleUnite);
    }
    return paroleAnagrammate;
  } else {
    return arrayParole;
  }
}

var filtroListaDalNome = function (arrayParole, lista) {
  return lista.filter(function (oggetto) {
    var paroleAnagrammate = anagrammaParole(arrayParole, oggetto.nome);
    return paroleAnagrammate.some(parolaAnagrammata =>
      natural.JaroWinklerDistance(oggetto.nome, parolaAnagrammata, undefined, true) > 0.8
    );
  });
}

var filtroPerTag = function (arrayParole, lista) {
  return lista.filter(oggetto =>
    oggetto.tags.some(tag => natural.JaroWinklerDistance(tag, arrayParole.join(), undefined, true) > 0.8)
  );
}

var ricercaIngredientiPapabili = function (arrayParole, listaIngredienti) {
  var listaOrdinata = listaIngredienti.filter(function (ingrediente) {
    return arrayParole.find(function (parola) {
      if (natural.JaroWinklerDistance(ingrediente.nome, parola, undefined, true) > 0.8) {
        ingrediente.match = natural.JaroWinklerDistance(ingrediente.nome, parola, undefined, true);
        return true;
      }
      return false;
    });
  });
  var listaDiRitorno = listaOrdinata.sort(function (a, b) {
    return b.match - a.match;
  });
  return listaDiRitorno;
};

var somiglianzaParoleArray = function (arrayParole, arrayDiConfronto) {
  var contatore = 0;
  arrayParole.forEach((item, i) => {
    arrayDiConfronto.forEach((item2, j) => {
      if (natural.JaroWinklerDistance(item, item2, undefined, true) > 0.8) {
        contatore += natural.JaroWinklerDistance(item, item2, undefined, true);
      }
    });
  });
  return contatore / (arrayDiConfronto.length);
};

var ricercaViniProposti = function (listaIdVini, listaVini) {
  return listaVini.filter(vino => listaIdVini.some(id => vino.id === id));
};

var concatTags = function (lista) {
  var listaTmp = [];
  for (let i = 0; i < lista.length; i++) {
    for (let j = 0; j < lista[i].tags.length; j++) {
      var arrayizzazione = [lista[i].tags[j]];
      listaTmp.push(arrayizzazione);
    }
  }
  return listaTmp;
};

var filtroParoleInutili = function (listaParole, listaParoleChiave) {
  var listaParoleFiltrate = listaParole.filter(parola =>
    listaParoleChiave.some(parolaChiave =>
      natural.JaroWinklerDistance(parola, parolaChiave, undefined, true) > 0.75));
  return listaParoleFiltrate;
};

funzioniPerRicercaParole.ricetteDaIDs = ricetteDaIDs;
funzioniPerRicercaParole.ricetteDaIngrediente = ricetteDaIngrediente;
funzioniPerRicercaParole.ricetteDaIngredienti = ricetteDaIngredienti;
funzioniPerRicercaParole.somiglianzaParoleArray = somiglianzaParoleArray;
funzioniPerRicercaParole.ricercaIngredientiPapabili = ricercaIngredientiPapabili;
funzioniPerRicercaParole.ricercaViniProposti = ricercaViniProposti;
funzioniPerRicercaParole.ricercaTipoIngredientePapabile = ricercaTipoIngredientePapabile;
funzioniPerRicercaParole.filtroPerTag = filtroPerTag;
funzioniPerRicercaParole.filtroListaDalNome = filtroListaDalNome;
funzioniPerRicercaParole.concatTags = concatTags;
funzioniPerRicercaParole.filtroParoleInutili = filtroParoleInutili;

module.exports = funzioniPerRicercaParole;
