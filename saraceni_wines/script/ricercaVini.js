var funzioniGeneriche = require('./funzioniGeneriche');
var Promise = require('bluebird');
var natural = require('natural');
const {
  performance
} = require('perf_hooks');
var data = null;

// METODI DI RICERCA DALLA LISTA RICETTE

var matchRicetta = function (arrayParole = [], listaRicette = []) {
  // var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  console.log('\n\n------------------ricerca Ricette------------------\n\n');
  var ricetteTrovate = funzioniGeneriche.filtroListaDalNome(arrayParole, listaRicette);
  return ricetteTrovate;
};

// METODI DI RICERCA DALLA LISTA DEGLI INGREDIENTI PRINCIPALI

var ricetteTrovateDaIngredienti = function (arrayParole = [], listaIngredienti = [], listaRicette = []) {
  console.log('\n\n------------------ricerca per ingredienti------------------\n\n');
  // var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  var ingredientiTrovati = funzioniGeneriche.filtroListaDalNome(arrayParole, listaIngredienti);
  if (ingredientiTrovati[0]) {
    ingredientiTrovati.sort((a, b) => {
      return b.gradoSomiglianza - a.gradoSomiglianza;
    });
    return funzioniGeneriche.ricetteDaIngrediente(ingredientiTrovati[0], listaRicette);
  } else {
    return [];
  }
};

// METODI DI RICERCA PER ABBINAMENTI GENERALI

var ricercaPerAbbinamentiGenerali = function (arrayParole = [], listaAbbinamentiGenerali = []) {
  console.log('\n\n------------------ricerca negli abbinamenti generali------------------\n\n');
  // console.log('\n\n\nlistaAbbinamentiGenerali\n\n\n', listaAbbinamentiGenerali);
  var risultatoTrovato = funzioniGeneriche.filtroListaDalNome(arrayParole, listaAbbinamentiGenerali);
  console.log('risultato dopo il filtro per nome', risultatoTrovato);
  risultatoTrovato = funzioniGeneriche.filtroPerTag(arrayParole, risultatoTrovato);
  console.log('risultato dopo il filtro per tag', risultatoTrovato);
  return risultatoTrovato;
};

// METODI DI RICERCA PER TIPOLOGIA

var abbinamentoTrovatoPerTipologia = function (arrayParole, obj) {
  console.log('è stata chiamata la funzione dell\'abbinamento per tipologia');
  // var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  var listaTipi = [];
  listaTipi = funzioniGeneriche.filtroListaDalNome(arrayParole, obj);
  if (listaTipi.length === 0) {
    listaTipi = funzioniGeneriche.filtroPerTag(arrayParole, obj);
  }
  return listaTipi;
};

// METODI DI RICERCA PER L'OCCASIONE

var occasioneTrovata = function (arrayParole = [], obj = []) {
  console.log('\n\n------------------ricerca occasioni------------------\n\n');
  // var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  var listaOccasioniTmp = [];
  listaOccasioniTmp = funzioniGeneriche.filtroListaDalNome(arrayParole, obj);
  console.log('\nlista occasioni tmp\n', listaOccasioniTmp);
  return listaOccasioniTmp;
};

// METODI DI RICERCA DIRETTAMENTE DALLA LISTA VINI

