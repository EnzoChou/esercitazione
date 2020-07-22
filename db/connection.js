var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require("mongoose"));
Promise.config({
  longStackTraces: true
});
//connection to db

//require database URL from properties file
//var dbURL = require('./property').db;
var dbURI = "";
var db;

function connect(uri) {
  dbURI = uri;
  //qui servirebbe una connessione un pò più sicura.
  mongoose.connect(dbURI,
      { useUnifiedTopology: true, useNewUrlParser: true,
        serverSelectionTimeoutMS: 5000,
        poolSize: 4 // Timeout after 5s
      },
       (err, client)=>{
      if(!err){
        db = client;
      }
    })
    .catch(err => console.log(err.reason));
};

function getDB() {
  if(!db){
    console.log("there's no connection to database")
  }
  else {
    return db;
  }
};

function disconnect() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected');
  });
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS // For example
var person = require("../model/person").person;

module.exports = {
  connect, disconnect, getDB
};
