// METODI DI RICERCA DALLA LISTA RICETTE

var matchRicetta = function (arrayParole, nomiRicette, listaRicette) {
  var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  console.log('è stato scelto il metodo di match da Ricette\n\n');
  console.log('arrayParole', arrayParole);
  console.log('nomiRicette', nomiRicette);

  var ricettaPerfetta = {
    index: '-1',
    max: '0.5'
  };
  var ricettaTrovata = [];

  nomiRicette.forEach((item, i) => {
    var tmp = funzioniGeneriche.somiglianzaParoleArray(arrayParole, item);
    if (tmp > ricettaPerfetta.max) {
      ricettaPerfetta.index = i;
      ricettaPerfetta.max = tmp;
      // console.log(ricettaPerfetta);
      // console.log(ricette[ricettaPerfetta.index]);
    }
  });

  if (nomiRicette[ricettaPerfetta.index]) {
    ricettaTrovata.push(listaRicette.find(ricetta =>
      ricetta.nome.tokenizeAndStem().toString() === nomiRicette[ricettaPerfetta.index].toString()
    ));
  }
  return ricettaTrovata;
};

// METODI DI RICERCA DALLA LISTA DEGLI INGREDIENTI PRINCIPALI


var ricetteTrovateDaIngredienti = function (arrayParole, obj, obj2) {
  var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  var a = funzioniGeneriche.ricercaIngredientiPapabili(arrayParole, obj);
  return funzioniGeneriche.ricetteDaIngredienti(a, obj2);
};



// METODI DI RICERCA DALLA LISTA DEGLI INGREDIENTI SECONDARI


// METODI DI RICERCA PER ABBINAMENTI GENERALI

var matchViniPerTipoPortata = function (arrayParole) {
  var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  console.log('è stato scelto il metodo di matchPerPortataETipo\n\n');
  var arrayParoleTrovate = matchTipoIngrediente(arrayParole);
  console.log('array parole trovate \n', arrayParoleTrovate);
  console.log('array parole da cercare\n', arrayParole);
  console.log('lista tipo ingredienti\n', listaAbbinamentiGenerali);
  var abbinamentiGenerali = listaAbbinamentiGenerali.filter(tipoIngrediente =>
    tipoIngrediente.nome === arrayParoleTrovate.toString);
  console.log('abbinamentiGenerali\n', abbinamentiGenerali);
  return funzioniGeneriche.filtroPerTag(arrayParoleTrovate, abbinamentiGenerali);
};

var matchTipoIngrediente = function (arrayParole) {
  var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  return funzioniGeneriche.ricercaTipoIngredientePapabile(arrayParole, abbinamentiGenerali);
};

var ricercaPerAbbinamentiGenerali = function (arrayParole, obj) {
  var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  return funzioniGeneriche.ricercaViniProposti(matchViniPerTipoPortata(arrayParole), obj);
};

// METODI DI RICERCA PER PORTATA

var ricetteTrovateDaPortate = function (arrayParole) {
  return 0;
};


// METODI DI RICERCA PER TIPOLOGIA

var abbinamentoTrovatoPerTipologia = function (arrayParole, obj) {
  var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  var listaTipi = [];
  listaTipi = funzioniGeneriche.filtroListaDalNome(arrayParole, obj);
  if (listaTipi.length === 0) {
    listaTipi = funzioniGeneriche.filtroPerTag(arrayParole, obj);
  }
  return listaTipi;
};

/*
var listaTipoIngrediente = ['carne bianca', 'carne rossa', 'formaggio', 'verdure',
  'uova', 'crostacei', 'molluschi', 'pesce'
].map(portata => portata.tokenizeAndStem());
*/

// METODI DI RICERCA PER L'OCCASIONE

var occasioneTrovata = function (arrayParole, obj) {
  var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  var listaOccasioniTmp = [];
  listaOccasioniTmp = funzioniGeneriche.filtroListaDalNome(arrayParole, obj);
  console.log('\nlista occasioni tmp\n', listaOccasioniTmp);
  return listaOccasioniTmp;
};

// METODI DI RICERCA PER MISMATCH

var laRicercaNonHaProdottoRisultatiSoddisfacenti = function (arrayParole) {
  return [];
};

// ELABORAZIONE DATI DALLA RICHIESTA UTENTE

