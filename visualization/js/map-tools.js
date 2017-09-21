var map;
var old_marker;
var lat_arg;
var lng_arg;
var title_arg;

var markers = [];

var markers2 = [];

function initialize(){
	markers = [];
	markers2 = [];
}

function addMarker (location,icon,label) {
	var marker = new google.maps.Marker({
		position: location,
		map: map,
		title: label,
		icon: icon,
		draggable: false
	});

	markers.push(marker);
}

function addMarker2 (location,icon,label) {
	var marker = new google.maps.Marker({
		position: location,
		map: map,
		title: label,
		icon: icon,
		draggable: false
	});

	markers2.push(marker);
}


function clustering2() {
	var markerCluster2 = new MarkerClusterer2(map, markers2);
}

function clustering() {
	var markerCluster = new MarkerClusterer(map, markers);
}

function putControlPins(pins){
	pins[0] = pins[1];
	pins.forEach(function(pin){
		addMarker({lat:parseFloat(pin[0]),lng:parseFloat(pin[1])},"imgs/m.png","Controle");
	});
}


function putExposedPins(pins){
	pins[0] = pins[1];
	pins.forEach(function(pin){
		addMarker2({lat:parseFloat(pin[0]),lng:parseFloat(pin[1])},"imgs/p.png","Exposto");
	});
}


function makeCircle(location){
		new google.maps.Circle({
		strokeColor: '#FF0000',
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: '#FF0000',
		fillOpacity: 0.35,
		map: map,
		center: location,
		radius: 5000
	});
}

function set_vars(lat, lng, title) {
	lat_arg = lat;
	lng_arg = lng;
	title_arg = title;
}

function initAutocomplete() {

	var myLatLng = {lat: lat_arg, lng: lng_arg};

	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 17,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	// Create the search box and link it to the UI element.
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	var image = {
		url: '/adm/public_html/resource/img/ic_churches_white.png',
		size: new google.maps.Size(35, 35),
		scaledSize: new google.maps.Size(35, 35)
	};

	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		title: title_arg,
		draggable: true,
		icon: image
	});

	google.maps.event.addListener(marker, 'dragend', function(event) {
		// console.log(this.position.lat());
		// console.log(this.position.lng());

		main_form.lat.value = this.position.lat();
		main_form.lng.value = this.position.lng();
	});

	old_marker = marker;
	main_form.lat.value = old_marker.getPosition().lat();
	main_form.lng.value = old_marker.getPosition().lng();

	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0)
			return;

		old_marker.setMap(null);

		// Clear out the old markers.
		// markers.forEach(function(marker) {
		// 	marker.setMap(null);
		// });

		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {

			var image = {
				url: '/adm/public_html/resource/img/ic_churches_white.png',
				size: new google.maps.Size(35, 35),
				scaledSize: new google.maps.Size(35, 35)
			};

			// Create a marker for each place.
			old_marker = new google.maps.Marker({
				map: map,
				title: place.name,
				position: place.geometry.location,
				draggable: true,
				icon: image
			});

			if (place.geometry.viewport) {
				// Only geocodes have viewport.
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});

		map.fitBounds(bounds);
		main_form.lat.value = old_marker.getPosition().lat();
		main_form.lng.value = old_marker.getPosition().lng();
	});
}