/*
* Rudimentar consuming Google API Places
* 04/09/2017 - (C) João Carlos Pandolfi Santana
* joaopandolfi@gmail.com
*/

var https = require("https");

var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}'
var address = "Osvaldo Barbosa silva,nº39, São pedro,Vitória ES"
var apiKey = "AIzaSyABVZRiogXuIJUxQl2l4s_cXrZ2sTSlUAI";

baseUrl = baseUrl.replace("{address}",address);
baseUrl = baseUrl.replace("{api_key}", apiKey);
baseUrl = encodeURI(baseUrl);

var b = "";
https.get(baseUrl, function(res) {
  console.log("Got response: " + res.statusCode);
   res.setEncoding('utf8');
   
  res.on('data', function (chunk) {
	   b += chunk;
  });

  res.on('end', function(e){
	console.log('RESULT: ' + b);
	a = JSON.parse(b);
	console.log("== LOCATION ==")
	console.log("Lat: "+ a.results[0].geometry.location.lat);
	console.log("Lng: "+ a.results[0].geometry.location.lng);
	})
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});