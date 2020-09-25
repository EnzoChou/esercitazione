'use strict';
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

var inputFile = '../others/ricette.xlsx';
var outputFile = '../json/ricette.json';

const ricette_json = excelToJson({
  sourceFile: inputFile
});


/*
Macrocategorie importanti : 'carne / pesce / verdure',
'antipasto / primo / secondo',
'cucina occidentale / orientale', --> 'italiana / messicana / cinese / francese'
'evento / festa',
'dolce / dessert'

carnePesceVerdure = {
'carne' : [[primi], [secondi], [antipasti/contorni]],
'pesce' : [[primi], [secondi], [antipasti/contorni]],
'verdure' : [[primi], [secondi], [antipasti/contorni]]
}

*/

/*
struttura antipastiContorni / primi / secondi / ricetteItaliane

NOMEPAGINA : [
{ B: 'NOMEPAGINA' },
{
B: 'Note introduttive: Segue la proposta di elenco NOMEPAGINA con cui istruire il Bot nel flusso Foodpairing.'
},
{
B: 'NOME RICETTA',
D: 'INGREDIENTI', //principale - optional
E: 'INGREDIENTI', //optional
F: 'INGREDIENTI', //optional
G: 'ABBINAMENTO VINO',
H: 'ABBINAMENTO VINO',
I: 'ABBINAMENTO VINO',
J: 'MOTIVAZIONE ABBINAMENTO( Max 120/150caratteri)'
},
{ RICETTA },
...,
{ C: 'Leggenda:' },
{ D: 'optional' },
{ D: 'optional' },
{ D: 'optional' },
{ D: 'optional' },
{ D: 'optional' }
]
*/

/*
{ "id" : "numeroID",
  "nomeRicetta" : "nomeRicettaA",
  "tags" : ["tagA", "tagB", "tagC"],
  "ingredienti" : ["ingredienteA","ingredienteB", "ingredienteC"],
  "viniProposti" : [{"nome" : "nomeVinoA",
                     "id" : "idVino"},{...},{...}]
}
*/
/*
function StrutturaRicetta(id,nomeRicetta,tags,ingredientiPrincipali,ingredientiSecondari,viniProposti) {
  this.id = id;
  this.ricetta = ricetta;
  this.tags = tags;
  this.ingredientiPrincipali = ingredientiPrincipali;
  this.ingredientiSecondari = ingredientiSecondari;
  this.viniProposti = viniProposti;
}
*/

const listaRicetteDaFileJson = ricette_json;
var antipastiContorni;
var primi;
var secondi;
var dessert;
var ricetteItaliane;
var listaOccasioni;
var listaParoleChiave = [];
var listaCompletaRicette = [];
var ingredientiPrincipali = [];
var ingredientiSecondari = [];
var listaAbbinamentiGenerali = [];
var listaAbbinamentiPerTipologia = [];
var listaParoleChiavePerCategoria = {};
// var ricettaToVini = {};
var listaVini = []; // LISTA VINI
var idRicetta = 1;
var idIngredientePrincipale = 1;
var idIngredienteSecondario = 1;
var idVini = 1;
var idAbbinamento = 1;
var idAbbinamentoPerTipologia = 1;
var idOccasioni = 1;

// var varToString = varObj => Object.keys(varObj)[0];

// POPOLA LISTA VINI

function recuperoColonneVini(legenda) {
  var colonneVini = [];
  for (const [key, value] of Object.entries(legenda)) {
    if (value === 'ABBINAMENTO VINO') {
      colonneVini.push(key);
    }
  }
  return colonneVini;
}

function estrazioneListaVini(nomeVino) {
  if (listaVini.filter(vino => vino.nome === nomeVino).length === 0) {
    var vino = {};
    vino.id = idVini;
    vino.nome = nomeVino;
    vino.ricette = [];
    listaVini.push(vino);
    idVini++;
  }
}

function estrazioneListaIngredientiPrincipali(nomeIngredientePrincipale) {
  if (ingredientiPrincipali.filter(i => i.nome === nomeIngredientePrincipale).length === 0) {
    var ingredientePrincipale = {};
    ingredientePrincipale.id = idIngredientePrincipale;
    ingredientePrincipale.nome = nomeIngredientePrincipale;
    ingredientePrincipale.ricette = [];
    ingredientiPrincipali.push(ingredientePrincipale);
    idIngredientePrincipale++;
  }
}

