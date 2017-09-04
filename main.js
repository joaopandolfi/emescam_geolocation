var maps = require("./libs/mapsapi.js");

function receiveLocation(data){
	console.log(data.location.lat);
	console.log(data.location.lng);
}

maps.consumeAPI("Osvaldo Barbosa silva,nº39, São pedro,Vitória ES", receiveLocation, debug=false);

