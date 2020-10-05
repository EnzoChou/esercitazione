var funzioniGeneriche = require('./funzioniGeneriche');
var natural = require('natural');
const {
  performance
} = require('perf_hooks');
var data = null;

// METODI DI RICERCA DALLA LISTA RICETTE

var matchRicetta = function (arrayParole, listaRicette) {
  // var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  console.log('è stato scelto il metodo di match da Ricette\n\n');
  var ricettaTrovata = funzioniGeneriche.filtroListaDalNome(arrayParole, listaRicette);
  return ricettaTrovata;
};

// METODI DI RICERCA DALLA LISTA DEGLI INGREDIENTI PRINCIPALI

var ricetteTrovateDaIngredienti = function (arrayParole, obj, obj2) {
  // var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  var a = funzioniGeneriche.ricercaIngredientiPapabili(arrayParole, obj);
  return funzioniGeneriche.ricetteDaIngredienti(a, obj2);
};

// METODI DI RICERCA PER TIPOLOGIA

var abbinamentoTrovatoPerTipologia = function (arrayParole, obj) {
  // var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  var listaTipi = [];
  listaTipi = funzioniGeneriche.filtroListaDalNome(arrayParole, obj);
  if (listaTipi.length === 0) {
    listaTipi = funzioniGeneriche.filtroPerTag(arrayParole, obj);
  }
  return listaTipi;
};

// METODI DI RICERCA PER L'OCCASIONE

var occasioneTrovata = function (arrayParole, obj) {
  // var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
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
  // var strutture = external_services.saraceni_wines.data.ricette;
  // var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  if (!data) {
    data = require('../json/ricette.json');
  }
  natural.PorterStemmer.attach(); // english language set -> 'words'.tokenizeAndStem() toSingularizeAndTurnIntoArrayOfWords

  // RICETTE.JSON
  var listaRicette = data.listaRicette;
  var listaVini = data.listaVini;
  var listaParoleChiavePerCategoria = data.listaParoleChiavePerCategoria;
  // var listaAbbinamentiGenerali = data.listaAbbinamentiGenerali;
  var listaOccasioni = data.listaOccasioni;
  var listaAbbinamentiPerTipologia = data.listaAbbinamentiPerTipologia;
  var listaParoleChiave = data.listaParoleChiave;
  var listaIngredientiPrincipali = data.listaIngredientiPrincipali;
  var listaIngredientiSecondari = data.listaIngredientiSecondari;

  // var listaParoleChiave = data.listaParoleChiave;

  // console.log(natural.PorterStemmer.stem(utente));
  // console.log(natural.JaroWinklerDistance("dixon","dicksonx", undefined, true));

  var nomiRicette = listaRicette.map(ricetta => ricetta.nome.tokenizeAndStem());
  // var abbinamentiGenerali = listaAbbinamentiGenerali.map(tipo => tipo.nome.tokenizeAndStem()); //abbinamenti generali non usato
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
  // abbinamentiGenerali = abbinamentiGenerali.filter(array => array.length !== 0);
  abbinamentiPerTipologiaTags = abbinamentiPerTipologiaTags.filter(array => array.length !== 0);
  abbinamentiPerTipologia = abbinamentiPerTipologia.filter(array => array.length !== 0);
  ingredientiPrincipali = ingredientiPrincipali.filter(array => array.length !== 0);
  ingredientiSecondari = ingredientiSecondari.filter(array => array.length !== 0);
  // console.log('abbinamentipertipologiatags dopo l\'arrayizzazione dei vari tag', abbinamentiPerTipologiaTags);

  var arrayPunteggio = [
    nomiRicette,
    occasioni,
    ingredientiPrincipali,
    ingredientiSecondari,
    abbinamentiPerTipologia
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
    'indice: \n[\n\t\'-1\': laRicercaNonHaProdottoRisultatiSoddisfacenti, \n\t0: matchRicetta,\n\t1: occasioneTrovata,\n\t 2: ricetteTrovateDaIngredientiPrincipali,\n\t 3: ricetteTrovateDaIngredientiSecondari,\n\t 4: abbinamentoTrovatoPerTipologia\n]');
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

  var arrayAlgoritmoScelto = {
    '-1': laRicercaNonHaProdottoRisultatiSoddisfacenti(),
    '0': matchRicetta(paroleDaCercareFiltrate, listaRicette),
    '1': occasioneTrovata(paroleDaCercareFiltrate, listaOccasioni),
    '2': ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiPrincipali, listaRicette),
    '3': ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiSecondari, listaRicette),
    '4': abbinamentoTrovatoPerTipologia(paroleDaCercareFiltrate, listaAbbinamentiPerTipologia)
  };

  var listaPapabile = arrayAlgoritmoScelto[indexScelto];
  /*
  if (indexScelto === '-1') {
    var listaPapabile = laRicercaNonHaProdottoRisultatiSoddisfacenti();
  } else if (indexScelto === '0') {
    var listaPapabile = matchRicetta(paroleDaCercareFiltrate, listaRicette);
  } else if (indexScelto === '1') {
    var listaPapabile = abbinamentoTrovatoPerTipologia(paroleDaCercareFiltrate, listaAbbinamentiPerTipologia);
  } else if (indexScelto === '2') {
    var listaPapabile = ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiPrincipali, listaRicette);
  } else if (indexScelto === '3') {
    var listaPapabile = ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiSecondari, listaRicette);
  } else if (indexScelto === '4') {
    var listaPapabile = occasioneTrovata(paroleDaCercareFiltrate, listaOccasioni);
  }
  */
  console.log('listaPapabile', listaPapabile);

  if (listaPapabile.length > 0 && listaPapabile[0] !== undefined) {
    // var arrayDiRitorno = funzioniGeneriche.ricercaViniProposti(listaPapabile[0].viniProposti, listaVini);
    console.log('arrayDiRitorno', arrayDiRitorno);
    return listaPapabile[0].viniProposti;
  } else {
    return [];
  }
};

exports.metodoScelto = metodoScelto;

// var modulo = {};
/*
var t0 = performance.now();
metodoScelto('i\'m watching harry potter tonight and i\'d like something for my oyster rockfeller');
var t1 = performance.now();
console.log('\n\n\nl\'algoritmo ci ha impiegato:', t1 - t0, 'millisecondi\n\n\n');
*/
// // modulo.matchRicetta = matchRicetta;
// // modulo.ricetteTrovateDaIngredientiPrincipali = ricetteTrovateDaIngredientiPrincipali;
// // modulo.ricetteTrovateDaIngredientiSecondari = ricetteTrovateDaIngredientiSecondari;
// // modulo.laRicercaNonHaProdottoRisultatiSoddisfacenti = laRicercaNonHaProdottoRisultatiSoddisfacenti;
// // modulo.ricetteTrovateDaPortate = ricetteTrovateDaPortate;
// // modulo.scegliMetodo = metodoScelto;

module.exports = metodoScelto;
