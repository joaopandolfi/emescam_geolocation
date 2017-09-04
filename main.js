var maps = require("./libs/mapsapi.js");

function receiveLocation(data){
	console.log(data.location.lat);
	console.log(data.location.lng);
}

var address = "Coronel Alziro n368 Centro Vitória ES,29015115";

maps.consumeAPI(address, receiveLocation, false);

