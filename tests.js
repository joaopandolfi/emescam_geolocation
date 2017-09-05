//CSV TEST
var csv   = require("./libs/csv_control.js");
//csv.saveCsv("./data/coord_controle.csv",[{status:1,value:2},{status:1,value:2}]);

var util   = require("./libs/utils.js");
console.log(util.normalizeAddress("joao, tem, 12/3(3) , nº123 macacos, 3 ,2",4));