function estrazioneListaIngredientiSecondari(nomeIngredienteSecondario) {
  if (ingredientiSecondari.filter(i => i.nome === nomeIngredienteSecondario).length === 0) {
    var ingredienteSecondario = {};
    ingredienteSecondario.id = idIngredienteSecondario;
    ingredienteSecondario.nome = nomeIngredienteSecondario;
    ingredienteSecondario.ricette = [];
    ingredientiSecondari.push(ingredienteSecondario);
    idIngredienteSecondario++;
  }
}

function ricercaOggetto(nomeOggetto, listaOggetti) {
  var found = listaOggetti.find(oggetto => oggetto.nome === nomeOggetto);
  if (found) {
    return found.id;
  }
  return 0;
}

function estrazioneViniConAggiornamentoListaVini(riga, colonneVini) {
  var listaViniTmp = [];
  colonneVini.forEach(function (colonna) {
    if (riga[colonna]) {
      estrazioneListaVini(riga[colonna]);
      listaViniTmp.push(ricercaOggetto(riga[colonna], listaVini));
    }
  });
  return listaViniTmp;
}

function estrazioneIngredientiPrincipaliConAggiornamentoLista(riga) {
  var listaIngredientiPrincipali = [];
  if (riga.D) {
    estrazioneListaIngredientiPrincipali(riga.D);
    listaIngredientiPrincipali.push(ricercaOggetto(riga.D, ingredientiPrincipali));
  }
  return listaIngredientiPrincipali;
}

function estrazioneIngredientiSecondariConAggiornamentoLista(riga) {
  var listaIngredientiSecondari = [];
  if (riga.E) {
    estrazioneListaIngredientiSecondari(riga.E);
    listaIngredientiSecondari.push(ricercaOggetto(riga.E, ingredientiSecondari));
  }
  if (riga.F) {
    estrazioneListaIngredientiSecondari(riga.F);
    listaIngredientiSecondari.push(ricercaOggetto(riga.F, ingredientiSecondari));
  }
  return listaIngredientiSecondari;
}

function estrazioneListaRicette(nomePagina) {
  var listaRicette = [];
  var listaPagina = listaRicetteDaFileJson[nomePagina];
  var colonneVini = recuperoColonneVini(listaPagina[2]);
  for (let i = 3; i < listaPagina.length; i++) {
    if (listaPagina[i].B) {
      var strutturaRicetta = {}; // come uscirà fuori l'oggetto RICETTA
      strutturaRicetta.id = idRicetta;
      strutturaRicetta.nome = listaPagina[i].B;
      strutturaRicetta.tags = [nomePagina];
      strutturaRicetta.ingredientiPrincipali = estrazioneIngredientiPrincipaliConAggiornamentoLista(listaPagina[i]);
      strutturaRicetta.ingredientiSecondari = estrazioneIngredientiSecondariConAggiornamentoLista(listaPagina[i]);
      strutturaRicetta.viniProposti = estrazioneViniConAggiornamentoListaVini(listaPagina[i], colonneVini);
      strutturaRicetta.motivazioneAbbinamento = listaPagina[i].J;
      idRicetta++;
      listaRicette.push(strutturaRicetta);
    }
  }
  return listaRicette;
}

function aggiornamentoLista(oggetto, lista) {
  if (lista.filter(o => o === oggetto).length === 0) {
    lista.push(oggetto);
  }
}

