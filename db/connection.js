var Promise = require("bluebird");
var mongoose = Promise.promisifyAll(require("mongoose"));
Promise.config({
  longStackTraces: true
});
var config = require('../config.json');
//connection to db

//require database URL from properties file
//var dbURL = require('./property').db;
var dbURI = config.dev.host;
var db = mongoose.connection;
  //qui servirebbe una connessione un pò più sicura.
  mongoose.connect(dbURI,
      { useUnifiedTopology: true, useNewUrlParser: true,
        serverSelectionTimeoutMS: 5000,
        poolSize: 4 // Timeout after 5s
      },
       (err, client)=>{
      if(!err){

      }
    })
    .catch(err => {
      console.log(err.reason)
});

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
var
  util = require('util'),
  path = require('path'),
  basename = path.basename(module.filename);

mongoose.Promise = global.Promise;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let modelsDir = path.join(__dirname, '..', 'model');

fs
  .readdirSync(modelsDir)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename);
  })
  .forEach(function (file) {
    if (file.slice(-3) !== '.js') return;
    let modelName = capitalizeFirstLetter(file.replace('.js', ''));
    db[modelName] = require(path.join(modelsDir, file));
  });


exports = module.exports = db;
