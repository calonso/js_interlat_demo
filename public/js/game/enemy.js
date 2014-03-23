
(function(){
  GAME.Enemy = function(level, offset){
    this.width = GAME.BOARD_WIDTH * 3 / 100;
    this.height = GAME.BOARD_HEIGHT * 3 / 100;
    this.x = - (offset * 2 * this.width);
    this.y = GAME.BOARD_HEIGHT * GAME.SCOREBOARD_PERCENT_HEIGHT / 100 + this.height;
    this.speed = (GAME.BOARD_WIDTH * level * GAME.ENEMY_LVL_SPEED_INC + GAME.BOARD_WIDTH) / GAME.ENEMY_BASE_INVERSE_SPEED;
    this.status = ENEMY_GOING_RIGHT;
    this.time_since_last_drop = 0;
    this.next_bomb_after = 0;
  };

  var ENEMY_GOING_LEFT = 0;
  var ENEMY_GOING_RIGHT = 1;

  GAME.Enemy.prototype = {
    x: null,
    y: null,
    width: null,
    height: null,
    speed: null,
    status: null,
    time_since_last_drop: null,
    next_bomb_after: null,
    update: function(delta) {
      this.time_since_last_drop += delta;

      switch(this.status) {
        case ENEMY_GOING_RIGHT:
          this.x += delta * this.speed;
          if(this.x + this.width / 2 >= GAME.BOARD_WIDTH) {
            this.x = GAME.BOARD_WIDTH - this.width / 2;
            this.y += this.height;
            this.status = ENEMY_GOING_LEFT;
          }
          break;
        case ENEMY_GOING_LEFT:
          this.x -= delta * this.speed;
          if (this.x - this.width / 2 <= 0) {
            this.x = this.width / 2;
            this.y += this.height;
            this.status = ENEMY_GOING_RIGHT;
          }
          break;
      }

      if (this.x > this.width && this.time_since_last_drop >= this.next_bomb_after) {
        this.time_since_last_drop = 0;
        this.next_bomb_after = Math.random() * (GAME.MAX_TIME_BETWEEN_BOMBS_DROP - GAME.MIN_TIME_BETWEEN_BOMBS_DROP) + GAME.MIN_TIME_BETWEEN_BOMBS_DROP;
        GAME.CURRENT_GAME.add_object(new GAME.Bomb(this.x, this.y));
      }

      if (this.y + this.height / 2 >= GAME.BOARD_HEIGHT) {
        GAME.CURRENT_GAME.finish();
      }
    },
    repaint: function(context) {
      context.fillStyle = "#0000FF";
      context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    },
    hit: function(bulletX, bulletY) {
      var origin_x = this.x - this.width / 2;
      var origin_y = this.y - this.height / 2;
      var end_x = this.x + this.width / 2;
      var end_y = this.y + this.height / 2;

      return origin_x <= bulletX && end_x >= bulletX && origin_y <= bulletY && end_y >= bulletY;
    }

  };
})();