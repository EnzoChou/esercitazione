var Promise = require('bluebird');
var chalk = require('chalk');
var lodash = require('lodash');
var fs = Promise.promisifyAll(require("fs"));
var path = require('path');

global.mongoose = require(`mongoose`);
global.db_yeah = require(`../components/mongodb`)();


function example_promise(elem) {
    return new Promise(function (resolve, reject) {
        Promise.all([
                db_yeah.Audience.findOne({
                    "_id": elem.audience
                })
                .lean(),
                db_yeah.Context.findOne({
                    "_id": elem.context
                })
                .lean()
            ])
            .then(promise_all_founded => {
                // console.log("promise_all_founded", promise_all_founded);
                var audience_founded = promise_all_founded[0];
                var context_founded = promise_all_founded[1];
                if (audience_founded.first_name == "Dina" || audience_founded.first_name == "Nino") {
                    resolve(audience_founded.first_name + " non può entrare");
                } else {
                    resolve({
                        'audience': audience_founded.first_name,
                        'context': context_founded.board.name
                    });
                }
            })
            .catch(error => {
                console.error(chalk.red('error Audience find: ', error));
                reject();
            });

    });
};

var array = [];

db_yeah.UserContext.find({
        "page_id": "5df22f784031798d854a5ce5",
        "$and": [{
            "timestamp_ended": {
                "$gt": "2020-06-30T22:00:00.000Z"
            }
        }]
    })
    .skip(10) // parto dall'elemento 10
    .limit(10) // prendo solo 10 elementi
    .lean()
    .then(found_audience => {
        console.log("found_audience length", found_audience.length);
        // console.log("found_audience", found_audience);

        return Promise.map(found_audience, function (elem, i) {
                // console.log("elem", elem);
                return example_promise(elem)
                    .then(res_example_promise => {
                        // console.log("res_example_promise", res_example_promise);
                        if (typeof res_example_promise === 'string') {
                            console.log(res_example_promise);
                        } else {
                            array.push(res_example_promise);
                        }
                        return;
                    })
                    .catch(error => {
                        console.error(chalk.red('error map: ', error));
                        return;
                    });
            }, {
                'concurrency': 1
            })
            .catch(error => {
                console.error(chalk.red('error map: ', error));
                return;
            });
    })
    .then(res1 => {
        console.log("La lista degli invitati: ", array)
        return fs.writeFileAsync("example.json", JSON.stringify(array))
            .then(res_saved => {
                console.log("SAVED!");
                return;
            })
            .catch(error => {
                console.error(chalk.red('error saved file: ', error));
            });
    })
    .then(res_final => {
        db_yeah.close();
        console.log('THIS IS THE END!');
        return;
    })
    .catch(error => {
        console.error(chalk.red('error: ', error));
        return;
    });