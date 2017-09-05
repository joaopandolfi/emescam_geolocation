/*
* Main program
* Get Adrress from CSV and consult
*/

var app = require("./libs/app.js")
app.consult("./data/CONTROLES 01-9-2017.csv","./data/coord_controle.csv",7,4);

var app2 = require("./libs/app.js")
app2.consult("./data/EXPOSTOS 01.09.2017.csv","./data/coord_expostos.csv",7,4);

