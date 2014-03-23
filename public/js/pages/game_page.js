
$(document).on("pagechange", function(event, data) {
  if (data.toPage.attr('id') === 'game-page') {
    var $header = $("#game-page div:jqmData(role=header)");
    var $container = $("#game-page div:jqmData(role=content)");

    var $canvas = $("#game-canvas").
      attr('width', $container.width()).
      attr('height', $(window).height() - 3 * $header.height());

    var game = new GAME.Game($canvas[0], function(score) {
      user_info.score = score;
      $.mobile.changePage($("#signup-page"), { changeHash: false });
    });

    $container.on( "swipeleft", function(event){game.go_left(event);} );
    $container.on( "swiperight" , function(event){game.go_right(event);} );
    $container.on( "tap" , function(event){game.fire(event);} );
 
    game.start();
  }
});