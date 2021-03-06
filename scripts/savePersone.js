'use strict';
global.mongoose = require('mongoose');
global.db_yeah = require('./../db/connection');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var Persona = require('../model/persona');
// var app = require('../app');

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function uncapitalize(word) {
  return word.charAt(0).toLowerCase() + word.slice(1);
}

function randomize(array) {
  return array[Math.floor(Math.random() * array.length)];
}

var numeroDiPersoneDaSalvareNelDB = 50;

var persone = [];
var name = ['Andrea', 'Brandon', 'Carla',
  'Davide', 'Enzo', 'Federica', 'Giorgia', 'Herman',
  'Ilaria', 'Laura', 'Marco', 'Nathaniel', 'Osvaldo',
  'Paola', 'Quentin', 'Roberta', 'Sabrina', 'Tano', 'Ugo',
  'Valeria', 'Zarathustra'];
var surname = ['Berardino', 'Annunzio', 'Bonaventura',
  'Cintio', 'Amario', 'Intino', 'Prinzio', 'Addario',
  'Ascenzo', 'Credico', 'Ciuffini', 'Ciocca', 'Pelliccione',
  'Scarsella', 'Cocciolone', 'Cetrullo', 'Scimia', 'Mammarella', 'Zappacosta'];
var subscription = [true, false];
var status = ['single', 'engaged', 'married'];

function aggiungiPersone(n) {
  var i = 0;
  while (i < n) {
    let randomName = capitalize(randomize(name));
    let randomSurname = capitalize(randomize(surname));
    let randomSubscription = randomize(subscription);
    let randomStatus = randomize(status);
    var persona = new Persona({
      name: randomName,
      surname: randomSurname,
      subscription: randomSubscription,
      status: randomStatus
    });
    persone.push(persona);
    i++;
  };
};

aggiungiPersone(numeroDiPersoneDaSalvareNelDB);

function salvaColMap(persone) {
  /**/
  Promise.map(persone, elem => {
    console.log('persona: ', elem);
    return elem.save();
  }).then(result => {
    console.log('ritorno then di salvaColMap', result);
    db_yeah.close();
  })
    .catch(err => {
      console.log('err', err);
      db_yeah.close();
    })

};

function salvaColAll(persone) {
  var promises = [];
  persone.forEach(ciccino => {
    var ret = ciccino.save();
    promises.push(ret);
    console.log(ret)
  });
  Promise.all(promises)
    .then(ret => {
      console.log('ritorno then di salvaColAll', ret);
      db_yeah.close();
    })
    .catch(err => {
      console.log('err', err);
      db_yeah.close()
    });
};
//salvaColMap(persone);
