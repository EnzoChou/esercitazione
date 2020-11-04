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
  if (arrayParole.length >= numeroParole) {
    var paroleAnagrammate = [];
    for (let i = 0; i < arrayParole.length && arrayParole.length - i >= numeroParole; i++) {
      var parola = [];
      var paroleUnite;
      for (let j = i; j < i + numeroParole; j++) {
        parola.push(arrayParole[j]);
      }
      paroleUnite = parola.join(' ');
      paroleAnagrammate.push(paroleUnite);
    }
    return paroleAnagrammate;
  } else {
    return [arrayParole.join(' ')];
  }
};

var combinazioniDiParole = function (frase) {
  var arrayParole = frase.split(' ');
  var numeroParole = arrayParole.length;
  var arraySuCuiLavorare = arrayParole;
  var arrayTmp = [];
  if (numeroParole > 1) {
    for (let i = 0; i < numeroParole; i++) {
      for (let j = i + 1; j < numeroParole + 1; j++) {
        arraySuCuiLavorare = arrayParole.slice(i, j)
        var tmp = arraySuCuiLavorare.join(' ');
        arrayTmp.push(tmp);
      }
    }
  } else {
    arrayTmp = arrayParole;
  }
  return arrayTmp;
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
    oggetto.gradoSomiglianza = 0;
    var paroleAnagrammate = anagrammaParole(arrayParole, oggetto.nome);
    return paroleAnagrammate.some(parolaAnagrammata => {
      /* if (natural.JaroWinklerDistance(oggetto.nome, parolaAnagrammata, undefined, true) > 0.7) {
        console.log('[filtro nome]\nA probabilità "' + oggetto.nome + '" e "' + parolaAnagrammata + '" ---> ',
          natural.JaroWinklerDistance(oggetto.nome, parolaAnagrammata, undefined, true));
      }*/
      // console.log('ricetta', oggetto.nome, 'parolaAnagrammata', parolaAnagrammata, natural.JaroWinklerDistance(oggetto.nome, parolaAnagrammata, undefined, true));

      oggetto.gradoSomiglianza = Math.max(oggetto.gradoSomiglianza,
        natural.JaroWinklerDistance(oggetto.nome, parolaAnagrammata, undefined, true));

      return natural.JaroWinklerDistance(oggetto.nome, parolaAnagrammata, undefined, true) > 0.85;
    })
  });
};

var arrSum = function (arr) {
  return arr.reduce(function (a, b) {
    return a + b
  }, 0);
}

var filtroListaDalNomeApprofondito = function (arrayParole, lista) {
  return lista.filter(oggetto => {
    var parole = combinazioniDiParole(oggetto.nome);
    var array = combinazioniDiParole(arrayParole.join(' '));
    return parole.some(parteNome => {
      return array.some(parteImmissioneUtente => {
        return natural.JaroWinklerDistance(parteNome, parteImmissioneUtente, undefined, true) > 0.85
      })
    })
  }).sort((a, b) => {
    return (arrSum(arrayParole.map(elem => {
      return natural.JaroWinklerDistance(b.nome, elem, undefined, true)
    })) - arrSum(arrayParole.map(elem => {
      return natural.JaroWinklerDistance(a.nome, elem, undefined, true)
    })))
  })
};

var filtroPerTag = function (arrayParole, lista) {
  return lista.filter(oggetto => {
    oggetto.gradoSomiglianza = 0;
    return oggetto.tags.some(tag => {
      return arrayParole.some(parola => {
        oggetto.gradoSomiglianza = Math.max(oggetto.gradoSomiglianza, natural.JaroWinklerDistance(parola, tag, undefined, true));
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
        // console.log('arrayDiConfronto', arrayDiConfronto, '\nitem --->', item, 'item2 --->', item2, 'distance --->', natural.JaroWinklerDistance(item, item2, undefined, true));
        // console.log('valore contatore', contatore);
      }
    });
  });
  var valoreDiRitorno = contatore / (arrayDiConfronto.length);
  // if (valoreDiRitorno > 0.5) { console.log(arrayDiConfronto, 'ritorno valore di somiglianza', valoreDiRitorno); }
  return valoreDiRitorno;
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
      /* if (natural.JaroWinklerDistance(parola, parolaChiave, undefined, true) > 0.6) {
        console.log('[filtro parole inutili]\nprobabilità "' + parola + '" e "' + parolaChiave + '" ---> ',
          natural.JaroWinklerDistance(parola, parolaChiave, undefined, true));
      }*/
      return natural.JaroWinklerDistance(parola, parolaChiave, undefined, true) > 0.6;
    })
  });
  return listaParoleFiltrate;
};

var controlloAggettivi = function (arrayParole, viniProposti) {
  console.log('viniProposti ----> ', viniProposti);
  var viniConAggettivi = viniProposti.filter(vinoProposto => {
    return vinoProposto.tags.some(tag => {
      var paroleAnagrammate = anagrammaParole(arrayParole, tag);
      return paroleAnagrammate.some(parolaAnagrammata => {
        console.log(parolaAnagrammata, tag, natural.JaroWinklerDistance(parolaAnagrammata, tag, undefined, true));
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

var manipolazioneParoleDaCercareEAggettivi = function (paroleDaCercareFiltrate, listaAggettivi) {
  var oggettoFunzione = {}
  oggettoFunzione.aggettiviPertinenti = paroleDaCercareFiltrate.filter(parola => {
    return listaAggettivi.some(aggettivo => {
      return natural.JaroWinklerDistance(aggettivo, parola, undefined, true) > 0.85;
    })
  })
  oggettoFunzione.nuoveParole = paroleDaCercareFiltrate.filter(parola => {
    return !oggettoFunzione.aggettiviPertinenti.some(aggettivo => {
      return natural.JaroWinklerDistance(aggettivo, parola, undefined, true) > 0.85;
    })
  });
  return oggettoFunzione;
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
funzioniPerRicercaParole.filtroListaDalNomeApprofondito = filtroListaDalNomeApprofondito;
funzioniPerRicercaParole.manipolazioneParoleDaCercareEAggettivi = manipolazioneParoleDaCercareEAggettivi;

module.exports = funzioniPerRicercaParole;