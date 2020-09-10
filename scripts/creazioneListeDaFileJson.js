const result = require('./excelToJson');

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
'ingrediente' : ['listaIngredientiPrincipaliInOrdineDiUso/listaIngredientiPrincipaliInOrdineDiGradimento']
]
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
var IngredientiPrincipali = {};
/*
struttura antipastiContorni / primi / secondi

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

function estrazioneNomiRicette(nomePagina){
  var listaRicetta = [];
  var listaEsempio = result[nomePagina];
  for (let i=3; i<listaEsempio.length;i++) {
    if(listaEsempio[i].B) {
      listaRicetta.push(listaEsempio[i].B);
      if(listaEsempio[i].D) {
        if(IngredientiPrincipali[listaEsempio[i].D]) {
          IngredientiPrincipali[listaEsempio[i].D].push(listaEsempio[i].B);
        }
        else {
          IngredientiPrincipali[listaEsempio[i].D] = [listaEsempio[i].B];
        }
      }
    }
  }
  return listaRicetta;
}
antipastiContorni = estrazioneNomiRicette('Antipasticontorni');
primi = estrazioneNomiRicette('Primi');
secondi = estrazioneNomiRicette('Secondi');
dessert = estrazioneNomiRicette('Dessert');
ricetteItaliane = estrazioneNomiRicette('Ricette italiane');
/*

console.log('antipastiContorni',antipastiContorni);
console.log('primi',primi);
console.log('secondi',secondi);
console.log('dessert',dessert);
console.log('ricetteItaliane',ricetteItaliane);

*/
var propValue;
for(var propName in IngredientiPrincipali) {
  propValue = IngredientiPrincipali[propName];
  console.log(propName,propValue);
}
