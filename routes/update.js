var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var connection = require('../db/connection');
var Person = require("../model/person");
var personModel = mongoose.model('Persona');

/* GET users listing. */
router.patch('/:personId', function(req, res, next) {
  //res.render('edit', { name : 'req.person.name',  });
  var id = req.params.personId;
  //calculate variable i want to update through an array
  var updateOperation = {};
  for ( var ops of req.body ) {
    updateOperation[ops.propName] = ops.value;
  }
  console.log( ops, updateOperation );
  connection.connect();
  personModel.update({ _id : id }, { $set : { updateOperation }})
  .exec()
  .then( result => {
    console.log( result );
    res.status(200).json( result );
    connection.disconnect();
  })
  .catch( err => {
    console.log(err);
    res.status(500).json({
      error : err
    });
    connection.disconnect();
  });
});

module.exports = router;
