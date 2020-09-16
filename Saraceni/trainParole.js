var natural = require('natural');
var classifier = new natural.BayesClassifier(); // classifier.addDocument('text','label') ;; classifier.train() ;; 'labelGuess' = classifier.classify('text')
                                                // [{label:'word',value:'percentageOfCertainty'},{...}] = classifier.getClassifications('text')
//natural.JaroWinklerDistance('string1','string2') -> calculate the word difference from 0 to 1
var strutture = require('./creazioneListeDaFileJson');
var listaParoleChiave = strutture.listaParoleChiave;

classifier.addDocument('chicken','chicken');
classifier.addDocument('cihken','chicken');

classifier.train();
//console.log(classifier.getClassifications('wanna some chichen today?'));
module.exports = classifier;
