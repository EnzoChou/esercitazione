var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var connection = require('../db/connection');
var Person = require("../model/person");
var personModel = mongoose.model('Persona');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('save', {});
});

router.post('/', function(req, res, next){
  if( req.body.name == undefined || req.body.surname == undefined ){
    res.status()
  } else {
      var person = new Person ({
        name : req.body.name,
        surname : req.body.surname,
        birthplace : req.body.birthplace,
        birthdate : req.body.birthdate
      });
      connection.connect();
      person.save().then(result => {
        console.log(result);
        connection.disconnect();
        res.status(201).json({
        message: "Handling POST requests to /person",
        createdPerson: result
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: err});
    });
  };
});

module.exports = router;