function aggiornamentoListeVarieDaRicette(listaRicette) {
  for (let i = 0; i < listaRicette.length; i++) {
    for (let j = 0; j < listaRicette[i].ingredientiPrincipali.length; j++) {
      var codice1 = listaRicette[i].ingredientiPrincipali[j];
      var condizione1 = false;
      for (let x = 0; x < ingredientiPrincipali.length && !condizione1; x++) {
        if (ingredientiPrincipali[x].id === codice1) {
          aggiornamentoLista(listaRicette[i].id, ingredientiPrincipali[x].ricette);
          condizione1 = true;
        }
      }
    }
    for (let j = 0; j < listaRicette[i].ingredientiSecondari.length; j++) {
      var codice2 = listaRicette[i].ingredientiSecondari[j];
      var condizione2 = false;
      for (let x = 0; x < ingredientiSecondari.length && !condizione2; x++) {
        if (ingredientiSecondari[x].id === codice2) {
          aggiornamentoLista(listaRicette[i].id, ingredientiSecondari[x].ricette);
          condizione2 = true;
        }
      }
    }
    for (let j = 0; j < listaRicette[i].viniProposti.length; j++) {
      var codice3 = listaRicette[i].viniProposti[j];
      var condizione3 = false;
      for (let x = 0; x < listaVini.length && !condizione3; x++) {
        if (listaVini[x].id === codice3) {
          aggiornamentoLista(listaRicette[i].id, listaVini[x].ricette);
          condizione3 = true;
        }
      }
    }
  }
}

function estrazioneParoleChiavePerCategoria(raccoglitore, lista, nomeCategoria) {
  var arrayTmp = [];
  lista.forEach((item, i) => {
    arrayTmp.push(item.nome);
  });
  raccoglitore[nomeCategoria] = arrayTmp;
  return arrayTmp;
}

function estrazioneParoleChiave(lista) {
  var arrayTmp = [];
  for (let i = 0; i < lista.length; i++) {
    arrayTmp.push(lista[i].nome);
    if (lista[i].tags) {
      for (let j = 0; j < lista[i].tags.length; j++) {
        if (!arrayTmp.includes(lista[i].tags[j])) {
          arrayTmp = arrayTmp.concat(lista[i].tags[j]);
        }
      }
    }
  }
  return arrayTmp;
}

function estrazioneAbbinamentiGenerali(nomePagina) {
  var listaAbbinamenti = [];
  var listaPagina = listaRicetteDaFileJson[nomePagina];
  var colonneVini = recuperoColonneVini(listaPagina[2]);
  for (let i = 3; i < listaPagina.length; i++) {
    if (listaPagina[i].B) {
      var strutturaAbbinamento = {}; // come uscirà fuori l'oggetto ABBINAMENTO
      strutturaAbbinamento.id = idAbbinamento;
      strutturaAbbinamento.nome = listaPagina[i].D.toLowerCase();
      strutturaAbbinamento.tags = [nomePagina.toLowerCase(), listaPagina[i].B.toLowerCase()];
      strutturaAbbinamento.viniProposti = estrazioneViniConAggiornamentoListaVini(listaPagina[i], colonneVini);
      strutturaAbbinamento.motivazioneAbbinamento = listaPagina[i].H; // normalmente la motivazione sta in J
      idAbbinamento++;
      listaAbbinamenti.push(strutturaAbbinamento);
    }
  }
  return listaAbbinamenti;
}

function estrazioneAbbinamentiPerTipologia(nomePagina) {
  var listaAbbinamentiPerTipologia = [];
  var listaPagina = listaRicetteDaFileJson[nomePagina];
  var colonneVini = recuperoColonneVini(listaPagina[2]);
  for (let i = 3; i < listaPagina.length; i++) {
    if (listaPagina[i].B) {
      var strutturaAbbinamentoPerTipologia = {};
      strutturaAbbinamentoPerTipologia.id = idAbbinamentoPerTipologia;
      strutturaAbbinamentoPerTipologia.nome = listaPagina[i].B.toLowerCase();
      strutturaAbbinamentoPerTipologia.tags = [];
      if (listaPagina[i].D) {
        const regexFieldSpace = /[.,\/\n-]/;
        strutturaAbbinamentoPerTipologia.tags = listaPagina[i].D.split(regexFieldSpace);
      }
      strutturaAbbinamentoPerTipologia.viniProposti = estrazioneViniConAggiornamentoListaVini(listaPagina[i], colonneVini);
      idAbbinamentoPerTipologia++;
      listaAbbinamentiPerTipologia.push(strutturaAbbinamentoPerTipologia);
    }
  }
  return listaAbbinamentiPerTipologia;
}

