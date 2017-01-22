
function loadAndCreateGmapAll() {
  // alert("Clicked success!");
  console.log("loadAndCreateGmapAll running");
  if ($("#apartment_map_all").length > 0) {
    $.ajax({
      dataType: 'json',
      url: '/apartments/map_all',
      method: 'GET',
      success: function(data) {
        placeMarkersAll(data);
      },
      error: function (jqXHR, testStatus, errorThrown) {
        alert("Getting map data failed: " + errorThrown);
      }
    });
  }

function placeMarkersAll(data) {
  console.log("placeMarkersAll running");
  console.log(data);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // Add our position to the collection of markers
      console.log("your position is: " + my_data);
      var my_data = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        infowindow: "You!"
      };
      data.push(my_data);
      createGmapAll(data);
    });
  } else {
    console.log("Geolocation is not available.");
    createGmapAll(data);
  }
}

function createGmapAll(data) {
  console.log("createGmapAll running");
  console.log(data);
  handler = Gmaps.build('Google');
  handler.buildMap ({
    provider: {},
    internal: {id: 'apartment_map_all'}
  },
  function() {
    markers = handler.addMarkers(data);
    handler.bounds.extendWith(markers);
    handler.fitMapToBounds();
    // handler.getMap().setZoom();
  }
);
}

};
// $('#search_button').on('click', loadAndCreateGmapAll);
$(document).on('ready', loadAndCreateGmapAll);
$(document).on('turbolinks:load', loadAndCreateGmapAll);
