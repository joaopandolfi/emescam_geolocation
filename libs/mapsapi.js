/*
* Rudimentar consuming Google API Places
* 04/09/2017 - (C) João Carlos Pandolfi Santana
* joaopandolfi@gmail.com
*/

var apikeys = ["AIzaSyB0bHN7Yfkh3SnQhV3XQZl7wThNH92-F74","AIzaSyD11OmP2dDvg67_5I_Dw4Jjv8KL4zQz9zc","AIzaSyABVZRiogXuIJUxQl2l4s_cXrZ2sTSlUAI"];

function consumeAPI(address,callback,debug){
	var https = require("https");

	var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}'
 	var apiKey = apikeys[2];
	var data = "";
	var result = {location:{lat:0,lng:0},data:{},status:0, address: address}

	baseUrl = baseUrl.replace("{address}",address);
	baseUrl = baseUrl.replace("{api_key}", apiKey);
	baseUrl = encodeURI(baseUrl);

	if(address == "," || address == " " || address == "" || address == "--VAZIO--,")
		return;


	
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
			if(a.status == "OVER_QUERY_LIMIT"){
				result.status = -1;
				callback(result);
				return;
			}

			if(a.status != "ZERO_RESULTS" && a.status != "UNKNOWN_ERROR" && a.status != "INVALID_REQUEST"){
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
