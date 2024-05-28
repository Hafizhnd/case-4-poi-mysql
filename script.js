var map = L.map('map').setView([-7.9527777925617755, 112.6148156232764], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

map.on('click', function (e) {
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;
  $('#latitude').val(lat.toFixed(6));
  $('#longitude').val(lng.toFixed(6));
  $('#locationModal').modal('show');
});

function addMarker(poi) {
  var marker = L.marker([poi.latitude, poi.longitude]).addTo(map)
    .bindPopup("<b>" + poi.name + "</b><br>" + poi.description + "<br>" + poi.address + "<br>" + poi.category + "<br>" + poi.phone + "<br>" + poi.website)
    .on('contextmenu', function (e) {
      $('#deleteLatitude').val(poi.latitude);
      $('#deleteLongitude').val(poi.longitude);
      $('#deleteModal').modal('show');
    });
}

$.get('read_poi.php', function (data) {
  var pois = JSON.parse(data);
  pois.forEach(function (poi) {
    addMarker(poi);
  });
});

$('#save').on('click', function () {
  var lat = parseFloat($('#latitude').val());
  var lng = parseFloat($('#longitude').val());
  var name = $('#name').val();
  var description = $('#description').val();
  var address = $('#address').val();
  var category = $('#category').val();
  var phone = $('#phone').val();
  var website = $('#website').val();
  $.ajax({
    url: 'create_poi.php',
    type: 'POST',
    data: {
      latitude: lat,
      longitude: lng,
      name: name,
      description: description,
      address: address,
      category: category,
      phone: phone,
      website: website
    },
    success: function(response) {
      addMarker({
        latitude: lat,
        longitude: lng,
        name: name,
        description: description,
        address: address,
        category: category,
        phone: phone,
        website: website
      });
      $('#locationModal').modal('hide');
    }
  });
});

$('#confirmDelete').on('click', function () {
  var lat = parseFloat($('#deleteLatitude').val());
  var lng = parseFloat($('#deleteLongitude').val());
  $.ajax({
    url: 'delete_poi.php',
    type: 'POST',
    data: {
      latitude: lat,
      longitude: lng
    },
    success: function(response) {
      if (response === 'Data successfully deleted') {
        map.eachLayer(function (layer) {
          if (layer instanceof L.Marker) {
            var markerLatLng = layer.getLatLng();
            if (markerLatLng.lat === lat && markerLatLng.lng === lng) {
              map.removeLayer(layer);
            }
          }
        });
        $('#deleteModal').modal('hide');
      }
    }
  });
});