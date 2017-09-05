/*
* Rudimentar consuming Google API Places
* 04/09/2017 - (C) João Carlos Pandolfi Santana
* joaopandolfi@gmail.com
*/

var https = require("https");

function consumeAPI(address,callback,debug){

	var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}'
 	var apiKey = "AIzaSyABVZRiogXuIJUxQl2l4s_cXrZ2sTSlUAI";
	var data = "";
	var result = {location:{lat:0,lng:0},data:{},status:0}

	baseUrl = baseUrl.replace("{address}",address);
	baseUrl = baseUrl.replace("{api_key}", apiKey);
	baseUrl = encodeURI(baseUrl);


	https.get(baseUrl, function(res) {
  		if(debug)
  			console.log("Got response: " + res.statusCode);

   		res.setEncoding('utf8');

  		res.on('data', function (chunk) {
	   		data += chunk;
  		});

	  	res.on('end', function(e){

	  		if(debug)
	  			console.log('RESULT: ' + data);

			a = JSON.parse(data);
			if(a.status != "ZERO_RESULTS"){
				result.data = a;
				result.location = a.results[0].geometry.location;
				result.status = 1;
			}

			if(debug){
				console.log("== LOCATION ==")
				console.log("Lat: "+ result.location.lat);
				console.log("Lng: "+ result.location.lng);
				console.log("=============\n")
			}

			callback(result);
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
}

//consumeAPI("Osvaldo Barbosa silva,nº39, São pedro,Vitória ES");
module.exports = {consumeAPI: consumeAPI}