function estrazioneListaOccasioni(nomePagina) {
  var listaAbbinamentiTmp = [];
  var listaPagina = listaRicetteDaFileJson[nomePagina];
  var colonneVini = recuperoColonneVini(listaPagina[2]);
  for (let i = 3; i < listaPagina.length; i++) {
    if (listaPagina[i].B) {
      var strutturaOccasione = {};
      strutturaOccasione.id = idOccasioni;
      strutturaOccasione.nome = listaPagina[i].B.toLowerCase();
      strutturaOccasione.viniProposti = estrazioneViniConAggiornamentoListaVini(listaPagina[i], colonneVini);
      idOccasioni++;
      listaAbbinamentiTmp.push(strutturaOccasione);
    }
  }
  return listaAbbinamentiTmp;
}

antipastiContorni = estrazioneListaRicette('Antipasticontorni');
primi = estrazioneListaRicette('Primi');
secondi = estrazioneListaRicette('Secondi');
dessert = estrazioneListaRicette('Dessert');
ricetteItaliane = estrazioneListaRicette('Ricette italiane');
listaAbbinamentiGenerali = estrazioneAbbinamentiGenerali('Abbinamenti generali');
listaAbbinamentiPerTipologia = estrazioneAbbinamentiPerTipologia('Ingredienti Principali');
listaOccasioni = estrazioneListaOccasioni('Abbinamenti occasioni');
listaCompletaRicette = antipastiContorni.concat(primi, secondi, dessert, ricetteItaliane);
aggiornamentoListeVarieDaRicette(listaCompletaRicette);
estrazioneParoleChiave(listaCompletaRicette);
listaParoleChiave = listaParoleChiave.concat(
  estrazioneParoleChiave(listaCompletaRicette),
  estrazioneParoleChiave(listaAbbinamentiPerTipologia),
  estrazioneParoleChiave(ingredientiPrincipali),
  estrazioneParoleChiave(ingredientiSecondari),
  estrazioneParoleChiave(listaOccasioni)
);

estrazioneParoleChiavePerCategoria(listaParoleChiavePerCategoria, antipastiContorni, 'antipastiContorni');
estrazioneParoleChiavePerCategoria(listaParoleChiavePerCategoria, primi, 'primi');
estrazioneParoleChiavePerCategoria(listaParoleChiavePerCategoria, secondi, 'secondi');
estrazioneParoleChiavePerCategoria(listaParoleChiavePerCategoria, dessert, 'dessert');
estrazioneParoleChiavePerCategoria(listaParoleChiavePerCategoria, ricetteItaliane, 'ricetteItaliane');
estrazioneParoleChiavePerCategoria(listaParoleChiavePerCategoria, ingredientiPrincipali, 'ingredientiPrincipali');
estrazioneParoleChiavePerCategoria(listaParoleChiavePerCategoria, ingredientiSecondari, 'ingredientiSecondari');
estrazioneParoleChiavePerCategoria(listaParoleChiavePerCategoria, listaVini, 'listaVini');
// estrazioneParoleChiavePerCategoria();
// console.log('parole chiave per categoria',listaParoleChiavePerCategoria);
// console.log('\nlista ricette:\n', listaCompletaRicette);
// console.log('\nlista ingredienti principali:\n', ingredientiPrincipali);
// console.log('\nlista ingredienti secondari:\n', ingredientiSecondari);
// console.log('\nlista occasioni\n', listaOccasioni);
// console.log('\nlista vini:\n', listaVini);
// console.log('\nlista parole chiave\n', listaParoleChiave);
// console.log('\nlista abbinamenti per tipologia\n', listaAbbinamentiPerTipologia);

var strutture = {
  listaRicette: listaCompletaRicette,
  listaAbbinamentiPerTipologia: listaAbbinamentiPerTipologia,
  listaAbbinamentiGenerali: listaAbbinamentiGenerali,
  listaIngredientiPrincipali: ingredientiPrincipali,
  listaIngredientiSecondari: ingredientiSecondari,
  listaOccasioni: listaOccasioni,
  listaVini: listaVini,
  listaParoleChiave: listaParoleChiave,
  listaParoleChiavePerCategoria: listaParoleChiavePerCategoria
};

function toJsonFile (result) {
    var json = JSON.stringify(result, null, 4);
    fs.writeFile(outputFile, json, function (err) {
      if (err) throw err;
      console.log('Results saved in', outputFile);
    });
  }
  
  toJsonFile(strutture);
  

module.exports = strutture;