var natural = require('natural');
var classifier = new natural.BayesClassifier(); // classifier.addDocument('text','label') ;; classifier.train() ;; 'labelGuess' = classifier.classify('text')
                                                // [{label:'word',value:'percentageOfCertainty'},{...}] = classifier.getClassifications('text')
//natural.JaroWinklerDistance('string1','string2') -> calculate the word difference from 0 to 1
natural.PorterStemmer.attach();
var strutture = require('./creazioneListeDaFileJson');
var listaParoleChiave = strutture.listaParoleChiave;
var listaParoleChiavePerCategoria = strutture.listaParoleChiavePerCategoria;


var antipastiContorni = listaParoleChiavePerCategoria.antipastiContorni.map(parola => parola.stem());
var primi = listaParoleChiavePerCategoria.primi.map(parola => parola.stem());
var secondi = listaParoleChiavePerCategoria.secondi.map(parola => parola.stem());
var ingredientiPrincipali = listaParoleChiavePerCategoria.ingredientiPrincipali.map(parola => parola.stem());
var ingredientiSecondari = listaParoleChiavePerCategoria.ingredientiPrincipali.map(parola => parola.stem());

classifier.addDocument('chicken','chicken');
classifier.addDocument('cihken','chicken');

classifier.train();
//console.log(classifier.getClassifications('wanna some chichen today?'));
module.exports = classifier;
