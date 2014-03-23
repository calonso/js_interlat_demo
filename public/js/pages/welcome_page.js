
$(document).on("pageinit", "#welcome-page", function(event) {
  $('#start_button').click(function(event){
    $.mobile.changePage($("#game-page"), { changeHash: false });
  });
});