var abbinamentoTrovatoDallaListaVini = function (arrayParole = [], listaVini = [], listaAggettivi = []) {
  console.log('\n\n------------------ricerca diretta nei vini------------------\n\n');
  if (listaAggettivi.length > 0) {
    arrayParole = listaAggettivi;
  }
  var obj = {
    viniProposti: []
  };
  var listaViniTmp = [];
  listaViniTmp = funzioniGeneriche.filtroListaDalNome(arrayParole, listaVini);
  if (listaViniTmp.length === 0) {
    console.log('la ricerca per nome non ha prodotto risultati, provo una ricerca approfondita');
    listaViniTmp = funzioniGeneriche.filtroListaDalNomeApprofondito(arrayParole, listaVini);
  }
  if (listaViniTmp.length === 0) {
    console.log('la ricerca per nome e nome approfondito non ha prodotto risultati, provo con i tag');
    listaViniTmp = funzioniGeneriche.filtroPerTag(arrayParole, listaVini);
  }
  if (listaViniTmp.length > 3) {
    var indexArr = [];
    while (indexArr.length < 3) {
      var rndIndex = listaViniTmp[Math.floor(Math.random() * listaViniTmp.length)];
      if (indexArr.indexOf(rndIndex) == -1) // if rndIndex is not in indexArr
        indexArr.push(rndIndex);
    }
    listaViniTmp = indexArr;
    console.log('vini proposti randomicamente perchè superiori a 3--->', listaViniTmp);
  }
  obj.viniProposti = listaViniTmp;
  return [obj];

};

// METODI DI RICERCA PER MISMATCH

var laRicercaNonHaProdottoRisultatiSoddisfacenti = function (arrayParole) {
  console.log('è stata chiamata la funzione per mismatch');
  return [];
};

// ELABORAZIONE DATI DALLA RICHIESTA UTENTE

var creazioneOggettoParametri = function (richiestaUtente, params = '', listaAggettivi) {
  var parametri = {};
  if (params) {
    try {
      var parametriInArray = params.split(',');
      parametriInArray.forEach(param => {
        if (param.indexOf('=') !== -1) {
          var chiave = param.slice(0, param.indexOf('='));
          var campo = param.slice(param.indexOf('=') + 1, param.length);
          return parametri[chiave] = campo;
        } else {
          var chiave = param;
          var campo = true;
          return parametri[chiave] = campo;
        }
      })
    } catch (err) {
      console.log('errore nella creazione dell\'oggetto parametri, ritorno oggetto vuoto\n', err);
      return parametri;
    }
  }
  console.log('parametri inseriti ---> ', params);
  console.log('oggetto di parametri ---> ', parametri);
  return parametri;
};

var tokenizeERiassemblamentoNomiDaLista = function (lista) {
  return lista.map(elem => {
    elem.nome = elem.nome.tokenizeAndStem().join(' ');
    return elem;
  })
};

