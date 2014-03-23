var GAME = GAME || {};

(function(){
  GAME.BOARD_HEIGHT = null;
  GAME.BOARD_WIDTH = null;
  GAME.FPS = 60;
  GAME.CURRENT_GAME = null;

  /*
   * GAME RULES CONSTANTS
   */
  GAME.BASE_KILL_SCORE = 20;
  GAME.SCOREBOARD_PERCENT_HEIGHT = 5

  /*
   * SPAWN BEHAVIOUR CONSTANTS
   */
  GAME.SPAWN_SIZE = 5;
  GAME.SPAWN_WAIT_TIME = 10000;

  /*
   * ENEMY BEHAVIOUR CONSTANTS
   */
  GAME.ENEMY_BASE_INVERSE_SPEED = 10000;
  GAME.ENEMY_LVL_SPEED_INC = 30 / 100;
  GAME.MIN_TIME_BETWEEN_BOMBS_DROP = 1000;
  GAME.MAX_TIME_BETWEEN_BOMBS_DROP = 2000;
  GAME.BOMB_INVERSE_SPEED = 4000;

  /*
   * PLAYER BEHAVIOUR CONSTANS
   */
  GAME.PLAYER_BASE_INVERSE_SPEED = 2000;
  GAME.BULLET_INVERSE_SPEED = 2000;

  GAME.Game = function(canvas, end_callback){
    GAME.CURRENT_GAME = this;
    this.canvas = canvas;
    GAME.BOARD_WIDTH = canvas.width;
    GAME.BOARD_HEIGHT = canvas.height;
    this.status = GAME_STATUS_IDLE;
    this.player = new GAME.Player(canvas);
    this.spawn_controller = new GAME.SpawnController();
    this.score_board = new GAME.ScoreBoard();
    this.objects = [this.score_board];
    this.new_objects = [];
    this.removed_objects = [];
    this.score = 0;
    this.end_callback = end_callback;

    this.repaint();
  };

  var GAME_STATUS_IDLE = 0;
  var GAME_STATUS_RUNNING = 1;
  var GAME_STATUS_FINISHED = 2;

  GAME.Game.prototype = {
    player: null,
    canvas: null,
    status: null,
    last_updated: null,
    objects: null,
    new_objects: null,
    removed_objects: null,
    spawn_controller: null,
    score: null,
    end_callback: null,
    score_board: null,
    start: function() {
      this.status = GAME_STATUS_RUNNING;
      this.last_updated = new Date().getTime();
      this.update();
    },
    update: function() {
      switch(this.status) {
        case GAME_STATUS_IDLE:
          break;
        case GAME_STATUS_RUNNING:
          var start = new Date().getTime();

          var delta = start - this.last_updated;

          this.spawn_controller.update(delta);

          this.player.update(delta);

          for (var i = 0; i < this.new_objects.length; ++i) {
            this.objects.push(this.new_objects[i]);
          };
          this.new_objects = [];

          for (var i = 0; i < this.removed_objects.length; ++i) {
            var index = this.objects.indexOf(this.removed_objects[i]);
            if (index != -1) {
              this.objects.splice(index, 1);
            }
          };
          this.removed_objects = [];

          for (var i = 0; i < this.objects.length; i++) {
            this.objects[i].update(delta);
          };

          this.repaint();

          var end = new Date().getTime();

          var elapsed = end - start;
          this.last_updated = end;

          var that = this;
          setTimeout(function(){that.update()}, 1000/GAME.FPS - elapsed);
          break;
        case GAME_STATUS_FINISHED:
          alert("Game Over!");
          this.end_callback(this.score);
          break;
      }
    },
    repaint: function() {
      var context = this.canvas.getContext('2d');
      context.clearRect(0, 0, GAME.BOARD_WIDTH, GAME.BOARD_HEIGHT);
      this.player.paint(context);
      for (var i = 0; i < this.objects.length; i++) {
        this.objects[i].repaint(context);
      };
    },
    go_left: function(event) {
      this.player.go_left();
      event.stopImmediatePropagation();
    },
    go_right: function(event) {
      this.player.go_right();
      event.stopImmediatePropagation();
    },
    fire: function(event) {
      this.player.stop();
      this.add_object(new GAME.Bullet(this.player.x, this.player.y));
      event.stopImmediatePropagation();
    },
    remove_object: function(obj) {
      this.removed_objects.push(obj);
    },
    add_object: function(obj) {
      this.objects.push(obj);
    },
    kill_enemy: function(enemy, bullet) {
      this.score += this.spawn_controller.level * GAME.BASE_KILL_SCORE;
      this.removed_objects.push(enemy);
      this.removed_objects.push(bullet);
    },
    finish: function() {
      this.status = GAME_STATUS_FINISHED;
    }
  };
})();