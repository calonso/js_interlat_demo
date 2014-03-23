
$(document).on("pagechange", function(event, data) {
  if (data.toPage.attr('id') === 'game-page') {
    var $header = $("#game-page div:jqmData(role=header)");
    var $container = $("#game-page div:jqmData(role=content)");

    var $canvas = $("#game-canvas").
      attr('width', $container.width()).
      attr('height', $(window).height() - 2 * $header.height());

    var game = new GAME.Game($canvas[0]);

  }
});