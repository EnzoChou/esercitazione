require('../global');
var express = require('express');
var router = express.Router();
var Persona = require("../model/persona");
var validator = require("./validator");
var schemas = require("../JOImodel/persona");

//COMPONENTS
var generic_request = require("../components/generic_request");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


/* GET home page. */
router.get('/employeesOver/:age', function (req, res, next) {

  var options = {
    'method': 'GET',
    'url': 'http://dummy.restapiexample.com/api/v1/employees',
    'headers': {}
  };

  return generic_request.processing(options)
    .then(data => {
      if (data) {
        var age = req.params.age;
        data = data.filter(employee => employee.employee_age>age);
        res.status(200).json({
          data: data
        });
      } else {
        res.status(500).json({
          error: "SERVIZIO CLIENTE SOSPESO"
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "SERVIZIO HEJ SOSPESO"
      });
    });

});


/* GET home page. */
router.get('/employees_salary/:sum', function (req, res, next) {

  var options = {
    'method': 'GET',
    'url': 'http://dummy.restapiexample.com/api/v1/employees',
    'headers': {}
  };

  return generic_request.processing(options)
    .then(data => {
      if (data) {
        var salary = req.params.sum;
        data = data.filter(employee => employee.employee_salary>salary);
        res.status(200).json({
          data: data
        });
        console.log(data);
      } else {
        res.status(500).json({
          error: "SERVIZIO CLIENTE SOSPESO"
        });
      }
    })
    .catch(error => {
      console.log(err)
      res.status(500).json({
        error: "SERVIZIO HEJ SOSPESO"
      });
    });

});

router.post('/creaNuovaPersona', function (req, res, next) {
  var body = JSON.stringify(req.body);
  console.log('body',body);
  var options = {

    'method': 'POST',
    'url': 'http://dummy.restapiexample.com/api/v1/create',
    'headers': {    'Content-Type': 'application/json'
},
    "body": body
  };

  return generic_request.processing(options)
    .then(data => {
      if (data) {
        console.log("data", data);
        res.status(200).json({
          data: data
        });
      } else {
        console.log("client error", data);
        res.status(500).json({
          error: "SERVIZIO CLIENTE SOSPESO"
        });
      }
    })
    .catch(error => {
      console.log("\n\n\n\nserver error", error);
      res.status(500).json({
        error: "SERVIZIO HEJ SOSPESO"
      });
    });

});




module.exports = router;

/*
- 3 dinamiche di GET con params (ex. "/employees_over_age/:number")
  - richiesta con l'età (nella richiesta inserisco un numero e l'api mi torna tutti gli utenti che hanno age>numero)
  - richiesta con l'salario (nella richiesta inserisco un numero e l'api mi torna tutti gli utenti che hanno salario>numero)
- 1 dinamica di POST (crea un utente nuovo passo quindi i campi name, age, salary, l'api mi risponde con OK e l'utente appena generato)
- 1 dinamica di PUT (faccio una richiesta degli utenti e eseguiamo l'update {rich:true/false} agli utenti che hanno sopra un certo salario passato come params, l'api torna quanti sono i ricchi e quanti sono i poveri)
*/
