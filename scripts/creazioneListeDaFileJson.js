const listaRicetteDaExcel = require('./excelToJson');

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

DatabaseRicette ->
{ 'nomeRicetta' : [listaViniDaProporre] }



nomePagina = {
'ingredientiPrincipali' : [
'ingrediente' : 'percentualeUsoNelNomePagina',
'ingrediente' : 'percentualeUsoNelNomePagina'
],
'ingredientiSecondari' : [
'ingrediente' : ['listaingredientiPrincipaliInOrdineDiUso/listaingredientiPrincipaliInOrdineDiGradimento']
]
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

var antipastiContorni;
var primi;
var secondi;
var dessert;
var ricetteItaliane;
var abbinamentiGenerali;
var abbinamentiOccasioni;
var listaViniFallback;
var ingredientiPrincipali = {};
var ricettaToVini = {};
var listaVini = []; // LISTA VINI
var idRicetta = 1;
var idIngredientePrincipale = 1;
var idIngredienteSecondario = 1;
var idVini = 1;
//POPOLA LISTA VINI
function estrazioneListaVini(nomeVino) {
  if(listaVini.filter( vino => vino.nome === nomeVino).length==0) {
    var vino = {}
      vino.id = idVini;
      vino.nome = nomeVino;
    listaVini.push(vino);
    idVini++;
  }
}

function ricercaVino(nomeVino) {
  var found = listaVini.find(vino => vino.nome === nomeVino);
    return found.id;
}

function estrazioneViniConAggiornamentoListaVini(riga){
  var listaViniTmp = [];
  if (riga.G) {
    estrazioneListaVini(riga.G);
    listaViniTmp.push(ricercaVino(riga.G));
  }
  if (riga.H) {
    estrazioneListaVini(riga.H);
    listaViniTmp.push(ricercaVino(riga.H));
  }
  if (riga.I) {
    estrazioneListaVini(riga.I);
    listaViniTmp.push(ricercaVino(riga.I));
  }
  return listaViniTmp;
}

function estrazioneIngredientiPrincipali(riga) {
  var listaIngredientiPrincipali = [];
  if (riga.D) listaIngredientiPrincipali.push(riga.D);
  return listaIngredientiPrincipali;
}

function estrazioneIngrientiSecondari(riga) {
  var listaIngredientiSecondari = [];
  if (riga.E) listaIngredientiSecondari.push(riga.E);
  if (riga.F) listaIngredientiSecondari.push(riga.F);
  return listaIngredientiSecondari;
}

function estrazioneListaRicette(nomePagina){
  var listaRicette = [];
  var listaPagina = listaRicetteDaExcel[nomePagina];
  for (let i=3; i<listaPagina.length;i++) {
    if(listaPagina[i].B) {
      var strutturaRicetta = {};
      strutturaRicetta.id = idRicetta;
      strutturaRicetta.nome = listaPagina[i].B;
      strutturaRicetta.ingredientiPrincipali = estrazioneIngredientiPrincipali(listaPagina[i]);
      strutturaRicetta.ingredientiSecondari = estrazioneIngrientiSecondari(listaPagina[i]);
      strutturaRicetta.viniProposti = estrazioneViniConAggiornamentoListaVini(listaPagina[i]);
      idRicetta++;
      listaRicette.push(strutturaRicetta);
    }
  }
  return listaRicette;
}

function ingredientiPrincipaliDaRicette(){

}

antipastiContorni = estrazioneListaRicette('Antipasticontorni');
primi = estrazioneListaRicette('Primi');
secondi = estrazioneListaRicette('Secondi');
dessert = estrazioneListaRicette('Dessert');
ricetteItaliane = estrazioneListaRicette('Ricette italiane');

console.log('lista ricette:',antipastiContorni, primi, secondi, dessert, ricetteItaliane);
console.log('lista vini:',listaVini);
/*

console.log('antipastiContorni',antipastiContorni);
console.log('primi',primi);
console.log('secondi',secondi);
console.log('dessert',dessert);
console.log('ricetteItaliane',ricetteItaliane);
var propValue;
for(var propName in ingredientiPrincipali) {
  propValue = ingredientiPrincipali[propName];
  console.log(propName,propValue);
}

*/

function popolaRicettaToVini(nomePagina) {
  var listaPagina = listaRicetteDaExcel[nomePagina];
  for(let i=3;i<listaPagina.length;i++) {
    if(listaPagina[i].B) {
      if(!ricettaToVini[listaPagina[i].B]) {
        ricettaToVini[listaPagina[i].B] = [listaPagina[i].G,listaPagina[i].H,listaPagina[i].I];
      }
    }
  }
}
/*
popolaRicettaToVini('Antipasticontorni');
popolaRicettaToVini('Primi');
popolaRicettaToVini('Secondi');
popolaRicettaToVini('Dessert');
popolaRicettaToVini('Ricette italiane');

var propValue;
for(var propName in ricettaToVini) {
  propValue = ricettaToVini[propName];
  console.log(propName,propValue);
}
*/

function popolaCarnePesceVerdure() {
  return null;
}
