    require('../global');
    var express = require('express');
    var router = express.Router();
    var Persona = require("../model/persona");
    var validator = require("./validator");
    var schemas = require("../JOImodel/persona");



    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express' });
    });

    //Retrieve section
    router.get('/retrieve/', validator(schemas.personLIST, 'query'), (req, res, next) => {
      var db = req.app.locals.db;
      Promise.try(function() {
        return db.Persona.find();
      })
      .then(doc => {
        res.status(200).json(doc);
        doc.forEach((item, i) => {
          console.log(i, item);
        });
      })
        .catch(err => {
        console.log(err);
        res.status(500).json({
          error : err
        })
      })
    });/*(err, docs) => {
          if (!err) {
            res.render('retrieve', {
              data : docs
            });
          } else {
            console.log("err", err);
            reject(err);
          }
        })
      });*/

    router.get('/retrieve/:personId', validator(schemas.personId, 'params'), (req, res, next) => {
      var id = req.params.personId;
      Persona.findById(id)
      .exec()
      .then( doc => {
        console.log("from database", doc )
        if ( doc != undefined ) {
          res.status(200).json(doc);
        } else {
          res.status(404).json({
            message : "no valid entry provided;"
          });
        };
      })
      .catch( err => {
        res.status(500).json( {
          error : err
        });
      });
    });

    //Save section
    router.post('/save', validator(schemas.person, 'body'), function(req, res, next){
      var persona = new Persona ({
        name : req.body.name,
        surname : req.body.surname,
        birthplace : req.body.birthplace,
        birthdate : req.body.birthdate
      });
      persona.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "Handling POST requests to /Persona",
          createdperson: result
        });
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({error: err});
      });
    });

    //Delete section
    router.get('/delete/:personId', function(req, res, next) {
      //res.send('respond with a resource');
      var id = req.params.personId;
      Persona.deleteOne({ _id : id })
      .exec()
      .then( result => {
        res.status( 200 ).json( result );
      })
      .catch( err => {
        console.log( error )
        res.status(500).json( {
          error : err
        });
      });
    });

    //Update section
    router.patch('/update/:personId', function(req, res, next) {
      //res.render('edit', { name : 'req.Persona.name',  });
      var id = req.params.personId;
      //calculate variable i want to update through an array
      var updateOperation = {};
      for ( var ops of req.body ) {
        updateOperation[ops.propName] = ops.value;
      }
      console.log( ops, updateOperation );
      Persona.update({ _id : id }, { $set : updateOperation })
      .exec()
      .then( result => {
        console.log( result );
        res.status(200).json( result );
      })
      .catch( err => {
        console.log(err);
        res.status(500).json({
          error : err
        });
      });
    });

    module.exports = router;
