var map;
var apiKey = 'fff38a8b9d2b9b2a1eb74082bb984b7c';
var url = 'https://api.forecast.io/forecast/';
var data;
var timezone;
var farenheitToCelsium = 0;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 59.329323, lng: 18.068581},
    zoom: 3
  });

  map.addListener('click', function(e) {
    getInfo(e.latLng, e);
  });
}


function getInfo(latLng, e) {
  $.getJSON(url + apiKey + "/" + latLng.lat() + "," + latLng.lng() + "?callback=?", function(data) {
    farenheitToCelsium = Math.round(((data.currently.temperature - 32) * 5)/9);
    console.log(data.currently.temperature);
    console.log(data.timezone);
    timezone = data.timezone;
    placeMarker(e.latLng, map)
  });
}


function placeMarker(latLng, map) {

  var marker = new google.maps.Marker({
    position: latLng,
    map: map
  });

  var infowindow = new google.maps.InfoWindow({
    content: 'Du klickade på ett ställe med tidzonen: ' + timezone + '<br> Tempraturen på positionen är ' + farenheitToCelsium + '° C<br>'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

  infowindow.open(map,marker);
  map.panTo(latLng);
}