var metodoScelto = function (richiestaUtente = '', params = '') {
  // var strutture = external_services.saraceni_wines.data.ricette;
  // var funzioniGeneriche = external_services.saraceni_wines.integrations.funzioniGeneriche;
  return new Promise((resolve, reject) => {
    var paroleChiaveConCuiCercareDirettamenteInVini = ['wine', 'wines', 'vino', 'booze', 'liquor', 'drink'];
    // variabile di ritorno
    var arrayDiRitorno = [];

    if (!data) {
      data = require('../json/ricette.json');
    }
    natural.PorterStemmer.attach(); // english language set -> 'words'.tokenizeAndStem() toSingularizeAndTurnIntoArrayOfWords

    // RICETTE.JSON
    var listaRicette = data.listaRicette;
    var listaVini = data.listaViniConAggettivi;
    var listaAggettivi = data.listaAggettiviVino;
    var listaParoleChiavePerCategoria = data.listaParoleChiavePerCategoria;
    var listaAbbinamentiGenerali = data.listaAbbinamentiGenerali;
    var listaOccasioni = data.listaOccasioni;
    // var listaAbbinamentiPerTipologia = data.listaAbbinamentiPerTipologia;
    var listaParoleChiave = data.listaParoleChiave;
    var listaIngredientiPrincipali = data.listaIngredientiPrincipali;
    var listaIngredientiSecondari = data.listaIngredientiSecondari;

    // var listaParoleChiave = data.listaParoleChiave;

    // console.log(natural.PorterStemmer.stem(utente));
    // console.log(natural.JaroWinklerDistance("dixon","dicksonx", undefined, true));

    // TOKENIZZAZIONE E RIMONTAGGIO NOMI
    listaRicette = tokenizeERiassemblamentoNomiDaLista(listaRicette);
    listaAbbinamentiGenerali = tokenizeERiassemblamentoNomiDaLista(listaAbbinamentiGenerali);
    listaIngredientiPrincipali = tokenizeERiassemblamentoNomiDaLista(listaIngredientiPrincipali);
    listaIngredientiSecondari = tokenizeERiassemblamentoNomiDaLista(listaIngredientiSecondari);
    listaOccasioni = tokenizeERiassemblamentoNomiDaLista(listaOccasioni);


    var nomiRicette = listaRicette.map(ricetta => ricetta.nome.tokenizeAndStem());
    var abbinamentiGenerali = listaAbbinamentiGenerali.map(tipo => tipo.nome.tokenizeAndStem());
    var nomiVini = listaParoleChiavePerCategoria.listaVini.map(vino => vino.tokenizeAndStem());
    // var abbinamentiPerTipologiaTags = funzioniGeneriche.concatTags(listaAbbinamentiPerTipologia);
    // var abbinamentiPerTipologia = listaAbbinamentiPerTipologia.map(tipo => tipo.nome.tokenizeAndStem());
    // abbinamentiPerTipologia = abbinamentiPerTipologia.concat(abbinamentiPerTipologiaTags);
    // var antipastiContorni = listaParoleChiavePerCategoria.antipastiContorni.map(parola => parola.stem());
    // var primi = listaParoleChiavePerCategoria.primi.map(parola => parola.stem());
    // var secondi = listaParoleChiavePerCategoria.secondi.map(parola => parola.stem());
    var ingredientiPrincipali = listaParoleChiavePerCategoria.ingredientiPrincipali.map(parola => parola.tokenizeAndStem());
    var ingredientiSecondari = listaParoleChiavePerCategoria.ingredientiSecondari.map(parola => parola.tokenizeAndStem());
    var occasioni = listaOccasioni.map(occasione => occasione.nome.tokenizeAndStem());

    // PULIZIA ARRAY DAGLI ARRAY VUOTI

    nomiRicette = nomiRicette.filter(array => array.length !== 0);
    abbinamentiGenerali = abbinamentiGenerali.filter(array => array.length !== 0);
    // abbinamentiPerTipologiaTags = abbinamentiPerTipologiaTags.filter(array => array.length !== 0);
    // abbinamentiPerTipologia = abbinamentiPerTipologia.filter(array => array.length !== 0);
    ingredientiPrincipali = ingredientiPrincipali.filter(array => array.length !== 0);
    ingredientiSecondari = ingredientiSecondari.filter(array => array.length !== 0);
    // console.log('abbinamentipertipologiatags dopo l\'arrayizzazione dei vari tag', abbinamentiPerTipologiaTags);

    var arrayPunteggio = [
      nomiRicette,
      abbinamentiGenerali,
      occasioni,
      ingredientiPrincipali,
      ingredientiSecondari,
      nomiVini
    ];

    // SUPPORTO SUGGERIMENTI DA PARAM


    var paroleDaCercare = [];
    var paroleDaCercareFiltrate = [];
    if (typeof richiestaUtente == 'string') {
      paroleDaCercare = richiestaUtente.tokenizeAndStem();
      paroleDaCercareFiltrate = funzioniGeneriche.filtroParoleInutili(paroleDaCercare, listaParoleChiave);
    }

    // ELABORAZIONE SUGGERIMENTI
    var parametri = creazioneOggettoParametri(paroleDaCercare, params);
    if (parametri.aggettivo) {
      var oggettoFunzione = funzioniGeneriche.manipolazioneParoleDaCercareEAggettivi(paroleDaCercareFiltrate, listaAggettivi);
      paroleDaCercareFiltrate = oggettoFunzione.nuoveParole;
      parametri.aggettivo = oggettoFunzione.aggettiviPertinenti;
      console.log('gli aggettivi sono:', parametri.aggettivo);
    }
    console.log('parole inserite dall\'utente non lavorate ---> ', richiestaUtente);
    console.log('parole inserite dall\'utente', paroleDaCercare);
    console.log('parole inserite dall\'utente filtrate', paroleDaCercareFiltrate);
    var indexScelto = 0;
    if (parametri.portata) {
      listaRicette = funzioniGeneriche.filtroPerTag([parametri.portata, 'Ricette italiane'], listaRicette);
      // listaIngredientiPrincipali = funzioniGeneriche.filtroPerTag([parametri.portata], listaIngredientiPrincipali);
      // console.log('lista ricette dopo il filtro della portata', listaRicette);
    }
    if (parametri.tipologia) { // suggerimento tipologia
      paroleDaCercareFiltrate = [parametri.portata, parametri.tipologia];
      indexScelto = 1;
    } else if (parametri.occasione) { // suggerimento occasione
      indexScelto = 2;
    } else if (Math.max(...nomiVini.map(nomeVino => { // controllo più stretto per il vino
        return Math.max(funzioniGeneriche.somiglianzaParoleArray(paroleDaCercareFiltrate, nomeVino),
          funzioniGeneriche.somiglianzaParoleArray(nomeVino, paroleDaCercareFiltrate))
      })) > 0.9 || (parametri.aggettivo && paroleDaCercareFiltrate.some(parola => paroleChiaveConCuiCercareDirettamenteInVini.includes(parola)))) {
      indexScelto = 5;
    } else { // opzione di default che ricerca nelle varie liste
      console.log('entra nella ricerca di default');
      var punteggi = arrayPunteggio.map(arrayDiArray =>
        Math.max(...arrayDiArray.map(array => {
          // console.log('somiglianza ' + paroleDaCercareFiltrate + ' - ' + array + ' ', funzioniGeneriche.somiglianzaParoleArray(paroleDaCercareFiltrate, array));
          // console.log('somiglianza ' + array + ' - ' + paroleDaCercareFiltrate + ' ', funzioniGeneriche.somiglianzaParoleArray(array, paroleDaCercareFiltrate));
          return funzioniGeneriche.somiglianzaParoleArray(paroleDaCercareFiltrate, array);
        }))
      );
      console.log(
        'indice: \n[\n\t\'-1\': laRicercaNonHaProdottoRisultatiSoddisfacenti, \n\t0: matchRicetta,\n\t1: abbinamentiGenerali, \n\t2: occasioneTrovata,\n\t3: ricetteTrovateDaIngredientiPrincipali,\n\t4: ricetteTrovateDaIngredientiSecondari,\n\t5: abbinamentoDallaListaVini\n]');
      console.log('punteggi', punteggi);
      indexScelto = punteggi.findIndex(elem => elem > 0.9);
      console.log('index scelto', indexScelto);
    }


    // var a = laRicercaNonHaProdottoRisultatiSoddisfacenti();
    // var b = matchRicetta(paroleDaCercareFiltrate, nomiRicette);
    // var c = abbinamentoTrovatoPerTipologia(paroleDaCercareFiltrate, listaAbbinamentiPerTipologia);
    // var d = ricercaPerAbbinamentiGenerali(paroleDaCercareFiltrate, listaVini); // non implementata, questo abbinamento non torna mai perchè lo stesso della tipologia
    // var e = ricetteTrovateDaPortate(paroleDaCercareFiltrate); // FORSE DA IMPLEMENTARE
    // var f = ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiPrincipali, listaRicette);
    // var g = ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiSecondari, listaRicette);
    // var h = occasioneTrovata(paroleDaCercareFiltrate, listaOccasioni);
    /*
      var arrayAlgoritmoScelto = {
        '-1': laRicercaNonHaProdottoRisultatiSoddisfacenti(),
        '0': matchRicetta(paroleDaCercareFiltrate, listaRicette),
        '1': ricercaPerAbbinamentiGenerali(paroleDaCercareFiltrate, listaAbbinamentiGenerali),
        '2': occasioneTrovata(paroleDaCercareFiltrate, listaOccasioni),
        '3': ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiPrincipali, listaRicette),
        '4': ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiSecondari, listaRicette),
        '5': abbinamentoTrovatoPerTipologia(paroleDaCercareFiltrate, listaAbbinamentiPerTipologia)
      };
    
      var listaPapabile = arrayAlgoritmoScelto[indexScelto];
      */

    if (indexScelto == '-1') {
      var listaPapabile = laRicercaNonHaProdottoRisultatiSoddisfacenti();
    } else if (indexScelto == '0') {
      var listaPapabile = matchRicetta(paroleDaCercareFiltrate, listaRicette);
    } else if (indexScelto == '1') {
      var listaPapabile = ricercaPerAbbinamentiGenerali(paroleDaCercareFiltrate, listaAbbinamentiGenerali);
    } else if (indexScelto == '2') {
      var listaPapabile = occasioneTrovata(paroleDaCercareFiltrate, listaOccasioni);
    } else if (indexScelto == '3') {
      var listaPapabile = ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiPrincipali, listaRicette);
    } else if (indexScelto == '4') {
      var listaPapabile = ricetteTrovateDaIngredienti(paroleDaCercareFiltrate, listaIngredientiSecondari, listaRicette);
    } else if (indexScelto == '5') {
      var listaPapabile = abbinamentoTrovatoDallaListaVini(paroleDaCercareFiltrate, listaVini, parametri.aggettivo);
    }



    console.log('listaPapabile', listaPapabile);

    if (listaPapabile.length > 0 && listaPapabile[0] !== undefined) {
      // se i prodotti hanno un grado di somiglianza provo a ordinarli
      if (listaPapabile[0].gradoSomiglianza) {
        listaPapabile.sort((a, b) => {
          return b.gradoSomiglianza - a.gradoSomiglianza;
        });
      }
      // var arrayDiRitorno = funzioniGeneriche.ricercaViniProposti(listaPapabile[0].viniProposti, listaVini);

      // controllo aggettivi, se ce ne sono
      // const regexFieldSpace = /[.,\/\n-\r ]/;
      // var parolePerControlloAggettivi = paroleDaCercareFiltrate; //.split(regexFieldSpace);
      if (parametri.aggettivo && parametri.aggettivo.length > 0) {
        var parolePerControlloAggettivi = parametri.aggettivo;
        console.log('controllo per gli aggettivi con ', parolePerControlloAggettivi);
        listaPapabile[0].viniProposti = funzioniGeneriche.controlloAggettivi(parolePerControlloAggettivi, listaPapabile[0].viniProposti);
      }

      if (parametri.occasione) {
        listaPapabile[0].viniProposti.forEach(vino => {
          try {
            vino.motivazione = listaPapabile[0].motivazione;
          } catch (error) {
            console.log('errore, motivazione non trovata e occasione risulta true', error);
            return;
          }
        })
      }

      console.log('arrayDiRitorno', listaPapabile[0].viniProposti);
      resolve({
        vini: listaPapabile[0].viniProposti,
        motivazione: listaPapabile[0].motivazione
      });
    } else {
      resolve([]);
    }
  })
};

exports.metodoScelto = metodoScelto;

// var modulo = {};

var t0 = performance.now();
metodoScelto('dessert','portata=dolce,tipologia=torta');
var t1 = performance.now();
console.log('\n\n\nl\'algoritmo ci ha impiegato:', t1 - t0, 'millisecondi\n\n\n');

// // modulo.matchRicetta = matchRicetta;
// // modulo.ricetteTrovateDaIngredientiPrincipali = ricetteTrovateDaIngredientiPrincipali;
// // modulo.ricetteTrovateDaIngredientiSecondari = ricetteTrovateDaIngredientiSecondari;
// // modulo.laRicercaNonHaProdottoRisultatiSoddisfacenti = laRicercaNonHaProdottoRisultatiSoddisfacenti;
// // modulo.ricetteTrovateDaPortate = ricetteTrovateDaPortate;
// // modulo.scegliMetodo = metodoScelto;