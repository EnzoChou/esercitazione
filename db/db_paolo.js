'use strict';

let
  config = require(`${requirePath}/config`);

// ----- REQUIRE ---- //

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let
  util = require('util'),
  path = require('path'),
  basename = path.basename(module.filename),
  fs = require('fs');

mongoose.Promise = global.Promise;


let credential = `mongodb://${config.mongodb.usr}:${config.mongodb.pss}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`;


mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

mongoose.connect(credential, {
  'poolSize': 5
});

console.log("mongoose.connection.readyState ----> ",mongoose.connection.readyState);

mongoose.connection.on('connected', function () {
  // console.log("Mongoose default connection is open to ", `mongodb://${config.mongodb.usr}:${config.mongodb.pss}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.db}`);
});
mongoose.connection.on('error', function (err) {
  console.log("Mongoose default connection has occured " + err + " error");
});

mongoose.connection.on('disconnected', function () {
  console.log("Mongoose default connection is disconnected");
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;

db['closeConn'] = function () {
  mongoose.disconnect();
}

db['isValid'] = function (id) {
  return mongoose.Types.ObjectId.isValid(id);
}

db['ObjectId'] = function (id) {
  return mongoose.Types.ObjectId(id);
}

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});

let modelsDir = path.join(__dirname, '..', 'models');

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


db.closeConn()