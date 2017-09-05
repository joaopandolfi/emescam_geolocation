var csv   = require("./csv_control.js");
var utils = require("./utils.js");
var maps  = require("./mapsapi.js");

var positions = [];
var problems = [];
var count = 0;
var lines = 0;
var addressLenNormalize = 0;
var pathOutFile = "";

function consult(pathFile,pathOut,collumnAddress,lengthNormalize){
	addressLenNormalize = lengthNormalize;
	pathOutFile = pathOut;
	csv.readCsv(pathFile,collumnAddress,consumeAPI,readedAllFile,false);
}

function savePositions(pos){
	console.log("Salvando posicoes");
	csv.saveCsv(pathOutFile,pos);
	csv.saveCsv(pathOutFile+"_PROBLEM.csv",problems);
}

function receiveLocation(data){
	if(data.status == 0){
		problems.push({address:data.address});
		console.log("\n= ENDEREÇO COM PROBLEMA =");
		console.log(data.address);
		console.log("=========================\n")
	}
	else{
		console.log(data.location.lat);
		console.log(data.location.lng+"\n");
		positions.push({
			lat: data.location.lat,
			lng: data.location.lng,
			address: data.address
		});
	}

	count++;
	if(count == lines)
		savePositions(positions);
}

function consumeAPI(address){
	address = utils.normalizeAddress(address,addressLenNormalize);
	console.log(address);
	maps.consumeAPI(address, receiveLocation, false);
}


function readedAllFile(lenFile){
	console.log("Linhas no arquivo "+ lenFile);
	lines = lenFile;
}


module.exports = {consult: consult, address:positions}