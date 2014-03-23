
(function(){
  GAME.ScoreBoard = function() {
    this.x = GAME.BOARD_WIDTH * 75 / 100;
    this.y = GAME.BOARD_HEIGHT * GAME.SCOREBOARD_PERCENT_HEIGHT / 100;
    this.base_text = "Score: ";
    this.score = 0;
  };

  GAME.ScoreBoard.prototype = {
    x: null,
    y: null,
    base_text: null,
    score: null,
    update: function(delta) {
      this.score = GAME.CURRENT_GAME.score;
    },
    repaint: function(context) {
      context.strokeText(this.base_text + this.score, this.x, this.y, GAME.BOARD_WIDTH * 25 / 100);
    }
  }
})();