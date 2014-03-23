
var GAME = GAME || {};

(function(){
  GAME.Player = function(canvas) {
    this.width = canvas.width * 10 / 100;
    this.height = canvas.height * 8 / 100;
    this.x = canvas.width / 2;
    this.y = canvas.height - this.height / 2;
    this.status = PLAYER_STATUS_IDLE;
    this.speed = canvas.width / GAME.PLAYER_BASE_INVERSE_SPEED;
  };

  var PLAYER_STATUS_IDLE = 0;
  var PLAYER_STATUS_MOVING_LEFT = 1;
  var PLAYER_STATUS_MOVING_RIGHT = 2;

  GAME.Player.prototype = {
    x: null,
    y: null,
    width: null,
    height: null,
    status: null,
    speed: null,

    update: function(delta) {
      switch(this.status) {
        case PLAYER_STATUS_MOVING_RIGHT:
          this.x += delta * this.speed;
          if (this.x + this.width / 2 > GAME.BOARD_WIDTH) {
            this.x = GAME.BOARD_WIDTH - this.width / 2;
            this.status = PLAYER_STATUS_IDLE;
          }
          break;
        case PLAYER_STATUS_MOVING_LEFT:
          this.x -= delta * this.speed;
          if (this.x - this.width / 2 < 0) {
            this.x = this.width / 2;
            this.status = PLAYER_STATUS_IDLE;
          }
          break;

      }
    },
    paint: function(context) {
      context.fillStyle = "#FF0000";
      context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    },
    go_left: function() {
      this.status = PLAYER_STATUS_MOVING_LEFT;
    },
    go_right: function() {
      this.status = PLAYER_STATUS_MOVING_RIGHT;
    },
    stop: function() {
      this.status = PLAYER_STATUS_IDLE;
    },
    hit: function(bomb_x, bomb_y) {
      var origin_x = this.x - this.width / 2;
      var origin_y = this.y - this.height / 2;
      var end_x = this.x + this.width / 2;
      var end_y = this.y + this.height / 2;

      return origin_x <= bomb_x && end_x >= bomb_x && origin_y <= bomb_y && end_y >= bomb_y;
    }
  }
})();
