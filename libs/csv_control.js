/*
* Read and save CSV File
*/

function readCsv(pathFile, addressCol, callback, callbackEnd, debug){
	var csv = require("fast-csv");
	
	var lines = 0;
	csv.fromPath(pathFile)
	 .on("data", function(data){
	 	if(debug)
	     console.log(data[addressCol]);

	 	lines++;
	 	callback(data[addressCol]);
	 })
	 .on("end", function(){
	     console.log("done");
	     callbackEnd(lines);
	 });
}

function saveCsv(pathFile,data){
	var fs = require("fs");
	var csv = require("fast-csv");

	var ws = fs.createWriteStream(pathFile);
	csv.write(data, {headers: true})
   .pipe(ws);
}


//readCsv("CONTROLES 01-9-2017.csv",7,function(a){console.log(a)},false);
 module.exports = {readCsv: readCsv, saveCsv: saveCsv}