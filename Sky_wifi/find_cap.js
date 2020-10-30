const { number } = require('joi');
const lista_cap = require('./cap_sky_wifi.json');

var trova_cap = function (cap) {
    if(typeof cap == 'number') {
        cap.toString();
    }
    console.log(lista_cap.data.includes(cap));
    return lista_cap.data.includes(cap);
}
// trova_cap("16157");

console.log(typeof 1 == 'number');