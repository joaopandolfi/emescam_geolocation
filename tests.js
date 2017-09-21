//CSV TEST
var csv   = require("./libs/csv_control.js");
a = [{status:1,value:2},{status:1,value:2}];
//csv.saveCsv("./data/TESTE.csv",a);
//csv.saveFile("./data/TESTE2.json",JSON.stringify(a));

//csv.readFullCsv(pathFile,function(data){  console.log(data); csv.saveFile(pathFile+".json",JSON.stringify(data))});


pathFile = "./data/coord_controle.csv";
csv.csvToJsonWithPrefix(pathFile,"var _controlPins = ","Controle");

pathFile = "./data/coord_expostos.csv";
csv.csvToJsonWithPrefix(pathFile,"var _expostPins = ","Expostos");


//UTIL TESTS

//var util   = require("./libs/utils.js");
//console.log(util.normalizeAddress("joao, tem, 12/3(3) , nº123 macacos, 3 ,2",4));