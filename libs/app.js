var csv   = require("./csv_control.js");
var utils = require("./utils.js");
var maps  = require("./mapsapi.js");

var positions = [];
var problems = [];
var count = 0;
var lines = 0;
var addressLenNormalize = 0;
var pathOutFile = "";
var endOfFile = true;

function consult(pathFile,pathOut,collumnAddress,lengthNormalize){
	addressLenNormalize = lengthNormalize;
	pathOutFile = pathOut;
	lines = 0;
	count = 0;
	positions = [];
	problems = [];
	csv.readCsv(pathFile,collumnAddress,consumeAPI,readedAllFile,false);
}

function savePositions(pos){
	console.log("Salvando posicoes");
	csv.saveCsv(pathOutFile,pos);
	csv.saveCsv(pathOutFile+"_PROBLEM.csv",problems);

	csv.saveFile(pathOutFile+"_.json",JSON.stringify(pos));
	csv.saveFile(pathOutFile+"_PROBLEM_.json",JSON.stringify(problems));
}

function receiveLocation(data){
	console.log("#REQ ("+count+"/"+lines+")#");

	switch(data.status){
		case -1:
			problems.push({address:data.address,cause:"LIMIT"});
			console.log("QUERY LIMIT PER DAY");
		break

		case 0:
			problems.push({address:data.address,cause:"PROBLEMA"});
			console.log("\n= ENDEREÇO COM PROBLEMA =");
			console.log(data.address);
			console.log("=========================\n")
		break;

		default:
			positions.push({
				lat: data.location.lat,
				lng: data.location.lng,
				address: data.address
			});
			console.log("\n=== SUCCESS ===");
			console.log(data.location.lat);
			console.log(data.location.lng);
			console.log("===============");
	}

	count++;
	if(count == lines && endOfFile)
		savePositions(positions);
}

function consumeAPI(data){
	address = data.address;
	address = utils.normalizeAddress(address,addressLenNormalize);
	console.log(address);
//	utils.sleep(100).then(() =>{
		maps.consumeAPI(address, receiveLocation, false);
//	});
	lines++;
}


function readedAllFile(lenFile){
	console.log("Linhas no arquivo "+ lenFile);
	endOfFile = true;
}


module.exports = {consult: consult, address:positions}