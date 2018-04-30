/*
* Read and save CSV File
*/

function csvToJson(pathFile){
	csvToJsonWithPrefix(pathFile,"");
}


function csvToJsonWithPrefix(pathFile,prefix,label){
	readFullCsv(pathFile,function(data){  
		data.label = label;
		//console.log(data); 
		saveFile(pathFile+".json",prefix+JSON.stringify(data));
	});
}

function readFullCsv(pathFile,callback){
	var csv = require("fast-csv");
	
	var all_data = [];
	csv.fromPath(pathFile)
	 .on("data", function(data){
	 	all_data.push(data);
	 })
	 .on("end", function(){
	     console.log("done");
	     callback(all_data);
	 });	
}

function readCsv(pathFile, addressCol, callback, callbackEnd, debug){
	var csv = require("fast-csv");
	
	var lines = 0;
	csv.fromPath(pathFile)
	 .on("data", function(data){
	 	result = {address:data[addressCol],others:data};

	 	if(result.address == "" )
	 		return;
	 	
	 	if(debug)
	     console.log(result.address);

	 	lines++;
	 	callback(result);
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

function saveFile(pathFile, data){
	var fs = require('fs');
	fs.writeFile(pathFile, data, function(err) {
    	if(err) {
        	return console.log(err);
    	}
	}); 
}


//readCsv("CONTROLES 01-9-2017.csv",7,function(a){console.log(a)},false);
 module.exports = {readCsv: readCsv, 
 					saveCsv: saveCsv, 
 					saveFile: saveFile,
 					readFullCsv: readFullCsv,
 					csvToJson: csvToJson,
 					csvToJsonWithPrefix: csvToJsonWithPrefix}