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
};
/*
var filtroListaDalNome = function (arrayParole, lista) {
  return lista.filter(function (oggetto) {
    var paroleAnagrammate = anagrammaParole(arrayParole, oggetto.nome);
    return paroleAnagrammate.some(parolaAnagrammata =>
      natural.JaroWinklerDistance(oggetto.nome, parolaAnagrammata, undefined, true) > 0.85
    );
  });
};
*/
var filtroListaDalNome = function (arrayParole, lista) {
  return lista.filter(function (oggetto) {
    var paroleAnagrammate = anagrammaParole(arrayParole, oggetto.nome);
    var paroleAnagrammate2 = anagrammaParole(oggetto.nome.split(' '), arrayParole.join(' '));
    return Math.max(paroleAnagrammate.some(parolaAnagrammata => {
      if (natural.JaroWinklerDistance(oggetto.nome, parolaAnagrammata, undefined, true) > 0.7) {
        console.log('[filtro nome]\nA probabilità "' + oggetto.nome + '" e "' + parolaAnagrammata + '" ---> ',
          natural.JaroWinklerDistance(oggetto.nome, parolaAnagrammata, undefined, true));
      }
      return natural.JaroWinklerDistance(oggetto.nome, parolaAnagrammata, undefined, true) > 0.85
    }), paroleAnagrammate2.some(parolaAnagrammata => {
      if (natural.JaroWinklerDistance(arrayParole.join(' '), parolaAnagrammata, undefined, true) > 0.7) {
        console.log('[filtro nome]\nB probabilità "' + arrayParole.join(' ') + '" e "' + parolaAnagrammata + '" ---> ',
          natural.JaroWinklerDistance(arrayParole.join(' '), parolaAnagrammata, undefined, true));
      }
      return natural.JaroWinklerDistance(arrayParole.join(' '), parolaAnagrammata, undefined, true) > 0.85
    }))
  });
};

var filtroPerTag = function (arrayParole, lista) {
  return lista.filter(oggetto => {
    return oggetto.tags.some(tag => {
      return arrayParole.some(parola => {
        return natural.JaroWinklerDistance(parola, tag, undefined, true) > 0.8;
      });
    })
  });
};

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
  arrayParole.forEach((item) => {
    arrayDiConfronto.forEach((item2) => {
      if (natural.JaroWinklerDistance(item, item2, undefined, true) > 0.8) {
        contatore += natural.JaroWinklerDistance(item, item2, undefined, true);
      }
    });
  });
  return contatore / (arrayDiConfronto.length);
};

var ricercaViniProposti = function (listaViniProposti, listaVini) {
  return listaVini.filter(vino => listaViniProposti.some(vinoProposto => vino.nome === vinoProposto.nome));
};

var concatTags = function (lista) {
  var listaTmp = [];
  if (lista) {
    for (let i = 0; i < lista.length; i++) {
      for (let j = 0; j < lista[i].tags.length; j++) {
        var arrayizzazione = [lista[i].tags[j]];
        listaTmp.push(arrayizzazione);
      }
    }
  }
  return listaTmp;
};

var filtroParoleInutili = function (listaParole, listaParoleChiave) {
  var listaParoleFiltrate = listaParole.filter(parola => {
    return listaParoleChiave.some((parolaChiave) => {
      if (natural.JaroWinklerDistance(parola, parolaChiave, undefined, true) > 0.6) {
        console.log('[filtro parole inutili]\nprobabilità "' + parola + '" e "' + parolaChiave + '" ---> ',
          natural.JaroWinklerDistance(parola, parolaChiave, undefined, true));
      }
      return natural.JaroWinklerDistance(parola, parolaChiave, undefined, true) > 0.6;
    })
  });
  return listaParoleFiltrate;
};

var controlloAggettivi = function (arrayParole, viniProposti) {
  // console.log('viniProposti ----> ', viniProposti);
  var viniConAggettivi = viniProposti.filter(vinoProposto => {
    return vinoProposto.tags.some(tag => {
      var paroleAnagrammate = anagrammaParole(arrayParole, tag);
      return paroleAnagrammate.some(parolaAnagrammata => {
        // console.log('\nsomiglianza tra "' + parolaAnagrammata + '" e "' + tag + '" -----------> ', natural.JaroWinklerDistance(parolaAnagrammata, tag, undefined, true));
        return natural.JaroWinklerDistance(parolaAnagrammata, tag, undefined, true) > 0.85;
      })
    })
  })
  if (viniConAggettivi.length > 0) {
    return viniConAggettivi;
  } else {
    return viniProposti;
  }
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
funzioniPerRicercaParole.controlloAggettivi = controlloAggettivi;

module.exports = funzioniPerRicercaParole;