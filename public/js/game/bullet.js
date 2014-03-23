
(function(){
  GAME.Bullet = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = GAME.BOARD_HEIGHT / GAME.BULLET_INVERSE_SPEED;
    this.width = 2;
    this.height = 20;
  };

  GAME.Bullet.prototype = {
    x: null,
    y: null,
    speed: null,
    width: null,
    height: null,
    update: function(delta) {
      this.y -= this.speed * delta;
      if (this.y < 0) {
        GAME.CURRENT_GAME.remove_object(this);
      } else {
        for (var i = 0 ; i < GAME.CURRENT_GAME.objects.length ; ++i) {
          var enemy = GAME.CURRENT_GAME.objects[i];
          if (Object.getPrototypeOf(enemy) === GAME.Enemy.prototype && enemy.hit(this.x, this.y)) {
            GAME.CURRENT_GAME.kill_enemy(enemy, this);
            break;
          }
        }
      }
    },
    repaint: function(context) {
      context.fillStyle = "#000000";
      context.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
  };

})();