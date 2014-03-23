
(function(){
  GAME.Bomb = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = GAME.BOARD_HEIGHT / GAME.BOMB_INVERSE_SPEED;
    this.width = 10;
    this.height = 10;
  };

  GAME.Bomb.prototype = {
    x: null,
    y: null,
    speed: null,
    width: null,
    height: null,
    update: function(delta) {
      this.y += this.speed * delta;
      if (this.y >= GAME.BOARD_HEIGHT) {
        GAME.CURRENT_GAME.remove_object(this);
      } else if (GAME.CURRENT_GAME.player.hit(this.x, this.y)) {
        GAME.CURRENT_GAME.finish();
      }
    },
    repaint: function(context) {
      context.fillStyle = "#000000";
      context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
  }
})();