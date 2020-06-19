var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var connection = require('../db/connection');
var Person = require("../model/person");
var personModel = mongoose.model('Persona');

/* GET users listing. */
router.get('/', (req, res, next) => {

  connection.connect();
  personModel.find((err, docs) => {
    if (!err) {
      res.render('retrieve', {
        data : docs
      });
      connection.disconnect();
    }
    else {

    }
    console.log(docs);
  });
});

module.exports = router;
