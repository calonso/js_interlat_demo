
$(document).on("pagechange", function(evt, data) {
  if (data.toPage.attr('id') === 'map-page') {
    var markers = [];
    var mapOptions = {
      zoom: 14
    };

    var $header = $("#map-page div:jqmData(role=header)");
    $("#map-canvas").height($(window).height() - 2 * $header.height());
    var map = new google.maps.Map($("#map-canvas")[0], mapOptions);

    var scheme   = "ws://";
    var uri      = scheme + window.document.location.host + "/";
    var ws       = new WebSocket(uri);

    ws.onopen = function(event) {
      ws.send(JSON.stringify({id: user_info.id}));
    }

    ws.onmessage = function(message) {
      var $board = $("#leaderboard ol:jqmData(role=listview)");
      $board.empty();

      for (var i = 0 ; i < markers.length ;  ++i) {
        var marker = markers[i];
        marker.setMap(null);
      };
      markers = [];

      var markers_data = JSON.parse(message.data);
      var bounds;
      for (var i = 0 ; i < markers_data.length ; ++i ) {
        var marker = markers_data[i];
        $board.append($('<li></li>').text(marker.name + ' - ' + marker.score));

        var latlng = new google.maps.LatLng(marker.latitude, marker.longitude);
        if (bounds) {
          bounds.extend(latlng);
        } else {
          bounds = new google.maps.LatLngBounds(latlng, latlng);
        }
        markers.push(new google.maps.Marker ({
          map: map,
          animation: google.maps.Animation.DROP,
          position: latlng,
          title: marker.name
        }));
      }
      map.fitBounds(bounds);
      $board.listview("refresh");
    };
  }
});