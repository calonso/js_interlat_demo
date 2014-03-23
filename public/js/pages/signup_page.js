
$(document).on("pageinit", "#signup-page", function(event) {
  $("#user_score").attr('value', user_info.score);

  $('#signup-button').click(function(event){
    user_info.name = $("#user_name").val().trim();

    $.ajax({
      url: "/users/",
      accepts: "application/json",
      beforeSend: function(jqXhr, settings) {
        if (user_info.name.length == 0) {
          alert("Please, provide a name!");
          return false;
        }

        if (user_info.longitude == null || user_info.latitude == null) {
          alert("Could not retrieve your location!");
          return false;
        }
      },
      content_type: "application/json",
      data: {user: {name: user_info.name, longitude: user_info.longitude, latitude: user_info.latitude, score: user_info.score}},
      error: function(jqXhr, textStatus, errorThrown) {
        alert(jqXhr.responseText);
      },
      success: function(data, textStatus, jqXhr) {
        user_info.id = data.id;
        $.mobile.changePage($("#map-page"), { changeHash: false });
      },
      type: "POST"
    });
  });

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  function success(pos) {
    var crd = pos.coords;

    user_info.latitude = crd.latitude;
    user_info.longitude = crd.longitude;

    $("#signup-button").val("Submit!").removeAttr('disabled');
    $("#signup-button").button("refresh");
  };

  function error(err) {
    switch(err.code) {
      case 1:
        alert("In order for this to work, you need to enable localization!");
        break;
      case 2:
        alert("At the moment it was not possible to track your position. Try again later.");
        break;
      case 3:
        alert("Timeout. Your browser is experiencing erros tracking your position down.");
        break;
      default:
        alert("Unknown error: (" + err.code + "): " + err.message);
    }
  };

  navigator.geolocation.getCurrentPosition(success, error, options);
});