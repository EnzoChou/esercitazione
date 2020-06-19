var mongoose = require("mongoose");
//connection to db
function connect() {

  mongoose.connect("mongodb://localhost:27017/local", { useUnifiedTopology: true, useNewUrlParser: true }, (err)=>{
  if(!err){
    console.log("Success connecting to database");
  }
  else {
    console.log("Error connecting to database");
  }
});

};

function disconnect() {
  // If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
};

exports.connect = connect;
exports.disconnect = disconnect;
