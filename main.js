/*
* Main program
* Get Adrress from CSV and consult
*/

var app = require("./libs/app.js")
app.consult("./data/Controles-puro.csv","./data/coord_controle.csv",7,4);

var app2 = require("./libs/app.js")
app2.consult("./data/Expostos-puro.csv","./data/coord_expostos.csv",7,4);