var metodoScelto = function (richiestaUtente) {
  console.log("test");

  var strutture = external_services.saraceni_wines.data.ricette;
  var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  natural.PorterStemmer.attach(); // english language set -> 'words'.tokenizeAndStem() toSingularizeAndTurnIntoArrayOfWords

  // RICETTE.JSON
  var listaRicette = strutture.listaRicette;
  var listaVini = strutture.listaVini;
  var listaParoleChiavePerCategoria = strutture.listaParoleChiavePerCategoria;
  var listaAbbinamentiGenerali = strutture.listaAbbinamentiGenerali;
  var listaOccasioni = strutture.listaOccasioni;
  var listaAbbinamentiPerTipologia = strutture.listaAbbinamentiPerTipologia;
  var listaParoleChiave = strutture.listaParoleChiave;


  var listaIngredientiPrincipali = strutture.listaIngredientiPrincipali;
  var listaIngredientiSecondari = strutture.listaIngredientiSecondari;

  // var listaParoleChiave = strutture.listaParoleChiave;

  // console.log(natural.PorterStemmer.stem(utente));
  // console.log(natural.JaroWinklerDistance("dixon","dicksonx", undefined, true));


  var nomiRicette = listaRicette.map(ricetta => ricetta.nome.tokenizeAndStem());
  var abbinamentiGenerali = listaAbbinamentiGenerali.map(tipo => tipo.nome.tokenizeAndStem());
  var abbinamentiPerTipologiaTags = funzioniGeneriche.concatTags(listaAbbinamentiPerTipologia);
  var abbinamentiPerTipologia = listaAbbinamentiPerTipologia.map(tipo => tipo.nome.tokenizeAndStem());
  abbinamentiPerTipologia = abbinamentiPerTipologia.concat(abbinamentiPerTipologiaTags);
  // var antipastiContorni = listaParoleChiavePerCategoria.antipastiContorni.map(parola => parola.stem());
  // var primi = listaParoleChiavePerCategoria.primi.map(parola => parola.stem());
  // var secondi = listaParoleChiavePerCategoria.secondi.map(parola => parola.stem());
  var ingredientiPrincipali = listaParoleChiavePerCategoria.ingredientiPrincipali.map(parola => parola.tokenizeAndStem());
  var ingredientiSecondari = listaParoleChiavePerCategoria.ingredientiSecondari.map(parola => parola.tokenizeAndStem());
  var occasioni = listaOccasioni.map(occasione => occasione.nome.tokenizeAndStem());

  // PULIZIA ARRAY DAGLI ARRAY VUOTI

  nomiRicette = nomiRicette.filter(array => array.length !== 0);
  abbinamentiGenerali = abbinamentiGenerali.filter(array => array.length !== 0);
  abbinamentiPerTipologiaTags = abbinamentiPerTipologiaTags.filter(array => array.length !== 0);
  abbinamentiPerTipologia = abbinamentiPerTipologia.filter(array => array.length !== 0);
  ingredientiPrincipali = ingredientiPrincipali.filter(array => array.length !== 0);
  ingredientiSecondari = ingredientiSecondari.filter(array => array.length !== 0);
  // console.log('abbinamentipertipologiatags dopo l\'arrayizzazione dei vari tag', abbinamentiPerTipologiaTags);

  var listaPortate = ['antipasto', 'primo', 'secondo', 'contorno',
    'dessert'
  ].map(portata => portata.tokenizeAndStem()); // da implementare quello automatico


  var arrayPunteggio = [
    nomiRicette,
    abbinamentiPerTipologia,
    abbinamentiGenerali,
    listaPortate,
    ingredientiPrincipali,
    ingredientiSecondari,
    occasioni
  ];

  var paroleDaCercare = richiestaUtente.tokenizeAndStem();
  var paroleDaCercareFiltrate = funzioniGeneriche.filtroParoleInutili(paroleDaCercare, listaParoleChiave);
  console.log('parole inserite dall\'utente', paroleDaCercare);
  console.log('parole inserite dall\'utente filtrate', paroleDaCercareFiltrate);
  var punteggi = arrayPunteggio.map(arrayDiArray =>
    Math.max(...arrayDiArray.map(array =>
      funzioniGeneriche.somiglianzaParoleArray(paroleDaCercareFiltrate, array)
    ))
  );

  console.log(
    'indice: \n[\n\t\'-1\': laRicercaNonHaProdottoRisultatiSoddisfacenti, \n\t0: matchRicetta,\n\t1: abbinamentoTrovatoPerTipologia,\n\t 2: ricercaPerAbbinamentiGenerali,\n\t 3: ricetteTrovateDaPortate, \n\t 4: ricetteTrovateDaIngredientiPrincipali,\n\t 5: ricetteTrovateDaIngredientiSecondari,\n\t 6: occasioneTrovata\n]');
  console.log('punteggi', punteggi);
  var indexScelto = punteggi.findIndex(elem => elem > 0.9);
  console.log('index scelto', indexScelto);

  // var a = laRicercaNonHaProdottoRisultatiSoddisfacenti();
  // var b = matchRicetta(paroleDaCercareFiltrate, nomiRicette);
  // var c = abbinamentoTrovatoPerTipologia(paroleDaCercareFiltrate, listaAbbinamentiPerTipologia);
  // var d = ricercaPerAbbinamentiGenerali(paroleDaCercareFiltrate, listaVini); // non implementata, questo abbinamento non torna mai perchè lo stesso della tipologia
  // var e = ricetteTrovateDaPortate(paroleDaCercareFiltrate); // FORSE DA IMPLEMENTARE
  // var f = ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiPrincipali, listaRicette);
  // var g = ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiSecondari, listaRicette);
  // var h = occasioneTrovata(paroleDaCercareFiltrate, listaOccasioni);

  // var arrayAlgoritmoScelto = {
  //   '-1': laRicercaNonHaProdottoRisultatiSoddisfacenti(),
  //   '0': matchRicetta(paroleDaCercareFiltrate, nomiRicette),
  //   '1': abbinamentoTrovatoPerTipologia(paroleDaCercareFiltrate, listaAbbinamentiPerTipologia),
  //   '2': ricercaPerAbbinamentiGenerali(paroleDaCercareFiltrate, listaVini), // non implementata, questo abbinamento non torna mai perchè lo stesso della tipologia
  //   '3': ricetteTrovateDaPortate(paroleDaCercareFiltrate), // FORSE DA IMPLEMENTARE
  //   '4': ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiPrincipali, listaRicette),
  //   '5': ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiSecondari, listaRicette),
  //   '6': occasioneTrovata(paroleDaCercareFiltrate, listaOccasioni)
  // };

  // var listaPapabile = arrayAlgoritmoScelto[indexScelto];

  if (indexScelto == '-1') {
    var listaPapabile = laRicercaNonHaProdottoRisultatiSoddisfacenti();
  } else if (indexScelto == '0') {
    var listaPapabile = matchRicetta(paroleDaCercareFiltrate, nomiRicette, listaRicette);
  } else if (indexScelto == '1') {
    var listaPapabile = abbinamentoTrovatoPerTipologia(paroleDaCercareFiltrate, listaAbbinamentiPerTipologia);
  } else if (indexScelto == '2') {
    var listaPapabile = ricercaPerAbbinamentiGenerali(paroleDaCercareFiltrate, listaVini);
  } else if (indexScelto == '3') {
    var listaPapabile = ricetteTrovateDaPortate(paroleDaCercareFiltrate);
  } else if (indexScelto == '4') {
    var listaPapabile = ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiPrincipali, listaRicette);
  } else if (indexScelto == '5') {
    var listaPapabile = ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiSecondari, listaRicette);
  } else if (indexScelto == '6') {
    var listaPapabile = occasioneTrovata(paroleDaCercareFiltrate, listaOccasioni);
  }

  console.log('listaPapabile', listaPapabile);

  if (listaPapabile.length > 0 && listaPapabile[0] !== undefined) {
    var arrayDiRitorno = funzioniGeneriche.ricercaViniProposti(listaPapabile[0].viniProposti, listaVini);
    console.log('arrayDiRitorno', arrayDiRitorno);
    return arrayDiRitorno;
  } else {
    return [];
  }
};

exports.metodoScelto = metodoScelto;

// metodoScelto("chicken");

// var modulo = {};

// // metodoScelto('i\'m watching harry potter tonight and i\'d like something for my oyster rockfeller');

// // modulo.matchRicetta = matchRicetta;
// // modulo.ricetteTrovateDaIngredientiPrincipali = ricetteTrovateDaIngredientiPrincipali;
// // modulo.ricetteTrovateDaIngredientiSecondari = ricetteTrovateDaIngredientiSecondari;
// // modulo.laRicercaNonHaProdottoRisultatiSoddisfacenti = laRicercaNonHaProdottoRisultatiSoddisfacenti;
// // modulo.ricetteTrovateDaPortate = ricetteTrovateDaPortate;
// modulo.scegliMetodo = metodoScelto;

// module.exports = modulo;